const utils = require('../misc/utils');
const User = require('../models/User');
const Role = require('../models/Role');
const { loginValidation, userValidation } = require('./validation');
const { authToken, authPermission } = require('../misc/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

// User login
router.post('/login', async (req, res) => {
    // Validate body
    const {error} = loginValidation(req.body);
    if(error){
        console.log(req.id + ': Logging in failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check user and password
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        console.log(req.id + ': Login failed due to email not existing: ' + req.body.email);
        return utils.respondError(res, 401, 'Email not found or password invalid');
    }
    const passwordValid = await bcrypt.compare(req.body.password, user.passwordHash);
    if(!passwordValid) {
        console.log(req.id + ': Login failed for user \'' + user.email + '\' due to invalid password');
        return utils.respondError(res, 401, 'Email not found or password invalid');
    }

    // Create JWT session token
    const sessionToken = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: parseInt(process.env.TOKEN_EXPIRE_SEC) });
    try {
        // Delete expired tokens
        user.sessionIDs.forEach(sessionToken => {
            try {
                jwt.verify(sessionToken, process.env.TOKEN_SECRET);
            }
            catch {
                user.sessionIDs.pull(sessionToken);
            }
        });
        // User may not have more than MAX_SESSION_COUNT sessions
        if(user.sessionIDs.length >= process.env.MAX_SESSION_COUNT) {
            console.log(req.id + ': Login failed due to maximum session amount reached.');
            return utils.respondError(res, 403, 'Maximum amount of sessions reached');
            // TODO
        }

        // Add session token and write loginCount and lastLogin
        user.sessionIDs.push(sessionToken);
        user.loginCount++;
        user.lastLogin = Date.now();
        await user.save();

        // Return token
        console.log(req.id + ': User \'' + user.email + '\' (ID: \'' + user._id + '\') successfully authenticated.');
        return res.status(200).json({
            session: {
                sessionToken: sessionToken,
                expiresAfterSeconds: process.env.TOKEN_EXPIRE_SEC
            },
        });
    }
    catch (err) {
        console.error(req.id + ': DB error while logging in: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Check token for validity
router.get('/tokenValid', authToken, async (req, res) => {
    // Request has passed token check at this point
    return res.status(200).send();
});

// Log out from the current session
router.get('/logout', authToken, async (req, res) => {
    try {
        const thisUser = await User.findById({ _id: req.userID });
        await thisUser.sessionIDs.pull(req.token);
        await thisUser.save();

        console.log(req.id + ': User \'' + thisUser.email + '\' (ID: \'' + thisUser._id + '\') logged out.');
        return res.status(204).send();
    }
    catch (err) {
        console.error(req.id + ': DB error while logging out: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get all users
router.get('/', authToken, authPermission('user.read'), async (req, res) => {
    try {
        console.log(req.id + ': Fetching all users');
        const users = await User.find();
        return res.json({ users: users });
    }
    catch (err) {
        console.error(req.id + ': DB error occured while fetching all users: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get specific user
router.get('/:email', authToken, authPermission('user.read'), async (req, res) => {
    try {        
        var user;
        try { user = await User.findOne({ email: req.params.email }); } catch (err) {}
        if(!user) {
            console.log(req.id + ': Tried to fetch non-existing user with email \'' + req.params.email + '\'');
            return utils.respondError(res, 404, 'User with email \'' + req.params.email + '\' does not exist');
        }

        console.log(req.id + ': Fetched user with email \'' + req.params.email + '\'');
        return res.json({ user: user });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching user with email \'' + req.params.email + '\': ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Checks if all roles (names passed in array) exist.
// If all exist, true is returned. Otherwise, the name of the first non-existing role is returned.
// False is returned, when no array has been provided.
async function rolesExists(roleNames) {
    if(!roleNames)
        return false;

    for await (const role of roleNames) {
        const existingRole = await Role.findOne({ name: role });
        if(!existingRole)
            return role;
    }
    return true;
}

// Create user
router.post('/', authToken, authPermission('user.create'), async (req, res) => {
    // Validate
    const { error } = userValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding user request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if exists
    const exists = await User.findOne({ email: req.body.email });
    if(exists) {
        console.log(req.id + ': Adding user failed due to already existing user with email: \'' + exists.email + '\'');
        return utils.respondError(res, 409, 'User with email \'' + req.body.email + '\' already exists');
    }
    // Check if roles exist
    const roleCheck = await rolesExists(req.body.roles);
    if(roleCheck !== true) {
        console.log(req.id + ': Adding user failed due to non-exising role: \'' + roleCheck + '\'');
        return utils.respondError(res, 404, 'Role \'' + roleCheck + '\' does not exist');
    }

    // Create and insert
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        passwordHash: hashedPassword,
        roles: req.body.roles,
        banned: (req.body.banned == null ? false : req.body.banned)
    });
    try {
        const created = await newUser.save();
        console.log(req.id + ': New user added: \'' + created.email + '\'');
        res.status(201).json({ created: created });
    }
    catch (err) {
        console.error(req.id + ': DB error while creating a new user: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Update user
router.put('/:email', authToken, authPermission('user.update'), async (req, res) => {
    // Validate
    const { error } = userValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding user request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if exists (by email in URL)
    const user = await User.findOne({ email: req.params.email });
    if(!user) {
        console.log(req.id + ': Updating user failed due to non-existing user with email: \'' + req.params.email + '\'');
        return utils.respondError(res, 404, 'User with email \'' + req.params.email + '\' does not exist');
    }
    // Check if roles exist (body)
    const roleCheck = await rolesExists(req.body.roles);
    if(roleCheck !== true) {
        console.log(req.id + ': Updating user failed due to non-exising role: \'' + roleCheck + '\'');
        return utils.respondError(res, 404, 'Role \'' + roleCheck + '\' does not exist');
    }

    // Update DB set
    try {
        await User.updateOne({ email: req.params.email }, 
            {
                $set: {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    roles: req.body.roles,
                    banned: (req.body.banned == null ? false : req.body.banned)
                }
            });
        const updatedUser = await User.findOne({ email : req.body.email });
        console.log(req.id + ': Successfully updated user with (new) email \'' + req.body.email + '\'');
        return res.json({ updated: updatedUser });
    }
    catch (err) {
        console.error(req.id + ': DB error while updating a new user: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Delete user
router.delete('/:email', authToken, authPermission('user.delete'), async (req, res) => {
    // Check if user exists
    const exists = await User.findOne({ email: req.params.email });
    if(!exists) {
        console.log(req.id + ': Deleting user with email \'' + req.params.email + '\' failed because user does not exist.');
        return utils.respondError(res, 404, 'User \'' + req.params.email + '\' does not exist');
    }

    // Delete
    try {
        console.log(req.id + ': Deleting user with email \'' + req.params.email + '\'');
        await User.deleteOne({ email: exists.email });
        return res.status(204).send();
    }
    catch (err) {
        console.error(req.id + ': Deleting user \'' + req.params.email + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

module.exports = router;
const { required } = require('joi');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const User = require('../models/User');
const utils = require('./utils');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './.env' });

// Middleware for validating session tokens (basic authentication)
const authToken = async function (req, res, next) {
    // Get token from Authorization header
    var token;
    try {
        token = req.header('Authorization').split(" ")[1];
    }
    catch (err) {}
    if(!token){
        console.log(req.id + ': No proper authorization header has been provided.');
        return utils.respondError(res, 400, 'No proper Authorization provided');
    }

    try {
        // Verify token and extract userId (when DISABLE_ACCESS_TOKEN_CHECK is set, expiration will be ignored)
        var verifiedID;
        if(process.env.DISABLE_ACCESS_TOKEN_CHECK === 'true'){
            verifiedID = jwt.verify(token, process.env.TOKEN_SECRET, {ignoreExpiration: true})._id;
            console.error('WARNING: Allowing expired access token for debug purposes.');
        }
        else {
            verifiedID = jwt.verify(token, process.env.TOKEN_SECRET)._id;
        }
        req.userID = verifiedID;

        // Check if user is banned from making Data-API requests
        try {
            const user = await User.findById(verifiedID);
            if(!user){
                console.log(req.id + ': Can\'t auhtorize token for invalid ID \'' + verifiedID + '\'. Request from ' + res.connection.remoteAddress);
                return utils.respondError(res, 401, 'Invalid Token');
            }
            else if(user.banned){
                console.log(req.id + ': User \'' + user.email + '\' is banned from making requests.');
                return utils.respondError(res, 403, 'This user is not allowed to make requests');
            }
            
            // Check if provided sessionID is in DB
            if(!user.sessionIDs.includes(token)) {
                console.log(req.id + ': Provided session token is not stored in DB - access for inquirer denied');
                return utils.respondError(res, 401, 'Invalid Token');
            }

            // Okay -> save token
            req.token = token;
            console.log(req.id + ' is user with ID \'' + user._id + '\' and email \'' + user.email + '\'');
            next();
        }
        catch (err) {
            console.error(req.id + ': DB error in authorization: ' + err);
            return utils.respondError(res, 500, 'DB error');
        }
    }
    catch (err) {
        console.error(req.id + ': Authorization failed: Invalid token');
        return utils.respondError(res, 401, 'Invalid Token');
    }
}

// Middleware for checking if a user has a given permission
const authPermission = function(permissionName) {
    return async function (req, res, next) {
        try {
            if(!req.userID) {
                console.log(req.id + ': Permission check failed, because of no basic authentication.');
                return utils.respondError(res, 500, 'Internal error');
            }
            const user = await User.findById({ '_id': req.userID });
            const userRoles = await Role.find({ 'name': { $in: user.roles } });

            // Skip if administrator (has all permissions)
            for await (const role of userRoles) {
                if(role.name === 'administrator')
                    return next();
            }

            // Check all roles if they contain the permission
            for await (const role of userRoles) {
                const permissions = await Permission.find({ 'name': { $in: role.permissions }}).select({ _id: 0, name: 1 });
                for await(const permission of permissions) {
                    if(permission.name === permissionName) {
                        // console.log(req.id + ': \'' + user.email + '\' passed permission check for \'' + permissionName + '\'');
                        return next();
                    }
                }
            }

            // User doesn't have the permission
            console.log(req.id + ': \'' + user.email + '\' failed permission check for \'' + permissionName + '\'');
            return utils.respondError(res, 403, 'Insufficient permissions');
        }
        catch (err) {
            console.error(req.id + ': Error while checking for permission: ' + err);
            return utils.respondError(res, 500, 'Internal error');
        }
    }
}

// Middleware for checking if a user has a certain role
const authRole = function(roleName) {
    return async function (req, res, next) {
        try {
            if(!req.userID) {
                console.log(req.id + ': Role check failed, because of no basic authentication.');
                return utils.respondError(res, 500, 'Internal error');
            }
            const user = await User.findById({ '_id': req.userID });
            const userRole = await Role.find({ 'name': { $in: user.roles } });

            // Skip if administrator (has all permissions)
            for await (const role of userRoles) {
                if(role.name === 'administrator')
                    return next();
            }

            // Check all roles if they contain the permission
            if(userRole){
                // console.log(req.id + ': \'' + user.email + '\' passed role check for \'' + roleName + '\'');
                return next();
            }
            // User doesn't have role
            else {
                console.log(req.id + ': \'' + user.email + '\' failed role check for \'' + roleName + '\'');
                return utils.respondError(res, 403, 'Insufficient permissions');
            }
        }
        catch (err) {
            console.error(req.id + ': Error while checking for role: ' + err);
            return utils.respondError(res, 500, 'Internal error');
        }
    }
}

module.exports.authToken = authToken;
module.exports.authPermission = authPermission;
module.exports.authRole = authRole;
const utils = require('../misc/utils');
const Role = require('../models/Role');
const { roleValidation } = require('./validation');
const { authToken, authPermission, authRole } = require('../misc/auth');
const express = require('express');
const Permission = require('../models/Permission');

const router = express.Router();

// Get all roles
router.get('/', authToken, authPermission('role.read'), async (req, res) => {
    try {
        const roles = await Role.find();
        console.log(req.id + ': Fetching all roles');
        return res.json({ roles: roles });
    }
    catch (err) {
        console.error(req.id + ': DB error occured while fetching all roles: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get role by name
router.get('/:name', authToken, authPermission('role.read'), async (req, res) => {
    try {
        const role = await Role.findOne({ name: req.params.name });
        if(!role) {
            console.log(req.id + ': Tried to fetch non existing role: ' + req.params.name);
            return utils.respondError(res, 404, 'No role with name \'' + req.params.name + '\'');
        }

        console.log(req.id + ': Fetching role: ' + req.params.name);
        return res.json({ role: role });
    }
    catch (err) {
        console.error(req.id + ': DB error occured while fetching role with name \'' + req.params.name + '\': ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Checks an array of permission names for existance.
// If all exist, true is returned. Otherwise, the name of the first non-existing permission is returned.
// False is returned, when no array is provided.
async function checkPermissionExists(permissionNames) {
    if(!permissionNames)
        return false;

    for await (const name of permissionNames) {
        const existingPermission = await Permission.findOne({ name: name });
        if(!existingPermission)
            return name;
    }

    return true;
}

// Add new role
router.post('/', authToken, authPermission('role.create'), async (req, res) => {
    // Validate
    const { error } = roleValidation(req.body);
    if(error) {
        console.log(req.id + ': Role add request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if already exists
    const exists = await Role.findOne({ name: req.body.name });
    if(exists) {
        console.log(req.id + ': Adding role failed due to already existing role: \'' + exists.name + '\'');
        return utils.respondError(res, 409, 'Role \'' + req.body.name + '\' already exists');
    }
    // Check if passed permissions exist
    const permissionCheckRes = await checkPermissionExists(req.body.permissions);
    if(permissionCheckRes !== true) {
        console.log(req.id + ': Adding role failed due to non-exising permission: \'' + permissionCheckRes + '\'');
        return utils.respondError(res, 404, 'Permission \'' + permissionCheckRes + '\' does not exist');
    }

    // Create and insert
    const newRole = new Role({
        name: req.body.name,
        permissions: req.body.permissions
    });
    try {
        const created = await newRole.save();
        console.log(req.id + ': New role added: \'' + created.name + '\'');
        res.status(201).json({ created: created });
    }
    catch (err) {
        console.error(req.id + ': DB error while creating a new role: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Replace existing role
router.put('/:name', authToken, authPermission('role.update'), async (req, res) => {
    // Validate
    const { error } = roleValidation(req.body);
    if(error) {
        console.log(req.id + ': Role PUT request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if role exists
    const role = await Role.findOne({ name: req.params.name });
    if(!role) {
        console.log(req.id + ': Updating role failed due to non-exiting existing role: \'' + role.name + '\'');
        return utils.respondError(res, 404, 'Role \'' + req.params.name + '\' does not exist');
    }
    // Check if passed permissions exist
    const permissionCheckRes = await checkPermissionExists(req.body.permissions);
    if(permissionCheckRes !== true) {
        console.log(req.id + ': Adding role failed due to non-exising permission: \'' + permissionCheckRes + '\'');
        return utils.respondError(res, 404, 'Permission \'' + permissionCheckRes + '\' does not exist');
    }

    // Update DB set
    try {
        await Role.updateOne({ name : req.params.name }, 
            { 
                $set: {
                    name: req.body.name,
                    permissions: req.body.permissions
                }
            });
        const updatedRole = await Role.findById(role._id);
        console.log(req.id + ': Successfully updated role \'' + req.params.name + '\'');
        return res.json({ updated: updatedRole });
    }
    catch (err) {
        console.error(req.id + ': Updating role \'' + req.params.name + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Delete role
router.delete('/:name', authToken, authPermission('role.delete'), async (req, res) => {
    // Check if role exists
    const exists = await Role.findOne({ name: req.params.name });
    if(!exists) {
        console.log(req.id + ': Deleting role \'' + req.params.name + '\' failed because role does not exist.');
        return utils.respondError(res, 404, 'Role \'' + req.params.name + '\' does not exist');
    }
    
    // Delete
    try {
        console.log(req.id + ': Deleting role \'' + req.params.name + '\'');
        await Role.deleteOne({ _id: exists._id });
        return res.status(204).send();
    }
    catch (err) {
        console.error(req.id + ': Deleting role \'' + req.params.name + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

module.exports = router;
const utils = require('../misc/utils');
const ServerService = require('../models/ServerService');
const { serverServiceValidation } = require('./validation');
const { authToken, authPermission, authRole } = require('../misc/auth');
const express = require('express');

const router = express.Router();

// Get all ServerServices
router.get('/', authToken, authPermission('serverService.read'), async (req, res) => {
    try {
        console.log(req.id + ': Fetching all server services.');
        const serverServices = await ServerService.find();
        return res.json({ serverServices: serverServices });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching all server services: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get specific ServerService
router.get('/:id',authToken, authPermission('serverService.read'), async (req, res) => {
    try {        
        var serverService;
        try { serverService = await ServerService.findById(req.params.id); } catch (err) {}
        if(!serverService) {
            console.log(req.id + ': Tried to fetch non-existing server service with ID \'' + req.params.id + '\'');
            return utils.respondError(res, 404, 'Server service with ID \'' + req.params.id + '\' does not exist');
        }

        console.log(req.id + ': Fetched server service with ID \'' + req.params.id + '\'');
        return res.json({ serverService: serverService });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching server service with ID \'' + req.params.id + '\': ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Add new ServerService
router.post('/', authToken, authPermission('serviceService.create'), async (req, res) => {
    // Validate
    const { error } = serverServiceValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding server service request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Create and insert
    const newServerService = new ServerService({
        type: req.body.type,
        productName: req.body.productName,
        version: req.body.version,
        license: req.body.license,
        dependencies: req.body.dependencies,
        createdBy: req.userID,
        updatedBy: req.userID
    });
    try {
        const created = await newServerService.save();
        console.log(req.id + ': New server service added: \'' + created.productName + '\'');
        res.status(201).json({ created: created });
    }
    catch (err) {
        console.error(req.id + ': DB error while creating a new server service: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Update existing ServerService
router.put('/:id', authToken, authPermission('serviceService.update'), async (req, res) => {
    // Validate
    const { error } = serverServiceValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding server service request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if ServerService exists
    var exists;
    try { exists = await ServerService.findById(req.params.id); } catch (err) {}
    if(!exists) {
        console.log(req.id + ': Tried to update non-existing server service with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Server service with ID \'' + req.params.id + '\' does not exist');
    }

    // Update DB set
    try {
        await ServerService.updateOne({ _id : req.params.id }, 
            { 
                $set: {
                    type: req.body.type,
                    productName: req.body.productName,
                    version: req.body.version,
                    license: req.body.license,
                    dependencies: req.body.dependencies,
                    updatedBy: req.userID
                }
            });
        const updatedServerService = await ServerService.findById(req.params.id);
        console.log(req.id + ': Successfully updated server service \'' + req.params.id + '\'');
        return res.json({ updated: updatedServerService });
    }
    catch (err) {
        console.error(req.id + ': Updating server service with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Delete a ServerService
router.delete('/:id', authToken, authPermission('serviceService.delete'), async (req, res) => {
    // Check if exists
    var serverService;
    try { serverService = await ServerService.findById(req.params.id); } catch (err) {}
    if(!serverService) {
        console.log(req.id + ': Tried to delete non-existing server service with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Server service with ID \'' + req.params.id + '\' does not exist');
    }

    // Delete DB entry
    try {
        await ServerService.deleteOne({ _id: req.params.id });
        return res.status(204).send();
    }
    catch(err) {
        console.error(req.id + ': Deleting server service with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

module.exports = router;
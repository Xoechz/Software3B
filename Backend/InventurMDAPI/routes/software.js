const utils = require('../misc/utils');
const Software = require('../models/Software');
const { softwareValidation } = require('./validation');
const { authToken, authPermission, authRole } = require('../misc/auth');
const express = require('express');

const router = express.Router();

// Get all Software entries
router.get('/', authToken, authPermission('software.read'), async (req, res) => {
    try {
        console.log(req.id + ': Fetching all software entries.');
        const software = await Software.find();
        return res.json({ software: software });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching all software entries: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get specific Software
router.get('/:id',authToken, authPermission('software.read'), async (req, res) => {
    try {        
        var software;
        try { software = await Software.findById(req.params.id); } catch (err) {}
        if(!software) {
            console.log(req.id + ': Tried to fetch non-existing software entry with ID \'' + req.params.id + '\'');
            return utils.respondError(res, 404, 'Software with ID \'' + req.params.id + '\' does not exist');
        }

        console.log(req.id + ': Fetched software entry with ID \'' + req.params.id + '\'');
        return res.json({ software: software });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching software entry with ID \'' + req.params.id + '\': '  + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Add new Software
router.post('/', authToken, authPermission('software.create'), async (req, res) => {
    // Validate
    const { error } = softwareValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding software request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Create and insert
    const newSoftware = new Software({
        name: req.body.name,
        type: req.body.type,
        details: req.body.details,
        hardware: req.body.hardware,
        createdBy: req.userID,
        updatedBy: req.userID
    });
    try {
        const created = await newSoftware.save();
        console.log(req.id + ': New software added: \'' + created.name + '\'');
        res.status(201).json({ created: created });
    }
    catch (err) {
        console.error(req.id + ': DB error while creating a new software entry: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Update existing Software
router.put('/:id', authToken, authPermission('software.update'), async (req, res) => {
    // Validate
    const { error } = softwareValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding software request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if Software exists
    var exists;
    try { exists = await Software.findById(req.params.id); } catch (err) {}
    if(!exists) {
        console.log(req.id + ': Tried to update non-existing software entry with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Software entry with ID \'' + req.params.id + '\' does not exist');
    }

    // Update DB set
    try {
        await Software.updateOne({ _id : req.params.id }, 
            { 
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    details: req.body.details,
                    hardware: req.body.hardware,
                    updatedBy: req.userID
                }
            });
        const updatedSoftware = await Software.findById(req.params.id);
        console.log(req.id + ': Successfully updated software entry \'' + req.params.id + '\'');
        return res.json({ updated: updatedSoftware });
    }
    catch (err) {
        console.error(req.id + ': Updating software entry with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Delete a Software
router.delete('/:id', authToken, authPermission('software.delete'), async (req, res) => {
    // Check if exists
    var software;
    try { software = await Software.findById(req.params.id); } catch (err) {}
    if(!software) {
        console.log(req.id + ': Tried to delete non-existing software entry with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Software entry with ID \'' + req.params.id + '\' does not exist');
    }

    // Delete DB entry
    try {
        await Software.deleteOne({ _id: req.params.id });
        return res.status(204).send();
    }
    catch(err) {
        console.error(req.id + ': Deleting software entry with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

module.exports = router;
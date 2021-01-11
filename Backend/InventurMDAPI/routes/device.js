const utils = require('../misc/utils');
const Device = require('../models/Device');
const { deviceValidation } = require('./validation');
const { authToken, authPermission, authRole } = require('../misc/auth');
const express = require('express');

const router = express.Router();

// Get all Devices
router.get('/', authToken, authPermission('device.read'), async (req, res) => {
    try {
        console.log(req.id + ': Fetching all devices.');
        const devices = await Device.find();
        return res.json({ devices: devices });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching all devices: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Get specific Device
router.get('/:id',authToken, authPermission('device.read'), async (req, res) => {
    try {        
        var device;
        try { device = await Device.findById(req.params.id); } catch (err) {}
        if(!device) {
            console.log(req.id + ': Tried to fetch non-existing device with ID \'' + req.params.id + '\'');
            return utils.respondError(res, 404, 'Device with ID \'' + req.params.id + '\' does not exist');
        }

        console.log(req.id + ': Fetched device with ID \'' + req.params.id + '\'');
        return res.json({ device: device });
    }
    catch(err) {
        console.error(req.id + ': DB error occured while fetching device with ID \'' + req.params.id + '\': ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Add new Device
router.post('/', authToken, authPermission('device.create'), async (req, res) => {
    // Validate
    const { error } = deviceValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding device request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Create and insert
    const newDevice = new Device({
        productName: req.body.productName,
        type: req.body.type,
        manufacturer: req.body.manufacturer,
        version: req.body.version,
        serialNumber: req.body.serialNumber,
        inventoryNumber: req.body.inventoryNumber,
        location: req.body.location,
        warranty: req.body.warranty,
        purchaseDate: req.body.purchaseDate,
        firmware: req.body.firmware,
        createdBy: req.userID,
        updatedBy: req.userID
    });
    try {
        const created = await newDevice.save();
        console.log(req.id + ': New device added: \'' + created.name + '\'');
        res.status(201).json({ created: created });
    }
    catch (err) {
        console.error(req.id + ': DB error while creating a new device: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Update existing Device
router.put('/:id', authToken, authPermission('device.update'), async (req, res) => {
    // Validate
    const { error } = deviceValidation(req.body);
    if(error) {
        console.log(req.id + ': Adding device request failed in validation: ' + error.details[0].message);
        return utils.respondError(res, 400, error.details[0].message);
    }

    // Check if Device exists
    var exists;
    try { exists = await Device.findById(req.params.id); } catch (err) {}
    if(!exists) {
        console.log(req.id + ': Tried to update non-existing device with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Device with ID \'' + req.params.id + '\' does not exist');
    }

    // Update DB set
    try {
        await Device.updateOne({ _id : req.params.id }, 
            { 
                $set: {
                    productName: req.body.productName,
                    type: req.body.type,
                    manufacturer: req.body.manufacturer,
                    version: req.body.version,
                    serialNumber: req.body.serialNumber,
                    inventoryNumber: req.body.inventoryNumber,
                    location: req.body.location,
                    warranty: req.body.warranty,
                    purchaseDate: req.body.purchaseDate,
                    firmware: req.body.firmware,
                    updatedBy: req.userID
                }
            });
        const updatedDevice = await Device.findById(req.params.id);
        console.log(req.id + ': Successfully updated device \'' + req.params.id + '\'');
        return res.json({ updated: updatedDevice });
    }
    catch (err) {
        console.error(req.id + ': Updating device with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

// Delete a Device
router.delete('/:id', authToken, authPermission('device.delete'), async (req, res) => {
    // Check if exists
    var device;
    try { device = await Device.findById(req.params.id); } catch (err) {}
    if(!device) {
        console.log(req.id + ': Tried to delete non-existing device with ID \'' + req.params.id + '\'');
        return utils.respondError(res, 404, 'Device with ID \'' + req.params.id + '\' does not exist');
    }

    // Delete DB entry
    try {
        await Device.deleteOne({ _id: req.params.id });
        return res.status(204).send();
    }
    catch(err) {
        console.error(req.id + ': Deleting device with ID \'' + req.params.id + '\' failed due to DB error: ' + err);
        return utils.respondError(res, 500, 'DB error');
    }
});

module.exports = router;
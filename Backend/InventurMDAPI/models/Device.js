const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    version: {
        type: String
    },
    serialNumber: {
        type: String
    },
    inventoryNumber: {
        type: String
    },
    location: {
        type: String
    },
    manufacturer: {
        type: String
    },
    warranty: {
        type: Date
    },
    purchaseDate: {
        type: Date
    },
    firmware: {
        type: String
    },
    // IDs of users that created/updated an entry
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true,
        default: null
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('devices', deviceSchema);
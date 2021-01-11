const mongoose = require('mongoose');

const softwareSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    hardware: {
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

module.exports = mongoose.model('software', softwareSchema);
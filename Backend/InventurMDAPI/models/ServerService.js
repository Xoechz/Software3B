const mongoose = require('mongoose');

const serverServiceSchema = mongoose.Schema({
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
    license: {
        type: Date
    },
    dependencies: {
        type: [String]
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

module.exports = mongoose.model('serverservices', serverServiceSchema);
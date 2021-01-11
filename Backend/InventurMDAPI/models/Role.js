const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String],
        required: true,
        default: []
    }
});

module.exports = mongoose.model('roles', roleSchema);
const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('permissions', permissionSchema);
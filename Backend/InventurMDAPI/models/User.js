const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    passwordHash: {
        type: String,
        required: true,
        max: 1024
    },
    sessionIDs: {
        type: [String],
        required: true,
        default: []
    },
    roles: {
        type: [String],
        required: true
    },
    // If true, the user cannot login or get authorized.
    banned: {
        type: Boolean,
        required: true,
        default: false
    },
    loginCount: {
        type: Number,
        required: true,
        default: 0
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
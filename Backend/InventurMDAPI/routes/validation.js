const Joi = require('joi');
require('dotenv/config');

// Validating login requests
function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
}

// Validating register requests
function userValidation(data) {
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        name: Joi.string().max(255).required(),
        password: Joi.string().min(12).required(),
        roles: Joi.array().items(Joi.string().required()).min(1).required(),
        banned: Joi.boolean()
    });
    return schema.validate(data);
}

// Validating role POST/PUT requests
function roleValidation(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        permissions: Joi.array().items(Joi.string().required()).min(1).required()
    });
    return schema.validate(data);
}

// Validating ServerService POST/PUT requests
function serverServiceValidation(data) {
    const schema = Joi.object({
        type: Joi.string().required(),
        productName: Joi.string().required(),
        version: Joi.string(),
        license: Joi.date(),
        dependencies: Joi.array().items(Joi.string())
    });
    return schema.validate(data);
}

// Validating Software POST/PUT requests
function softwareValidation(data) {
    const schema = Joi.object({
        type: Joi.string().required(),
        name: Joi.string().required(),
        details: Joi.string(),
        hardware: Joi.string()
    });
    return schema.validate(data);
}

// Validating Device POST/PUT requests
function deviceValidation(data) {
    const schema = Joi.object({
        type: Joi.string().required(),
        productName: Joi.string().required(),
        manufacturer: Joi.string(),
        version: Joi.string(),
        serialNumber: Joi.string(),
        inventoryNumber: Joi.string(),
        location: Joi.string(),
        warranty: Joi.date(),
        purchaseDate: Joi.date(),
        firmware: Joi.string(),
    });
    return schema.validate(data);
}

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
module.exports.roleValidation = roleValidation;
module.exports.serverServiceValidation = serverServiceValidation;
module.exports.softwareValidation = softwareValidation;
module.exports.deviceValidation = deviceValidation;
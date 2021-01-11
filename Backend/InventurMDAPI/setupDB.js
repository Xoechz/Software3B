const mongoose = require('mongoose');
const Joi = require('joi');
require('dotenv').config({ path: './.env' });
const User = require('./models/User');
const Permission = require('./models/Permission');
const Role = require('./models/Role');
const ServerService = require('./models/ServerService');
const Software = require('./models/Software');
const Device = require('./models/Device');

// Check passed arguments, validate email
if(process.argv.length != 4) 
    printUsage();
var email = process.argv[2];
var name = process.argv[3];
var { error } = Joi.string().max(255).email().validate(email);
if (error) printUsage();
var { error } = Joi.string().max(255).validate(name);
if (error) printUsage();

mongoose.connect(process.env.DB_SERVER, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("[*] Connection to DB established!");
    console.log();

    // Start DB manipulation
    (async () => {
        // Delete all documents
        await Permission.deleteMany({});
        await Role.deleteMany({});
        await User.deleteMany({});
        await ServerService.deleteMany({});
        await Software.deleteMany({});
        await Device.deleteMany({});
    
        // Insert permissions
        const allPermissions = [
            'role.read',
            'role.create',
            'role.update',
            'role.delete',
            'user.read',
            'user.create',
            'user.update',
            'user.delete',
            'device.read',
            'device.create',
            'device.update',
            'device.delete',
            'serverService.read',
            'serverService.create',
            'serverService.update',
            'serverService.delete',
            'software.read',
            'software.create',
            'software.update',
            'software.delete'
        ];
        for await (const permission of allPermissions) {
            var newPermission = new Permission({
                name: permission,
                description: 'Role ' + permission
            });
            await newPermission.save();
        }
    
        // Roles
        var role = new Role({
            name: 'administrator'
        });
        await role.save();
        var role = new Role({
            name: 'readOnly',
            permissions: [
                'device.read',
                'serverService.read',
                'software.read'
            ]
        });
        await role.save();
        var role = new Role({
            name: 'readWrite',
            permissions: [
                'device.read',
                'device.create',
                'device.update',
                'device.delete',
                'serverService.read',
                'serverService.create',
                'serverService.update',
                'serverService.delete',
                'software.read',
                'software.create',
                'software.update',
                'software.delete'
            ]
        });
        await role.save();
    
        // Administrator user (with PW Cisco123*Cisco123*)
        var user = new User({
            email: email,
            name: name,
            passwordHash: '$2b$10$mJ/.o9LmThxjpxDVOPV2muqJxVY3iTmPRpXBmBq5sM7xdlf5hjMK.',
            roles: [
                'administrator'
            ]
        });
        await user.save();
    })()
    .catch(err => {
        console.error('An error occured while creating the DB structure:');
        console.error(err);
    })
    .then(() => {
        console.log('Created user: \'' + email + '\'');
        console.log('With password \'Cisco123*Cisco123*\'');
        console.log('*** Database setup finished successfully. ***');
        process.exit(0);
    });
});

// Prints out the usage for this script and exits.
function printUsage() {
    console.error("Usage: node setupDB.js <EMAIL> <NAME>");
    console.error("\t<EMAIL>:\tEmail address for administrator account")
    console.error("\t<NAME>:\t\tName for administrator account")
    process.exit(1);
}
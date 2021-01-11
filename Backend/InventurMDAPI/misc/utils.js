require('dotenv').config({ path: './.env' });
const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');

const Utils = class Utils {
    // Sends an error response with a given code and error message formatted as JSON.
    static respondError(res, code, message) {
        res.status(code).json({error: message});
    }

    // Generates a random token (ID) with the length set in .env variable TOKEN_LENGTH (256 if not set).
    static generateToken() {
        return randtoken.uid(process.env.TOKEN_LENGTH || 256);
    }

    // Generates a JWT token containing 'content', signed by the TOKEN_SECRET in the .env file.
    static generateJWToken(content) {
        return jwt.sign(content, process.env.TOKEN_SECRET);
    }

    // Abbreviates a string to format abc...xyz when the passed string is longer than 30 characters.
    static abbreviateString(orig) {
        if(orig && orig.length > 30){
            var part = orig.substr(0, 12);
            part += '...';
            part += orig.substr(orig.length - 12, orig.length - 1);
            return part;
        }
        else
            return orig;
    }
}

module.exports = Utils;
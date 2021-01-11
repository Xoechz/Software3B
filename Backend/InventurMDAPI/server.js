const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const compression = require('compression');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const expressId = require('express-request-id')();

// DB connection
mongoose.connect(process.env.DB_SERVER, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("[*] Connection to DB established!");
});

// Start API
const app = express();

// Misc
app.use(expressId);
app.use(cors());
app.use(compression());
app.use(helmet());
app.use((req, res, next) => {
    console.log(req.id + ': Access at ' + (new Date()));
    console.log(req.id + ': Access from ' + res.connection.remoteAddress);
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((err, req, res, next) => {
    if (err.statusCode == 400)
        res.status(400).json({error: 'Invalid JSON'});
    else
        res.status(500).send();
});

// Routes
const userRoute = require('./routes/user');
app.use('/user', userRoute);
const roleRoute = require('./routes/role');
app.use('/role', roleRoute);
const serverServiceRoute = require('./routes/serverService');
app.use('/serverService', serverServiceRoute);
const softwareRoute = require('./routes/software');
app.use('/software', softwareRoute);
const deviceRoute = require('./routes/device');
app.use('/device', deviceRoute);

// Start HTTPS server
https.createServer({
    key: fs.readFileSync(process.env.SSL_PRIVATE),
    cert: fs.readFileSync(process.env.SSL_CERT)
}, app)
.listen(process.env.PORT, function () {
    console.log('[*] API started; listening on port ' + process.env.PORT + '.');
});
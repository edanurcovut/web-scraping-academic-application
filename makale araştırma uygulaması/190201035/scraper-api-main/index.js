'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');
var cors = require('cors');

//whitelist for cors
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// database connection with mongoose
mongoose.connect("mongodb+srv://edanurcovut:T3TzRKBzCl10k2vC@articlescraper.yljjzbu.mongodb.net/scrappedData?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

let whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
]

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = 'The CORS policy for this origin doesnt allow access from the particular origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

// Use body parser to use req.body object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use router
app.use('/', router);

router.use((req, res, next) => {
    res.json({
        "status": "failure",
        "code": 404,
        "message": req.originalUrl + " Page not found!"
    })
});

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;

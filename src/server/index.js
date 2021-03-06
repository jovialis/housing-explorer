/**
 * Created on 4/12/21 by jovialis (Dylan Hanson)
 * Based on Bootstrapped Express app
 **/

/**
 * Load environmental variables
 */

// Load .env file in Development
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const res = dotenv.config({
        debug: true
    });

    console.log(res);
}

// Load config
const config = require('./config');

/**
 * Configure MongoDB
 */

require('./database');

/**
 * Module dependencies.
 */

const app = require('./app');
const debug = require('debug')('neighborhood-explorer:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.PORT);
app.set('port', port);

if (config.PRODUCTION) {
    const enforce = require('express-sslify');

    // Setting the app to know that it is behind a local proxy, this sets the remote address to the req address
    app.set('trust proxy', true);
    app.use(enforce.HTTPS({trustProtoHeader: true}));
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

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

    const bind = typeof port === 'string'
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
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

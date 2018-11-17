/*---------------------------------------------
 * winston.js
 * A winston logger for morgan
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

// Dependencies
const winston = require('winston');
const path = require('path');

// Default options for file outputs
const FILE_OPTIONS = {
    level: 'info',
    filename: path.join(process.env.LOG_PATH, "request.log"),
    handleExceptions: true,
    format: winston.format.json(),
    maxsize: 5242280,
    maxFiles: 1000,
    colorize: false
};

// Default options for console outputs
const CONSOLE_OPTIONS = {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.json()
};

// Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(FILE_OPTIONS),
        new winston.transports.Console(CONSOLE_OPTIONS)
    ],
    exitOnError: false
});

// Create a stream object so we can use morgan with this
logger.stream = {
    write: function(msg) {
        logger.info(msg);
    }
};

module.exports = logger;

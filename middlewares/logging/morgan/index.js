/*---------------------------------------------
 * index.js
 * Mount morgan with winston transports.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

// Dependencies
const morgan = require('morgan');
const winston = require('./winston');

/**
 * Mount all middlewares
 * @param app
 */
module.exports = function(app) {
    app.use(morgan('combined', {
        stream: winston.stream
    }));
};

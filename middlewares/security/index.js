/*---------------------------------------------
 * index.js
 * Module entry point, exposes a function that
 * automatically applies all middlewares.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

const cors = require('cors');

/**
 * Mount all middlewares
 * @param app
 */
module.exports = function(app) {
    app.use(cors());
    app.use(require('./authentication/authenticationMiddleware'));
    app.use(require('./authentication/userAuthenticationMiddleware'));
    app.use(require('./authentication/superAdminAuthenticationMiddleware'));
};

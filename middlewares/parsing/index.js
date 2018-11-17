/*---------------------------------------------
 * index.js
 * Module entry point, exposes a function that
 * automatically applies all middlewares.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

const bodyParser = require('body-parser');

/**
 * Mount all middlewares
 * @param app
 */
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
};

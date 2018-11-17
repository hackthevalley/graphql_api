/*---------------------------------------------
 * index.js
 * Module entry point, exposes a function that
 * automatically applies all middlewares.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

/**
 * Mount all middlewares
 * @param app
 */
module.exports = function(app) {
    require('./parsing')(app);
    require('./logging')(app);
    require('./security')(app);
};

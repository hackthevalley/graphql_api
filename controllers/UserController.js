const IsSuperAdminRule = require('../rules/IsSuperAdminRule');
const PermissionError  = require('../errors/PermissionError');
const User             = require('../models/User');


class UserController {
    /**
     * Get current authenticated user
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static user(obj, args, context) {
        return new Promise((resolve, reject) => {
            if (context.user) {
                resolve(context.user);
            } else {
                reject("NotAuthenticated");
            }
        })
    }

    static async create(obj, args, context) {
        if (!await IsSuperAdminRule.pass(context)) {
            throw new PermissionError("You must be authenticated as super admin to use this endpoint.")
        }
        return await User.create(args);
    }
}

module.exports = UserController;

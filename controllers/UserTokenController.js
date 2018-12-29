const User = require('../models/User');
const UserToken = require('../models/UserToken');
const uuid = require('uuid-v4');
const NotFoundError = require('../errors/NotFoundError');

class UserTokenController {
    /**
     * Create a new user token
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static async create(obj, args, context) {
        let user = await User.findOne({ username: args.username });
        if(!user) throw new NotFoundError("User is not found, check your username and try again.");
        if(!await user.matchPassword(args.password)) throw new Error("Invalid password, please try again.");
        let expireAt = new Date(new Date().getTime() + (args.expire_after ? args.expire_after * 1000 : 86400000));
        let newToken = new UserToken({
            expire_at: expireAt,
            user_id: user._id,
            token_body: uuid() + "-" + user._id + "-" + expireAt.toISOString() + "-v1"
        });
        await newToken.save();
        return newToken;
    }
}

module.exports = UserTokenController;

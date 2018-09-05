const User = require('../models/User');
const UserToken = require('../models/UserToken');
const uuid = require('uuid-v4');
const pbkdf2 = require('pbkdf2');
const util = require('util');
pbkdf2.pbkdf2 = util.promisify(pbkdf2.pbkdf2);

class UserTokenController {
    /**
     * Create a new user token
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        let user;
        return new Promise((resolve, reject) => {
            // Try to get the hacker
            User.findOne({ username: args.username })
                .then(result => {
                    user = result;
                    if(!user) throw new Error("UserNotFound");
                    // Hash the password
                    return pbkdf2.pbkdf2(args.password, user.salt, 100000, 64, 'sha512');
                })
                .then(password => {
                    password = password.toString('hex');
                    if(password !== user.password) throw new Error("InvalidPassword");
                    let expire_at = new Date(new Date().getTime() + (args.expire_after ? args.expire_after * 1000 : 86400000));
                    let new_token = new UserToken({
                        expire_at,
                        user_id: user._id,
                        token_body: uuid() + "-" + user._id + "-" + expire_at.toISOString() + "-v1"
                    });
                    return new_token.save();
                })
                .then(token => {
                    resolve(token);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
}

module.exports = UserTokenController;

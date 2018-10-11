const Hacker = require('../models/Hacker');
const HackerToken = require('../models/HackerToken');
const uuid = require('uuid-v4');
const pbkdf2 = require('pbkdf2');
const util = require('util');
pbkdf2.pbkdf2 = util.promisify(pbkdf2.pbkdf2);

class HackerTokenController {
    /**
     * Create a new hacker token
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        let hacker;
        return new Promise((resolve, reject) => {
            // Try to get the hacker
            Hacker.findOne({ email_address: args.email_address })
                .then(result => {
                    hacker = result;
                    if(!hacker) throw new Error("HackerNotFound");
                    // Hash the password
                    return pbkdf2.pbkdf2(args.password, hacker.salt, 100000, 64, 'sha512');
                })
                .then(password => {
                    password = password.toString('hex');
                    if(password !== hacker.password) throw new Error("IncorrectPassword");
                    let expire_at = new Date(new Date().getTime() + (args.expire_after ? args.expire_after * 1000 : 86400000));
                    let new_token = new HackerToken({
                        expire_at,
                        hacker_id: hacker._id,
                        token_body: uuid() + "-" + hacker._id + "-" + expire_at.toISOString() + "-v1"
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

module.exports = HackerTokenController;

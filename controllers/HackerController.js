const Hacker = require('../models/Hacker');
const validateEmail = require('../util/validateEmail');
const uuid = require('uuid-v4');
const pbkdf2 = require('pbkdf2');
const util = require('util');
pbkdf2.pbkdf2 = util.promisify(pbkdf2.pbkdf2);

class HackerController {
    /**
     * Create a new hacker account
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        let salt;
        return new Promise((resolve, reject) => {
            // First validate inputs
            if (!validateEmail(args.email_address)) {
                return reject("InvalidEmail");
            }
            if (args.password.length < 8) {
                return reject("InvalidPassword");
            }
            // Check if email already exists
            Hacker.findOne({ email_address: args.email_address })
                .then(hacker => {
                    if(hacker) throw new Error("EmailExists");
                    // Generate the salt
                    salt = uuid();
                    // Hash the password
                    return pbkdf2.pbkdf2(args.password, salt, 100000, 64, 'sha512');
                })
                .then(password => {
                    password = password.toString('hex');
                    let new_hacker = new Hacker({
                        email_address: args.email_address,
                        salt,
                        password
                    });
                    return new_hacker.save();
                })
                .then(hacker => {
                    resolve(hacker);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
}

module.exports = HackerController;

const Hacker                         = require('../models/Hacker');
const HackerApplication              = require('../models/HackerApplication');
const validateEmail                  = require('../util/validateEmail');
const uuid                           = require('uuid-v4');
const pbkdf2                         = require('pbkdf2');
const util                           = require('util');
const EmailServiceProvider           = require('../providers/email');
const PasswordResetTemplate          = require('../providers/email/templates/PasswordReset');
const HackerPasswordResetCode        = require('../models/HackerPasswordResetCode');
const IsAuthenticatedAsAdminUserRule = require('../rules/IsAuthenticatedAsAdminUserRule');
const PermissionError                = require('../errors/PermissionError');
pbkdf2.pbkdf2                        = util.promisify(pbkdf2.pbkdf2);


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
            Hacker.findOne({email_address: args.email_address})
                .then(hacker => {
                    if (hacker) throw new Error("EmailExists");
                    // Generate the salt
                    salt = uuid();
                    // Hash the password
                    return pbkdf2.pbkdf2(args.password, salt, 100000, 64, 'sha512');
                })
                .then(password => {
                    password       = password.toString('hex');
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

    /**
     * Get self
     * @param obj
     * @param args
     * @param context
     * @returns {*}
     */
    static me(obj, args, context) {
        return context.hacker;
    }

    /**
     * Update a hacker's info
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        return new Promise((resolve, reject) => {
            if (!context.hacker && !context.user) {
                return reject("Unauthorized");
            }
            if (context.hacker && context.hacker._id.toString() !== args.id) {
                return reject("Unauthorized");
            }
            if (context.user && !context.user.isAdmin()) {
                return reject("Unauthorized");
            }
            Hacker.findOne({_id: args.id})
                .then(hacker => {
                    if (!hacker) {
                        throw new Error("HackerNotFound");
                    }
                    return hacker.set(args.hacker).save();
                })
                .then(hacker => {
                    resolve(hacker);
                })
                .catch(e => reject(e));
        })
    }

    /**
     * Get all HackerApplications
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static async applications(obj, args, context) {
        let filter = {hacker_id: obj._id};
        if(args.submitted !== null) {
            filter.submitted_at = {$exists: args.submitted}
        }
        return await HackerApplication.find(filter);
    }

    /**
     * Send a password reset email
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<boolean>}
     */
    static async sendPasswordResetEmail(obj, args, context) {
        let hacker = await Hacker.findOne({email_address: args.email_address});
        if (!hacker) throw new Error("HackerNotFound");
        const code       = Math.floor(10000000 + Math.random() * 90000000); // Random 8 digit number
        const hackerCode = new HackerPasswordResetCode({
            hacker_id: hacker._id,
            code,
            expire_at: new Date(new Date().getTime() + 300000) // 1000 * 60 * 5 (5 min)
        });
        await hackerCode.save();
        const template = new PasswordResetTemplate({code});
        await EmailServiceProvider.sendWithTemplate(hacker.email_address, template);
        return true;
    }

    /**
     * Reset hacker password
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<*>}
     */
    static async resetPassword(obj, args, context) {
        let hacker = await Hacker.findOne({email_address: args.email_address});
        if (!hacker) throw new Error("HackerNotFound");
        let code = await HackerPasswordResetCode.findOne({
            hacker_id: hacker._id,
            code: args.code
        });
        if (!code) throw new Error("InvalidCode");
        if (code.expire_at.getTime() < new Date().getTime()) {
            await code.remove();
            throw new Error("InvalidCode");
        }
        if (args.new_password.length < 8) throw new Error("PasswordTooShort");
        let newPassword = await pbkdf2.pbkdf2(args.new_password, hacker.salt, 100000, 64, 'sha512');
        await code.remove();
        hacker.set({password: newPassword.toString('hex')});
        await hacker.save();
        return hacker;
    }


    /**
     * List all hackers
     * @param {Mixed} obj
     * @param {{}} args
     * @param {Mixed} context
     * @returns {Promise<Hacker[]>}
     */
    static async list(obj, args, context) {
        if (!await IsAuthenticatedAsAdminUserRule.pass(context)) {
            throw new PermissionError("You don't have enough permission to list hackers.");
        }
        return await Hacker.find({...args});
    }
}

module.exports = HackerController;

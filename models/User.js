const mongoose = require('mongoose');
const pbkdf2   = require('pbkdf2');
const util     = require('util');
const uuid     = require('uuid-v4');
pbkdf2.pbkdf2  = util.promisify(pbkdf2.pbkdf2);

let userSchema = mongoose.Schema(
    {
        // Primary key
        username: String,
        email_address: String,
        password: String,
        salt: String,
        // Can be ADMIN
        group: String
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
);

userSchema.methods.isAdmin = function () {
    return this.group === 'admin';
};

/**
 * Hash the password.
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>}
 */
userSchema.statics.hashPassword = async function(password, salt) {
    let hash = await pbkdf2.pbkdf2(password, salt, 100000, 64, 'sha512');
    return hash.toString('hex');
};

/**
 * Create an new user
 * @param {{username: string, email_address: string?, password: string, group: string}} arguments
 * @returns {Promise<User>}
 */
userSchema.statics.create = async function (arguments) {
    if(await this.findOne({username: arguments.username})) {
        throw new Error("Duplicate username, username must be globally unique.");
    }
    let newProperties = {...arguments};
    newProperties.salt = uuid();
    newProperties.password = await this.hashPassword(arguments.password, newProperties.salt);
    let newUser = new this(newProperties);
    await newUser.save();
    return newUser;
};

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
    {
        username: String,
        email_address: String,
        password: String,
        salt: String,
        group: String
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

userSchema.methods.isAdmin = function () {
    return this.group === 'admin';
};

module.exports = mongoose.model('User', userSchema);
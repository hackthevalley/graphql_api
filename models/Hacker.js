const mongoose = require('mongoose');

let hackerSchema = mongoose.Schema(
    {
        email_address: String,
        password: String,
        salt: String,
        first_name: String,
        last_name: String,
        gender: String,
        dob: String,
        school: String,
        phone_number: String,
        github: String,
        linkedin: String,
        website: String,
        description: String,
        avatar: String,
        promo_email: Boolean,
        resume: String
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Hacker', hackerSchema);

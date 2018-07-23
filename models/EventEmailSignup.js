const mongoose = require('mongoose');

let eventEmailSignupSchema = mongoose.Schema(
    {
        event_id: mongoose.SchemaTypes.ObjectId,
        email: String
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('EventEmailSignup', eventEmailSignupSchema);
const mongoose = require('mongoose');

let userTokenSchema = mongoose.Schema(
    {
        user_id: mongoose.SchemaTypes.ObjectId,
        token_body: String,
        expire_at: Date
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('UserToken', userTokenSchema);

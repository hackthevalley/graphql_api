const mongoose = require('mongoose');

let eventSchema = mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Event', eventSchema);
const mongoose = require('mongoose');

let applicationSchema = mongoose.Schema(
    {
        event_id: mongoose.SchemaTypes.ObjectId,
        name: String,
        description: String,
        open: Boolean,
        questions: [
            {
                type: String,
                name: String,
                description: String,
                required: Boolean,
                // Following are type dependent
                choices: [String],
                max_characters: Number
            }
        ]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Application', applicationSchema);
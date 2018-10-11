const mongoose = require('mongoose');

let hackerApplicationSchema = mongoose.Schema(
    {
        application_id: mongoose.SchemaTypes.ObjectId,
        hacker_id: mongoose.SchemaTypes.ObjectId,
        submitted_at: Date,
        answers: [
            {
                question_id: mongoose.SchemaTypes.ObjectId,
                answer: String
            }
        ]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('HackerApplication', hackerApplicationSchema);
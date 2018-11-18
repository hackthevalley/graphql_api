/*---------------------------------------------
 * HackerPasswordResetCode.js
 * A 4 digit password reset code for hackers.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

const mongoose = require('mongoose');

let hackerPasswordResetCodeSchema = mongoose.Schema(
    {
        hacker_id: mongoose.SchemaTypes.ObjectId,
        code: String,
        expire_at: Date
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('HackerPasswordResetCode', hackerPasswordResetCodeSchema);

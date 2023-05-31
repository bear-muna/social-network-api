const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, 'Too long of a reaction'],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (date) => timeSince(date)
        }
    },
    {
        // toJSON: { getters: true },
        id: false
    }
);

module.exports = reactionSchema;
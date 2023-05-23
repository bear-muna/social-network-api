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
            // TODO: Create a getter to format date
        }
    },
    {
        id: false
    }
);

module.exports = reactionSchema;
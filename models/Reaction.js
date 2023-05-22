const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId,
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
    }
);

module.exports = reactionSchema;
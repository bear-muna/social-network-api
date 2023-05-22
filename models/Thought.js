const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'Need an input'],
            maxLength: [280, 'Thought is too long']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: Create getter to format date
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
    .get( function () {
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
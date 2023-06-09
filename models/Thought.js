const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
            // get: (date) => timeSince(date)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            // getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
    .get( function () {
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
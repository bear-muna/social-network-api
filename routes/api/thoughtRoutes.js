const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// API Get Thoughts & Create Thought
router.route('/').get(getThoughts).post(createThought);

// API Get Thoughts by ID
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// API Create Reaction by ID
router.route('/:thoughtId/reactions').post(createReaction);

// API Delete Reaction by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
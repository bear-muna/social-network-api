const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction
} = require('../../controllers/thoughtController');

// API Get Thoughts & Create Thought
router.route('/').get(getThoughts).post(createThought);

// API Get Thoughts by ID
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// API Reaction by ID
router.route('/:thoughtId/reactions').post(createReaction);

module.exports = router;
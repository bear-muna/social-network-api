const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser
} = require('../../controllers/userController');

// API GET USERS & CREATE USER
router.route('/').get(getUsers).post(createUser);

// API GET SINGLE USER
router.route('/:id').get(getSingleUser);

module.exports = router;
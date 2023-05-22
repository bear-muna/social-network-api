const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser
} = require('../../controllers/userController');

// API GET USERS & CREATE USER
router.route('/').get(getUsers).post(createUser);

// API GET SINGLE USER
router.route('/:id').get(getSingleUser).put(updateUser);

module.exports = router;
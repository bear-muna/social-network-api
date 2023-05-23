const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// API GET USERS & CREATE USER
router.route('/').get(getUsers).post(createUser);

// API GET SINGLE USER
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// API Friend's List
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
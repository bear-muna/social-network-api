const { User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // Update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: req.body }, 
            { runValidators: true, new: true })
            .then((dbUserData) => 
            !dbUserData
            ? res.status(400).json({ msg: "No user in db" })
            : res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // Delete user by ID
    async deleteUser(req, res) {
        try {
            const delUser = await User.findByIdAndDelete(req.params.id);
            if (!delUser) {
                return res.status(400).json({ msg: "No user exists in db" })
            }
            res.json(delUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error deleting user', error })
        }
    }
}
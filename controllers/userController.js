const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
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
            const dbUserData = await User.findOneAndDelete(
                { _id: req.params.id}
            );
            if (!dbUserData) {
                return res.status(400).json({ msg: "No user exists in db" })
            }
            const dbThoughtData = await Thought.find(
                { username: dbUserData.username }
            )
            for (let i = 0; i < dbThoughtData.length; i++) {
                await dbThoughtData[i].delete()
            }
            res.json(dbUserData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error deleting user', error })
        }
    },
    // Add a Friend
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId });
            const dbFriendData = await User.findOne({ _id: req.params.friendId });

            if (!(dbUserData && dbFriendData)) {
                return res.status(400).json({ msg: "Users do not exist in db" });
            }

            const updateUser = await dbUserData.update(
                { $addToSet: { friends: dbFriendData._id}},
                { new: true }
            );

            const updateFriend = await dbFriendData.update(
                { $addToSet: { friends: dbUserData._id }},
                { new: true }
            );

            res.json({ updateUser, updateFriend })
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error adding friend', error });
        }
    },
    // Delete a Friend
    async deleteFriend(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId });
            const dbFriendData = await User.findOne({ _id: req.params.friendId });

            if (!(dbUserData && dbFriendData)) {
                return res.status(400).json({ msg: "Users do not exist in db" });
            }

            const deleteUser = await dbUserData.update(
                { $pull: { friends: dbFriendData._id } },
                { new: true }
            );

            const deleteFriend = await dbFriendData.update(
                { $pull: { friends: dbUserData._id } },
                { new: true }
            );

            res.json({ deleteUser, deleteFriend });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error deleting friend', error });
        }
    }
}
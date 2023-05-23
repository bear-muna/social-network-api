const { Thought, User } = require('../models');

module.exports = {
    // Get ALL Thoughts
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find();
            if (!dbThoughtData[0]) {
                return res.status(400).json({ msg: "No thoughts within the db" });
            }
            res.json(dbThoughtData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error getting all thoughts", error });
        }
    },
    // Get Thought by ID
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findById(req.params.id);
            if (!dbThoughtData) {
                return res.status(400).json({ msg: "No thought with ID in db" });
            }
            res.json(dbThoughtData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error getting thought by ID", error });
        }
    },
    // Create Thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            if (dbThoughtData) {
                const dbUserData = await User.findOneAndUpdate(
                        { _id: req.body.UserId },
                        { $addToSet: { thoughts: dbThoughtData._id }},
                        { new: true }
                );
                if (!dbUserData) {
                    return res.status(400).json({ msg: "User does not exist in db" });
                }
                res.json(dbUserData)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error creating a thought", error });
        }
    }
}
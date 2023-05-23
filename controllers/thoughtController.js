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
    },
    // Update Thought by ID
    async updateThought(req, res) {
        try {
            const updateThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updateThoughtData) {
                return res.status(400).json({ msg: "No thought in db " });
            }
            res.json(updateThoughtData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error updating a thought", error });
        }
    },
    // Delete Thought by ID
    async deleteThought(req, res) {
        try {
            const delThought = await Thought.findOneAndDelete(
                { _id: req.params.id },
            );
            if (!delThought) {
                return res.status(400).json({ msg: "No thought exists in db" });
            }
            res.json(delThought)
            // TODO: Extend this function to delete parent's subdocument of thoughts
            // if (delThought) {
            //     const dbUserData = await User.findOne({ thoughts: delThought._id });
            //     if (dbUserData) {
            //         const cascadeUser = await dbUserData.thoughts.pull( delThought._id );
            //         res.json(cascadeUser);
            //     } else {
            //         return res.status(400).json({ msg: "No user exists in db" })
            //     }
            // }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error deleting thought", error });
        }
    }
}
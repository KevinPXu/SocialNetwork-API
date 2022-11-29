const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => {
        const thoughtObj = {
          thought,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("__v")
      .populate("reactions")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "thought created but found no user with that ID",
            })
          : res.json("created thought")
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought deleted, but no user found" })
          : res.json({ message: "Thought deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

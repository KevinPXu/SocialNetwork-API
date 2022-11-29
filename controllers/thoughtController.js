const { ObjectId } = require("mongoose").Types;
//importing thought and user
const { Thought, User } = require("../models");

//exporting the functions listed below
module.exports = {
  //retrieving all thoughts
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
  //retrieving a single thought based on the id given and populating the reactions
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
  //creates a new thought and adds the thought to a specified user
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
  //deletes thought and removes it from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : //removes the thought we deleted from the user as well
            User.findOneAndUpdate(
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
  //update a thoughts contents and revalidates it making sure the updates are what we need
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
  //adds a reaction to the thought and creates a new reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //removes a reaction from the associated thought
  removeReaction(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: { reactions: req.params.reactionId },
      },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

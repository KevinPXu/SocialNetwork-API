const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

//export functions below
module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Gets a single user based on their id and populates their thoughts and friends
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("__v")
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      );
  },
  //creates a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //updates a user and revalidates the user information`P
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //deletes a user and all associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID!" })
          : //deletes the thoughts associated with the user
            Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "user and their thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //adds a friend to the user using the user ids
  addFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //removes a friend from the specified user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: { friends: req.params.friendId },
      },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

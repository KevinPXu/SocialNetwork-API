const router = require("express").Router();
//imports all functions from the user controller
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/UserController");

//get all users route and create a single user route
router.route("/").get(getUsers).post(createUser);

//get a single user, update a single user, and delete a single user route.
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//add and remove a friend from a user route
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;

const router = require("express").Router();
//imports all the functions from the controllers and sets them to the given routes
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

//get all and post route to create a thought and retrieve all thoughts
router.route("/").get(getThought).post(createThought);

//get a single thought, update a single thought, and delete a single thought using the thoughtID
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//route to add a reaction to a thought using the thought ID
router.route("/:thoughtId/reactions").post(addReaction);

//route to remove a reaction from a thought using the reaction ID and thought ID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

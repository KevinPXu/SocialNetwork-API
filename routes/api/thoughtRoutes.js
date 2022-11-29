const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);

router.route("/:thoughtId").get(getSingleThought);

module.exports = router;

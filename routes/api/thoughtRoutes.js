const router = require("express").Router();
const {
  getThought,
  createThought,
} = require("../../controllers/thoughtController");
const { create } = require("../../models/Thought");

router.route("/").get(getThought).post(createThought);

module.exports = router;

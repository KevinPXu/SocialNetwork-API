const router = require("express").Router();
const { getUsers, createUser } = require("../../controllers/UserController");

router.route("/").get(getUsers).post(createUser);

module.exports = router;

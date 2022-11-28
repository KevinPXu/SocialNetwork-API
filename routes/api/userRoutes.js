const router = require("express").Router();
const { getUsers } = require("../../controllers/UserController");

router.route("/").get(getUsers);

module.exports = router;

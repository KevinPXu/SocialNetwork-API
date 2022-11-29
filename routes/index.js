const router = require("express").Router();
const apiRoutes = require("./api");
//api route
router.use("/api", apiRoutes);

//sends a wrong route message if the route does not exist
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;

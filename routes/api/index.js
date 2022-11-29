const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//uses thoughts and users routes as the base routes 
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;

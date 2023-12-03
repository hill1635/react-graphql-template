const router = require("express").Router();
const userRoutes = require("./users");
const placeRoutes = require("./places");

router.use("/users", userRoutes);
router.use("/places", placeRoutes);

module.exports = router;
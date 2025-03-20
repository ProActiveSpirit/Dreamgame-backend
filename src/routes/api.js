const express = require("express");

const nexwayRoutes = require("./nexway");
const nintendoRoutes = require("./nintendo");
const epayRoutes = require("./epay");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const orderRoutes = require("./order");
const productRoutes = require("./product");

const router = express.Router();

// Use the combined routes from the index.js file
router.use("/nexway", nexwayRoutes);
router.use("/nintendo", nintendoRoutes);
router.use("/epay", epayRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/order", orderRoutes);
router.use("/product", productRoutes);

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Ok" });
});

module.exports = router;

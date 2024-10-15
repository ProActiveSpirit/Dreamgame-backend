const express = require("express");
const router = express.Router();
const {
  getCrossUpSellHandler
} = require("@controllers/nexway/crossSellController");

router.get("/:productId", getCrossUpSellHandler);

module.exports = router;

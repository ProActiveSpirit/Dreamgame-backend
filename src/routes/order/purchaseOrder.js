const express = require("express");
const router = express.Router();
const {
  getPurchaseAll,
  getPurchase,
  editPurchase,
  addPurchase,
} = require("../../controllers/order/purchaseorder");

router.get("/getPruchaseAll", getPurchaseAll);                                 
router.get("/getPruchase", getPurchase);
router.post("/editPruchases", editPurchase);
router.put("/addPruchase", addPurchase);

module.exports = router;
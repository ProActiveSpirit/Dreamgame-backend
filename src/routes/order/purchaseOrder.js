const express = require("express");
const router = express.Router();
const {
  getPurchaseAll,
  deletePurchase,
  editPurchase,
  addPurchase,
} = require("../../controllers/order/purchaseorder");

// Routes
router.get("/getPurchaseAll", getPurchaseAll); // Fetch all sales orders
router.post("/addPurchase", addPurchase); // Add a new sales order
router.put("/editPurchase", editPurchase); // Edit an existing sales order
router.delete("/deletePurchase/:id", deletePurchase); // Delete a sales order by ID

module.exports = router;
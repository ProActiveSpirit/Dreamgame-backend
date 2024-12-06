const express = require("express");
const router = express.Router();
const {
  getSalesAll,
  deleteSale,
  editSales,
  addSales,
  saveRelatedPurchase,
} = require("../../controllers/order/salesorder");

// Routes
router.get("/getSalesAll", getSalesAll); // Fetch all sales orders
router.post("/addSales", addSales); // Add a new sales order
router.put("/editSales", editSales); // Edit an existing sales order
router.delete("/deleteSale/:id", deleteSale); // Delete a sales order by ID
router.post("/saveRelatedPurchase", saveRelatedPurchase); // Delete a sales order by ID

module.exports = router;
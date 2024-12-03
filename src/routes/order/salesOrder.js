const express = require("express");
const router = express.Router();
const {
  getSalesAll,
  getSale,
  editSales,
  addSales,
} = require("../../controllers/order/salesorder");

// Routes
router.get("/getSalesAll", getSalesAll); // Fetch all sales orders
router.get("/getSale", getSale); // Fetch a single sales order by ID or name
router.post("/addSales", addSales); // Add a new sales order
router.put("/editSales", editSales); // Edit an existing sales order

module.exports = router;
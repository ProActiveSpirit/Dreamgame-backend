const express = require("express");
const router = express.Router();
const {
    getSales,
    editSales,
    addSales
} = require("../../controllers/order/salesorder");

const {
    getPurchase,
    editPurchase,
    addPurchase
} = require("../../controllers/order/purchaseorder");

router.post("/sales/getAll", getSales);
router.post("/sales/edit", editSales);
router.post("/sales/add", addSales);

router.post("/purchase/getAll", getPurchase);
router.post("/purchase/edit", editPurchase);
router.post("/purchase/add", addPurchase);

module.exports = router;
 
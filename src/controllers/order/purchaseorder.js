const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ------------------------------------------------------
// Get All Purchase Orders
// ------------------------------------------------------
async function getPurchaseAll(req, res) {
  try {
    const PurchaseOrders = await prisma.PurchaseOrder.findMany(); // Fetch all Purchase orders
    res.status(200).json({ success: true, data: PurchaseOrders });
  } catch (error) {
    console.error("Error fetching Purchase orders:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Get a Single Purchase Order by ID
// ------------------------------------------------------
async function getPurchase(req, res) {
  const { id } = req.query; // Expecting `id` as a query parameter

  try {
    // Find the Purchase order by ID
    const PurchaseOrder = await prisma.PurchaseOrder.findUnique({
      where: { id: parseInt(id) },
    });

    if (!PurchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase order not found" });
    }

    res.status(200).json({ success: true, data: PurchaseOrder });
  } catch (error) {
    console.error("Error fetching Purchase order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Add a New Purchase Order
// ------------------------------------------------------
async function addPurchase(req, res) {
  const { name, quantity, price } = req.body;

  if (!name || !quantity || !price) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Create a new Purchase order
    const newPurchaseOrder = await prisma.PurchaseOrder.create({
      data: {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      },
    });

    res.status(201).json({ success: true, data: newPurchaseOrder });
  } catch (error) {
    console.error("Error adding Purchase order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Edit an Existing Purchase Order
// ------------------------------------------------------
async function editPurchase(req, res) {
  const { id, name, quantity, price } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Purchase order ID is required" });
  }

  try {
    // Update the Purchase order with the provided fields
    const updatedPurchaseOrder = await prisma.PurchaseOrder.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(quantity && { quantity: parseInt(quantity) }),
        ...(price && { price: parseFloat(price) }),
      },
    });

    res.status(200).json({ success: true, data: updatedPurchaseOrder });
  } catch (error) {
    console.error("Error editing Purchase order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getPurchaseAll, getPurchase, addPurchase, editPurchase };
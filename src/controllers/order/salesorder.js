const prisma = require('../../prisma');

// ------------------------------------------------------
// Get All Sales Orders
// ------------------------------------------------------
async function getSalesAll(req, res) {
  try {
    const salesOrders = await prisma.salesOrder.findMany({}); // Fetch all sales orders
    console.log("salesOrders" , salesOrders);
    res.status(200).json({ success: true, data: salesOrders });
  } catch (error) {
    console.error("Error fetching sales orders:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Get a Single Sales Order by ID
// ------------------------------------------------------
async function getSale(req, res) {
  const { id } = req.query; // Expecting `id` as a query parameter

  try {
    // Find the sales order by ID
    const salesOrder = await prisma.salesOrder.findUnique({
      where: { id: parseInt(id) },
    });

    if (!salesOrder) {
      return res.status(404).json({ success: false, message: "Sales order not found" });
    }

    res.status(200).json({ success: true, data: salesOrder });
  } catch (error) {
    console.error("Error fetching sales order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Add a New Sales Order
// ------------------------------------------------------
async function addSales(req, res) {
  const { salesIncVat, salesVat, salesExtVat, salesCurrency, Quantity, endDate, startDate, sku, customerId, productId} = req.body;

  // if (!name || !quantity || !price) {
  //   return res.status(400).json({ success: false, message: "All fields are required" });
  // }
  const prisma = require('../../prisma');
  try {
    // Create a new sales order
    const newSalesOrder = await prisma.salesOrder.create({
      data: {
        salesIncVat,
        salesVat,
        salesExtVat,
        salesCurrency,
        quantity: parseInt(Quantity),
        endDate,
        startDate,
        sku,
        price: parseFloat(price),
        totalPrice: parseFloat(price),
        status: false,
        customerId,
        productId,
      },
    });

    res.status(201).json({ success: true, data: newSalesOrder });
  } catch (error) {
    console.error("Error adding sales order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Edit an Existing Sales Order
// ------------------------------------------------------
async function editSales(req, res) {
  const { id, name, quantity, price } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Sales order ID is required" });
  }

  try {
    // Update the sales order with the provided fields
    const updatedSalesOrder = await prisma.salesOrder.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(quantity && { quantity: parseInt(quantity) }),
        ...(price && { price: parseFloat(price) }),
      },
    });

    res.status(200).json({ success: true, data: updatedSalesOrder });
  } catch (error) {
    console.error("Error editing sales order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getSalesAll, getSale, addSales, editSales };
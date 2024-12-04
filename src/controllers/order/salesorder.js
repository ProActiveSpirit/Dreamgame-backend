const prisma = require('../../prisma');

// ------------------------------------------------------
// Get All Sales Orders
// ------------------------------------------------------
async function getSalesAll(req, res) {
  try {
    const salesOrders = await prisma.salesOrder.findMany({
      include: {
        product: true, // Include the related Product details
        customer: true, // Include the related Customer details
      }
    }); // Fetch all sales orders
    res.status(200).json({ salesOrders });
  } catch (error) {
    console.error("Error fetching sales orders:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// ------------------------------------------------------
// Add a New Sales Order
// ------------------------------------------------------
async function addSales(req, res) {
  const { salesIncVat, salesVat, salesExtVat, salesCurrency, Quantity, endDate, startDate, Customer, Product} = req.body;

  // if (!name || !quantity || !price) {
  //   return res.status(400).json({ success: false, message: "All fields are required" });
  // }
  try {
    // Create a new sales order
    const newSalesOrder = await prisma.salesOrder.create({
      data: {
        customerId: Customer,
        productId: Product,
        salesVat,
        salesIncVat,
        salesExtVat,
        expectedCost: parseFloat(salesExtVat*Quantity),
        avgCost: salesIncVat,
        processQuantity: 0,
        totalQuantity: parseInt(Quantity),
        salesCurrency,
        totalPrice: parseFloat(salesIncVat*Quantity),
        startDate,
        endDate,  
        status: "Processing",
        N_A: "N/A",
      },
    });

    res.status(200).json({ success: true, data: newSalesOrder });
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

// ------------------------------------------------------
// Delete an Existing Sales Order
// ------------------------------------------------------
async function deleteSale(req, res) {
  const { id } = req.params; // Extract the ID from the URL parameters
  console.log("id" , id);
  if (!id) {
    return res.status(400).json({ success: false, message: "Sales order ID is required" });
  }

  try {
    // Delete the sales order using Prisma (or your ORM)
    const deletedSalesOrder = await prisma.salesOrder.delete({
      where: { id }, // Ensure the ID is parsed as an integer
    });

    // Respond with success and the deleted sales order info
    res.status(200).json({ success: true, data: deletedSalesOrder });
  } catch (error) {
    console.error("Error deleting sales order:", error.message);

    // Handle errors such as record not found
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getSalesAll, deleteSale, addSales, editSales };
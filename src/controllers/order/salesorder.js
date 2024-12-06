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

// -------------------------------------------------------------
// Save the Related PurchaseOrders
// -------------------------------------------------------------

async function saveRelatedPurchase(req, res) {
  const { id, purchase } = req.body;
  // Validate that the sales order ID is provided
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Sales order ID is required" });
  }

  if (!purchase || !Array.isArray(purchase)) {
    return res
      .status(400)
      .json({ success: false, message: "Purchase orders data is required" });
  }

  try {
    // Check if the SalesOrder exists
    const salesOrder = await prisma.salesOrder.findUnique({
      where: { id },
    });

    if (!salesOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Sales order not found" });
    }

    // Fetch all valid Product IDs from the database
    const validProductIds = await prisma.product.findMany({
      select: { id: true },
    });

    const productIdSet = new Set(validProductIds.map((product) => product.id));

    // Filter out purchases with invalid Product Name or Quantity == 0
    const validPurchaseOrders = purchase.filter(
      (p) => p.Quantity > 0 && p.Product && productIdSet.has(p.ProductId)
    );

    if (validPurchaseOrders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid purchase orders to save (invalid Product IDs or all entries have Quantity = 0)",
      });
    }

    // Create new PurchaseOrder records
    const createdPurchaseOrders = await Promise.all(
      validPurchaseOrders.map((p) =>
        prisma.purchaseOrder.create({
          data: {
            region: p.Region || null,
            productId: p.ProductId, // Valid Product ID
            costIncVat: parseFloat(p.CostIncVat) || 0,
            costExtVat: parseFloat(p.CostExtVat) || 0,
            processQuantity: parseInt(p.Quantity), // Use Quantity for processQuantity
            totalQuantity: parseInt(p.Quantity), // Assuming totalQuantity is the same as Quantity
            totalPrice: parseFloat(p.TotalCostIncVat) || 0,
            job:0,
            status: "Processing", // Default status
            salesOrderId: id, // Link the purchase order to the sales order
            startDate: new Date(), // Default to now, or adjust as needed
            endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Set endDate to 24 hours from now
            createdOn: new Date(),
          },
        })
      )
    );

    // Update the SalesOrder with the new PurchaseOrders
    await prisma.salesOrder.update({
      where: { id },
      data: {
        purchaseOrders: {
          connect: createdPurchaseOrders.map((po) => ({ id: po.id })), // Connect created PurchaseOrders
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Purchase orders saved and linked to the sales order successfully",
      data: createdPurchaseOrders,
    });
  } catch (error) {
    console.error("Error saving purchase orders:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getSalesAll, deleteSale, addSales, editSales, saveRelatedPurchase };
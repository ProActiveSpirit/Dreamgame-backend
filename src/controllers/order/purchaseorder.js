const prisma = require('../../prisma');

// ------------------------------------------------------
// Get All Purchase Orders
// ------------------------------------------------------
async function getPurchaseAll(req, res) {
  try {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      include: {
        product: true, // Include the related Product details
      }
    }); // Fetch all purchase orders
    res.status(200).json({ purchaseOrders });
  } catch (error) {
    console.error("Error fetching purchase orders:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// ------------------------------------------------------
// Add a New Purchase Order
// ------------------------------------------------------
async function addPurchase(req, res) {
  const { Product, Quantity, Region, costExtVat, costIncVat, startDate, endDate } = req.body;

  // if (!name || !quantity || !price) {
  //   return res.status(400).json({ success: false, message: "All fields are required" });
  // }

  try {
    // Create a new purchase order
    console.log("Region", Region);
    const response = await Promise.all(
      Region.map((r) => {
        console.log("r", r);
        return prisma.purchaseOrder.create({
          data: {
            costIncVat: parseFloat(costIncVat),
            costExtVat: parseFloat(costExtVat),
            processQuantity: 0,
            region: r,
            totalQuantity: parseInt(Quantity),
            totalPrice: parseFloat(costExtVat * Quantity),
            startDate: new Date(startDate),
            // endDate: endDate ? new Date(endDate) : null,
            job: 1,
            status: "Processing",
            product: {
              connect: {
                id: Product // Use the Product ID to connect to existing product
              }
            }
          },
        });
      })
    );

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error adding purchase order:", error.message);
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
    // Update the purchase order with the provided fields
    const updatedPurchaseOrder = await prisma.purchaseOrder.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(quantity && { quantity: parseInt(quantity) }),
        ...(price && { price: parseFloat(price) }),
      },
    });

    res.status(200).json({ success: true, data: updatedPurchaseOrder });
  } catch (error) {
    console.error("Error editing purchase order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// ------------------------------------------------------
// Delete an Existing Purchase Order
// ------------------------------------------------------
async function deletePurchase(req, res) {
  const { id } = req.params; // Extract the ID from the URL parameters
  console.log("id" , id);
  if (!id) {
    return res.status(400).json({ success: false, message: "Purchase order ID is required" });
  }

  try {
    // Delete the purchase order using Prisma (or your ORM)
    const deletedPurchaseOrder = await prisma.purchaseOrder.delete({
      where: { id }, // Ensure the ID is parsed as an integer
    });

    // Respond with success and the deleted purchase order info
    res.status(200).json({ success: true, data: deletedPurchaseOrder });
  } catch (error) {
    console.error("Error deleting purchase order:", error.message);

    // Handle errors such as record not found
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getPurchaseAll, deletePurchase, addPurchase, editPurchase };
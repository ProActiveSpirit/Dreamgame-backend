const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function getProducts() {
  try {
    // Read the contents of the JSON files
    const nameData = fs.readFileSync(path.join(__dirname, "name.txt"), "utf8");
    const priceData = fs.readFileSync(
      path.join(__dirname, "price.txt"),
      "utf8"
    );
    const skuData = fs.readFileSync(path.join(__dirname, "sku.txt"), "utf8");

    // Parse the JSON data
    const names = nameData.split("\n").filter(Boolean);
    const prices = priceData.split("\n").filter(Boolean);
    const skus = skuData.split("\n").filter(Boolean);

    // Check if all arrays have the same length
    if (names.length !== prices.length || names.length !== skus.length) {
      throw new Error("Data files are not aligned: length mismatch.");
    }

    // Map the data to create the desired output
    const transformedData = names.map((name, index) => ({
      name: name.trim(),
      stock: "Stock",
      price: parseFloat(prices[index].trim()),
      provider: "Epay",
      region: "en",
      sku: skus[index].trim(),
      publisher: "Epay",
      status: "Active",
      createdAt: "   "
    }));

    // Perform the database operations
    async function saveDataToDatabase() {
      await Promise.all(transformedData.map(async (data) => {
        await prisma.epayData.create({
          data: {
            name: data.name,
            price: data.price,
            sku: data.sku,
          }
        });
      }));
    }

    // Call the function to execute it
    saveDataToDatabase().catch(console.error);

    
    return transformedData;
  } catch (error) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}

module.exports = { getProducts };

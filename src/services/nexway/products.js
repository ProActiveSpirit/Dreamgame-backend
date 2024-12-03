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

    // // Check if all arrays have the same length
    // if (names.length !== prices.length || names.length !== skus.length) {
    //   throw new Error("Data files are not aligned: length mismatch.");
    // }

    // Map the data to create the desired output
    const transformedData = names.map((name, index) => ({
      name: name.trim(),
      stock: [1,0,0,0],
      price: parseFloat(prices[index].trim()),
      provider: "Nexway",
      region: "en,de,fr,es,it,nl,pt",
      sku: skus[index].trim(),
      publisher: "Nexway",
      status: parseFloat(prices[index].trim()) ? "Active": "InActive",
    }));

    // Perform the database operations
    async function saveDataToDatabase() {
      await Promise.all(transformedData.map(async (data) => {
        await prisma.Product.create({
          data: {
            name: data.name,
            stock: data.stock,
            price: data.price,
            provider: data.provider,
            region: data.region,
            sku: data.sku,
            publisher: data.publisher,
            status: data.price ? "Active": "InActive",
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

const fs = require("fs");
const path = require("path");

async function getProducts() {
  try {
    // Read the contents of the JSON files
    const nameData = fs.readFileSync(path.join(__dirname, "name.json"), "utf8");
    const priceData = fs.readFileSync(
      path.join(__dirname, "price.json"),
      "utf8"
    );
    const skuData = fs.readFileSync(path.join(__dirname, "sku.json"), "utf8");

    // Parse the JSON data
    const names = nameData.split("\n").filter(Boolean);
    const prices = priceData.split("\n").filter(Boolean);
    const skus = skuData.split("\n").filter(Boolean);

    // Check if all arrays have the same length
    if (names.length !== prices.length || names.length !== skus.length) {
      throw new Error("Data files are not aligned: length mismatch.");
    }

    // Map the data to create the desired output
    const products = names.map((name, index) => {
      return {
        name: name.trim(),
        price: parseFloat(prices[index].trim()),
        sku: skus[index].trim()
      };
    });

    return products;
  } catch (error) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}

module.exports = { getProducts };

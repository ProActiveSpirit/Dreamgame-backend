const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const drm = [
  "XBOX Series X|S / XBOX One",
  "Nintendo Switch",
  "XBOX Series X|S", 
  "Nintendo", 
  "Windows 10", 
  "XBOX Series X|S / Windows 10", 
  "XBOX One", 
  "PC", 
  "Steam", 
  "XBOX"
];

async function getProducts() {
  try {
    // Read the contents of the JSON files
    const nameData = fs.readFileSync(path.join(__dirname, "name.txt"), "utf8");
    const priceData = fs.readFileSync(path.join(__dirname, "price.txt"), "utf8");
    const skuData = fs.readFileSync(path.join(__dirname, "sku.txt"), "utf8");
    const drmData = fs.readFileSync(path.join(__dirname, "drm.txt"), "utf8");

    // Parse the JSON data
    const names = nameData.split("\n").filter(Boolean);
    const prices = priceData.split("\n").filter(Boolean);
    const skus = skuData.split("\n").filter(Boolean);
    const drms = drmData.split("\n").filter(Boolean);

    // Map the data to create the desired output
    const transformedData = names.map((name, index) => {
      const selectedDrm = drms[index]?.trim() || drm[0];
      
      return {
        name: name.trim(),
        stock: [1,0,0,0],
        price: parseFloat(prices[index].trim()),
        provider: "Nexway",
        region: "en,de,fr,es,it,nl,pt",
        sku: skus[index].trim(),
        publisher: selectedDrm,
        status: parseFloat(prices[index].trim()) ? "Active": "InActive",
      };
    });

    // Save to database
    const savedProducts = await Promise.all(
      transformedData.map(async (product) => {
        // Check if product with this SKU already exists
        const existingProduct = await prisma.product.findUnique({
          where: { sku: product.sku }
        });

        if (existingProduct) {
          // Update existing product
          return await prisma.product.update({
            where: { sku: product.sku },
            data: {
              name: product.name,
              stock: product.stock,
              price: product.price,
              provider: product.provider,
              region: product.region,
              publisher: product.publisher,
              status: product.status,
            }
          });
        } else {
          // Create new product
          return await prisma.product.create({
            data: product
          });
        }
      })
    );

    return {
      success: true,
      message: `${savedProducts.length} products processed`,
      data: savedProducts
    };

  } catch (error) {
    console.error("Error in getProducts:", error);
    throw new Error(`Failed to get/save products: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

// Function to validate if a DRM value is valid
function isValidDrm(drmValue) {
  return drm.includes(drmValue);
}

module.exports = { getProducts, drm, isValidDrm };

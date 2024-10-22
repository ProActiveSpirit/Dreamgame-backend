const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getProducts() {
  let allResults = [];
  let result = [];
  result = await prisma.nintendoData.findMany({});

  try{
    allResults = result.map((game) => {
      return {
          name: game.title,
          stock: "Stock",
          price: game.price_regular_f,
          provider: "Nintendo",
          region: countryCode,
          sku: game.product_code_txt[0],
          publisher: game.publisher,
          status: "Active",
          createdAt: game.pretty_date_s
        };
    });
  } catch (error) {
    console.error(
      `Failed to fetch data for product information: ${error.message}`
    );
  }

  return allResults;
}

module.exports = { getProducts };
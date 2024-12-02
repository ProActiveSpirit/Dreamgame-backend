const prisma = require('../../prisma');

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
        region: game.region,
        sku: game.product_code_txt[0],
        publisher: game.publisher,
        status: "Active",
        createdAt: game.pretty_date_s
        // region_sku: game.region + game.product_code_txt[0]
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
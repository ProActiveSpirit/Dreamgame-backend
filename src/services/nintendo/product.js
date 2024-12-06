const prisma = require('../../prisma');

async function getProducts() {
  let allResults = [];
  let result = [];
  result = await prisma.nintendoData.findMany({});
  try{
    allResults = result.map((game) => {
      return {
        name: game.title,
        stock: [1,0,0,0],
        price: parseFloat(game.price_regular_f),
        provider: "Nintendo",
        region: game.region,
        sku: game.product_code_txt[0],
        publisher: game.publisher,
        status: "Active",
        createdAt: game.pretty_date_s,
        status: parseFloat(game.price_regular_f) ? "Active": "InActive",
        // region_sku: game.region + game.product_code_txt[0]
      };
    });
    console.log("allResults" , allResults);
     // Perform the database operations
     async function saveDataToDatabase() {
      await Promise.all(allResults.map(async (data) => {
        await prisma.product.create({
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

  } catch (error) {
    console.error(
      `Failed to fetch data for product information: ${error.message}`
    );
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  return allResults;        
}

module.exports = { getProducts };
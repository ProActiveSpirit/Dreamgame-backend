const axios = require("axios");
const { getGamesEurope } = require("nintendo-switch-eshop");

async function getProducts() {
  const options = {
    limit: 50, // Set this to any number you want
    locale: "en" // Set this to any valid locale string
  };

  try {
    const result = await getGamesEurope(options);

    // Map the result to transform each game object
    const transformedResult = result.map((game) => {
      return {
        name: game.title,
        stock: "Stock",
        price: game.price_regular_f,
        provider: "Nintendo",
        region: "en",
        sku: game.product_code_txt[0],
        publisher: game.publisher,
        status: "Active",
        createdAt: game.pretty_date_s
      };
    });

    return transformedResult;
  } catch (error) {
    throw new Error(`Nintendo Get Products failed: ${error.message}`);
  }
}

module.exports = { getProducts };

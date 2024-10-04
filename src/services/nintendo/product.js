const { getGamesEurope } = require("nintendo-switch-eshop");

// Define the locales you want to fetch data for
const europeanCountryCodes = ["en", "de", "fr", "es", "it", "nl", "pt", "ru"]; // Add more as needed

async function getProducts() {
  let allResults = [];

  // Loop through each country code and fetch data
  for (const countryCode of europeanCountryCodes) {
    const options = {
      limit: 50, // Adjust the limit if needed
      locale: countryCode.toLowerCase() // Use the lowercase country code
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
          region: countryCode, // Use the current country code
          sku: game.product_code_txt[0],
          publisher: game.publisher,
          status: "Active",
          createdAt: game.pretty_date_s
        };
      });

      // Add the transformed results to the allResults array
      allResults = allResults.concat(transformedResult);
    } catch (error) {
      console.error(
        `Failed to fetch data for country code ${countryCode}: ${error.message}`
      );
    }
  }

  return allResults;
}

module.exports = { getProducts };

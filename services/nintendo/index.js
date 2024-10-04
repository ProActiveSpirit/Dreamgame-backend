const express = require("express");
const router = express.Router();
const { getGamesJapan } = require("nintendo-switch-eshop");

router.get("/products", (req, res) => {
  let id = 0;
  const url = "https://www.nintendo.com";
  const array = [];

  // Use the options object correctly
  getGamesEurope()
    .then((result) => {
      result.forEach((element) => {
        if (
          element.salePrice != null &&
          element.platform === "Nintendo Switch"
        ) {
          const company =
            element.developers == null
              ? element.publishers
              : element.developers;

          const game = {
            id: id,
            url: url + element.url,
            title: element.title,
            description: element.description,
            boxArt: element.boxArt.includes(url)
              ? element.boxArt
              : url + element.boxArt,
            releaseDate: element.releaseDateMask,
            categories: element.categories,
            esrb: element.esrb,
            company: company == null ? [""] : company,
            availability: element.availability,
            price: element.msrp,
            salePrice: element.salePrice
          };

          array.push(game);
          id = id + 1;
        }
      });

      const dataEnvelope = { data: array };
      res.send(result);
    })
    .catch((error) => {
      console.error("Error fetching games:", error.message, error.stack);
      res.sendStatus(400);
    });
});

module.exports = router;

"use strict";

var express = require("express");
var router = express.Router();
var _require = require("nintendo-switch-eshop"),
  getGamesJapan = _require.getGamesJapan;
router.get("/products", function (req, res) {
  var id = 0;
  var url = "https://www.nintendo.com";
  var array = [];

  // Use the options object correctly
  getGamesEurope().then(function (result) {
    result.forEach(function (element) {
      if (element.salePrice != null && element.platform === "Nintendo Switch") {
        var company = element.developers == null ? element.publishers : element.developers;
        var game = {
          id: id,
          url: url + element.url,
          title: element.title,
          description: element.description,
          boxArt: element.boxArt.includes(url) ? element.boxArt : url + element.boxArt,
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
    var dataEnvelope = {
      data: array
    };
    res.send(result);
  })["catch"](function (error) {
    console.error("Error fetching games:", error.message, error.stack);
    res.sendStatus(400);
  });
});
module.exports = router;
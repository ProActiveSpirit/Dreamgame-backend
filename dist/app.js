"use strict";

var express = require("express");
var cors = require("cors");
require("dotenv").config();
var nexwayRoutes = require("./routes/nexway");
var nintendoRoutes = require("./routes/nintendo");
var epayRoutes = require("./routes/epay");
var app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the combined routes from the index.js file
app.use("/api/nexway", nexwayRoutes);
app.use("/api/nintendo", nintendoRoutes);
app.use("/api/epay", epayRoutes);
var PORT = 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
module.exports = app;
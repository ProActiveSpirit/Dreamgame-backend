"use strict";

var express = require("express");
var cors = require("cors");
require("dotenv").config();
require('module-alias/register');
var apiRoute = require("@routes/api");
var app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", apiRoute);
var PORT = 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
module.exports = app;
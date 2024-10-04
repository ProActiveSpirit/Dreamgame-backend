const express = require("express");
const cors = require("cors");
require("dotenv").config();

const nexwayRoutes = require("./routes/nexway");
const nintendoRoutes = require("./routes/nintendo");
const epayRoutes = require("./routes/epay");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the combined routes from the index.js file
app.use("/api/nexway", nexwayRoutes);
app.use("/api/nintendo", nintendoRoutes);
app.use("/api/epay", epayRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

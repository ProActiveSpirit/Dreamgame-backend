const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoute = require("./src/routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api" , apiRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
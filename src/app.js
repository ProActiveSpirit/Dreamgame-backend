const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("module-alias/register");

const apiRoute = require("./routes/api");

const app = express();

// Middleware

const corsOptions = {
  origin: 'https://dreamgame-frontend.vercel.app', // Replace with your actual frontend domain
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());
app.enable('trust proxy')

app.use("/api" , apiRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

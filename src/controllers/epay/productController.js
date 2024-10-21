const { getProducts } = require("@services/epay/product");

async function getProductList(req, res) {
  try {
    const products = await getProducts();
    res.json({ products });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProductList };

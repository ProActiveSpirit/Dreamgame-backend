const { getProducts } = require("../../services/nintendo/product");

async function getProductList(req, res) {
  try {
    console.log("getproducts");
    const products = await getProducts();
    res.json({ products });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProductList };

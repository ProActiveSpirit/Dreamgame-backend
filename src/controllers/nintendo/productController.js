const { getProducts } = require("@services/nintendo/product");
const { productSync } = require("@services/nintendo/productsync");


async function getProductList(req, res) {
  try {
    const products = await getProducts();
    res.json({ products });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
}

async function getProductSync(req, res) {
  try{
    const product = await productSync();
    res.json({ product });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProductList, getProductSync };

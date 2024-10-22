const { getCrossUpSell } = require("@services/nexway/crossSellManagement");

async function getCrossUpSellHandler(req, res) {
  try {
    const { productId } = req.params;
    const crossSellData = await getCrossUpSell(productId);
    res.json(crossSellData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getCrossUpSellHandler };

const { processFulfillment } = require('@services/nintendo/fulfillment');

async function fulfillmentController(req, res) {
  try {
    const { storeID, transactionID } = req.body;

    if (!storeID || !transactionID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await processFulfillment(storeID, transactionID);
    res.json(response);
  } catch (error) {
    console.log('Error in fulfillmentController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { fulfillmentController };
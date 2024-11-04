const { processCombinedReservationFulfillment } = require('../../services/nintendo/combined-reservation-fulfillment');

async function combinedReservationFulfillmentController(req, res) {
  try {
    const { storeID, transactionID, codeAcquisition } = req.body;

    if (!storeID || !transactionID || !codeAcquisition) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await processCombinedReservationFulfillment(storeID, transactionID, codeAcquisition);
    res.json(response);
  } catch (error) {
    console.log('Error in combinedReservationFulfillmentController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { combinedReservationFulfillmentController };
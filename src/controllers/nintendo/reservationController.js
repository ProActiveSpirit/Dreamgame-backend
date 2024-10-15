const { reservation } = require('@services/nintendo/reservation');

async function reservationController(req, res) {
  try {
    const { storeID, transactionID, codeAcquisition } = req.body;

    if (!storeID || !transactionID || !codeAcquisition) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await reservation(storeID, transactionID, codeAcquisition);
    res.json(response);
  } catch (error) {
    console.log('Error in reservationController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { reservationController };
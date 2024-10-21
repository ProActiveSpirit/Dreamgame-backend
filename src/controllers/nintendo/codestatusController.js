const { checkCodeStatus } = require('@services/nintendo/codestatus');

async function codeStatusController(req, res) {
  try {
    const { storeID, controlNumber } = req.body;

    if (!storeID || !controlNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await checkCodeStatus(storeID, controlNumber);
    res.json(response);
  } catch (error) {
    console.log('Error in codeStatusController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { codeStatusController };
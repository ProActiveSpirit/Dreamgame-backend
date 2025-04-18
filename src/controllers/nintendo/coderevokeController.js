const { revokeCode } = require('../../services/nintendo/coderevoke');

async function codeRevokeController(req, res) {
  try {
    const { storeID, controlNumber } = req.body;

    if (!storeID || !controlNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await revokeCode(storeID, controlNumber);
    res.json(response);
  } catch (error) {
    console.log('Error in codeRevokeController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { codeRevokeController };
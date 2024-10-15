const {
  getUserToken,
  invalidateToken
} = require("@services/nintendo/authentication");

async function getTokenHandler(req, res) {
  try {
    const token = await getUserToken();
    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function invalidateTokenHandler(req, res) {
  try {
    const { token } = req.body;
    await invalidateToken(token);
    res.json({ message: "Token invalidated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getTokenHandler, invalidateTokenHandler };

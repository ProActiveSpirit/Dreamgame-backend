const { checkHealth } = require('@services/epay/healthCheck');

async function healthCheckController(req, res) {
  try {
    const healthStatus = await checkHealth();

    if (healthStatus.errorCode) {
      return res.status(503).json(healthStatus);
    }

    res.status(200).json({ status: healthStatus.status });
  } catch (error) {
    console.log('Error in healthCheckController:', error);
    res.status(500).json({ errorCode: 'INTERNAL_SERVER_ERROR' });
  }
}

module.exports = { healthCheckController };
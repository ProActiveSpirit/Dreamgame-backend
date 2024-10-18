const axios = require("axios");

/**
 * Generate and refresh access token
 * https://api-doc.nexway.store/nexway-connect/reference/jwt-authentication/get-user-token
 * @param bool $refresh
 * @param bool $return
 *
 * @return
 * @throws Exception
 */
async function getUserToken() {
  const url = "https://api.staging.nexway.build/iam/tokens";

  const data = {
    clientSecret: process.env.client_secret,
    realmName: process.env.REALM_NAME,
    grant_type: "client_credentials"
  };

  try {
    const response = await axios.post(url, data);
    return response.data.access_token;
  } catch (error) {
    throw new Error(`Failed to get user token: ${error.message}`);
  }
}
/**
 * Reset refresh tokens
 * https://api-doc.nexway.store/nexway-connect/reference/jwt-authentication/invalidate-token
 */
async function invalidateToken(token) {
  const url = `${process.env.HOSTURL}/iam/tokens/invalidate`;
  try {
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    throw new Error(`Failed to invalidate token: ${error.message}`);
  }
}

module.exports = { getUserToken, invalidateToken };

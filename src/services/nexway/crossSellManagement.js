const { getCurlResponse } = require("./apiUtils");
const { getUserToken } = require("./authentication");

/**
 * Get cross sell and up sell products
 * https://api-doc.nexway.store/nexway-connect/reference/manage-your-products/get-cross-up-sell
 * @param string $secret
 * @param string $language
 * @param string $products
 *
 * @return string
 */
async function getCrossUpSell(hostURL, productId, secret) {
  const url = `${hostURL}/connect/catalog/cross-sell/${productId}`;
  const bearer = await getUserToken(true, true);

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "get", null, headers);
}

module.exports = { getCrossUpSell };

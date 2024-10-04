const { getCurlResponse } = require("./apiUtils");
const { getUserToken } = require("./authentication");

/**
  Get product feed
  @param string $secret
  @param string $provider
  @param string $config
  @return mixed|string
*/

async function getProductFeed(feedUrl, provider, config, secret) {
  const url = `${feedUrl}/getCatalog.xml`;

  const headers = {
    secret: secret,
    provider: provider,
    config: config
  };

  return getCurlResponse(url, "get", null, headers);
}

/**
  Get all nexway categories
  https://api-doc.nexway.store/nexway-connect/reference/get-information-on-catalog/get-categories
  @param string $secret
  @param string $language
  @return string
*/
async function getCategories(hostURL, secret, language) {
  if (!secret || !language) {
    throw new Error("secret or language Missing.");
  }
  const url = `${hostURL}/connect/catalog/categories/${language}`;
  const bearer = await getUserToken(true, true);
  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "get", null, headers);
}

/**
  Get OS list
  https://api-doc.nexway.store/nexway-connect/reference/get-information-on-catalog/get-operating-systems
  @param string $secret
  @return bool|string
*/
async function getOperatingSystems(hostURL, secret) {
  const url = `${hostURL}/connect/catalog/oslist`;
  const bearer = await getUserToken();

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    secret: secret
  };

  return getCurlResponse(url, "get", null, headers);
}

module.exports = { getCategories, getProductFeed, getOperatingSystems };

const { getCurlResponse } = require("./apiUtils");
const { getUserToken } = require("./authentication");

/**
  Get subscription status
  https://api-doc.nexway.store/nexway-connect/reference/manage-your-subscription/get-subscription-status
  @param string $secret
  @param string $partnerOrderNumber
  @param string $subscriptionId
  @return string
*/
async function getSubscriptionStatus(
  hostURL,
  secret,
  partnerOrderNumber,
  subscriptionId
) {
  if (!secret || !partnerOrderNumber || !subscriptionId) {
    throw new Error("secret or partnerOrderNumber or subscriptionId Missing.");
  }
  const url = `${hostURL}/connect/subscription`;
  const bearer = await getUserToken(true, true);
  const data = {
    partnerOrderNumber: partnerOrderNumber,
    subscriptionId: subscriptionId
  };
  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "post", data, headers);
}

/**
  Cancel subscription
  https://api-doc.nexway.store/nexway-connect/reference/manage-your-subscription/cancel-subscription
  @param string $secret
  @param string $partnerOrderNumber
  @param string $subscriptionId
  @return string
*/
async function cancelSubscription(
  hostURL,
  partnerOrderNumber,
  subscriptionId,
  secret
) {
  const url = `${hostURL}/connect/subscription/cancel`;
  const bearer = await getUserToken();

  const data = {
    partnerOrderNumber: partnerOrderNumber,
    subscriptionId: subscriptionId
  };

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    secret: secret
  };
}

/**
  Renew subscription
  https://api-doc.nexway.store/nexway-connect/reference/manage-your-subscription/renew-subscription
  @param string $secret
  @param string $partnerOrderNumber
  @param string $subscriptionId
  @return string
*/
async function renewSubscription(
  hostURL,
  partnerOrderNumber,
  subscriptionId,
  secret
) {
  const url = `${hostURL}/connect/subscription/renew`;
  const bearer = await getUserToken();

  const data = {
    partnerOrderNumber: partnerOrderNumber,
    subscriptionId: subscriptionId
  };

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    secret: secret
  };

  return getCurlResponse(url, "put", data, headers);
}

module.exports = {
  getSubscriptionStatus,
  cancelSubscription,
  renewSubscription
};

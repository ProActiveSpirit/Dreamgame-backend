const { getCurlResponse } = require("./apiUtils");
const { getUserToken } = require("./authentication");
/**
 * Create new order
 * https://api-doc.nexway.store/nexway-connect/reference/manage-your-orders/create-order
 * @param string $secret
 * @param string $order
 *
 * @return string
 */
async function createOrder(hostURL, orderDetails, secret) {
  const url = `${hostURL}/connect/order`;
  const bearer = await getUserToken(true, true);

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "post", orderDetails, headers);
}
/**
 * Get a order Information
 * https://api-doc.nexway.store/nexway-connect/reference/manage-your-orders/get-order
 * @param string $secret
 * @param string $orderId
 *
 * @return string
 */
async function getOrder(hostURL, orderId, secret) {
  const url = `${hostURL}/connect/order/${orderId}`;
  const bearer = await getUserToken();

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    secret: secret
  };

  return getCurlResponse(url, "get", null, headers);
}
/**
  Get order download info
  https://api-doc.nexway.store/nexway-connect/reference/manage-your-orders/get-order-download-info
  @param string $secret
  @param string $orderId
  @return string
*/
async function getOrderDownloadInfo(hostURL, secret, orderId) {
  if (!secret || !orderId) {
    throw new Error("secret or orderId Missing.");
  }
  const url = `${hostURL}/connect/order/${orderId}/download`;
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
  Update order download time
  https://api-doc.nexway.store/nexway-connect/reference/manage-your-orders/update-download-time
  @param string $partnerOrderNumber
  @param string $value
  @return string
*/
async function updateDownloadTime(hostURL, partnerOrderNumber, value, secret) {
  if (!partnerOrderNumber || !value) {
    throw new Error("partnerOrderNumber or Expire date Missing.");
  }
  const url = `${hostURL}/connect/order/download`;
  const bearer = await getUserToken(true, true);
  const data = {
    partnerOrderNumber: partnerOrderNumber,
    value: value
  };
  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "put", data, headers);
}

/**
 * Cancel a order
 * https://api-doc.nexway.store/nexway-connect/reference/manage-your-orders/cancel-order
 * @param string $secret
 * @param string $partnerOrderNumber
 * @param int $reasonCode
 * @param string $comment
 *
 * @return string
 */
async function cancelOrder(hostURL, orderId, secret) {
  const url = `${hostURL}/connect/order/${orderId}`;
  const bearer = await getUserToken(true, true);

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    secret: secret
  };

  return getCurlResponse(url, "delete", null, headers);
}

module.exports = {
  createOrder,
  getOrderDownloadInfo,
  updateDownloadTime,
  cancelOrder
};

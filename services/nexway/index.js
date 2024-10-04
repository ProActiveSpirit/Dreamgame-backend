const {
  getOrderDownloadInfo,
  updateDownloadTime
} = require("./orderManagement");
const { getUserToken, invalidateToken } = require("./authentication");
const { getSubscriptionStatus } = require("./subscriptionManagement");
const { createOrder, cancelOrder } = require("./orderManagement");
const { getCategories } = require("./catalogManagement");
const { getCrossUpSell } = require("./crossSellManagement");

const hostURL = "https://api.nexway.store"; // or use the staging URL
const secret = process.env.CLIENT_SECRET;

(async () => {
  try {
    const order = await getOrder(hostURL, "ORDER_ID", secret);
    console.log("Order Details:", order);

    const downloadInfo = await getOrderDownloadInfo(
      hostURL,
      "ORDER_ID",
      secret
    );
    console.log("Download Info:", downloadInfo);

    const updateTimeResponse = await updateDownloadTime(
      hostURL,
      "PARTNER_ORDER_NUMBER",
      "VALUE",
      secret
    );
    console.log("Update Download Time:", updateTimeResponse);

    const productFeed = await getProductFeed(
      feedUrl,
      "PROVIDER",
      "CONFIG",
      secret
    );
    console.log("Product Feed:", productFeed);

    const subscriptionStatus = await getSubscriptionStatus(
      hostURL,
      "PARTNER_ORDER_NUMBER",
      "SUBSCRIPTION_ID",
      secret
    );
    console.log("Subscription Status:", subscriptionStatus);

    const renewResponse = await renewSubscription(
      hostURL,
      "PARTNER_ORDER_NUMBER",
      "SUBSCRIPTION_ID",
      secret
    );
    console.log("Renew Subscription:", renewResponse);

    const operatingSystems = await getOperatingSystems(hostURL, secret);
    console.log("Operating Systems:", operatingSystems);

    const orderInfo = await getOrderDownloadInfo(hostURL, secret, "ORDER_ID");
    console.log(orderInfo);

    const categories = await getCategories(hostURL, secret, "en");
    console.log(categories);

    const userToken = await getUserToken("client_id", "client_secret");
    console.log("User Token:", userToken);

    const orderDetails = {
      /* order details here */
    };
    const orderResponse = await createOrder(hostURL, orderDetails, secret);
    console.log("Order Created:", orderResponse);

    const crossSellData = await getCrossUpSell(hostURL, "PRODUCT_ID", secret);
    console.log("Cross-Sell Data:", crossSellData);

    const cancelResponse = await cancelOrder(hostURL, "ORDER_ID", secret);
    console.log("Order Cancelled:", cancelResponse);

    const cancelSubscriptionResponse = await cancelSubscription(
      hostURL,
      "PARTNER_ORDER_NUMBER",
      "SUBSCRIPTION_ID",
      secret
    );
    console.log("Cancel Subscription:", cancelResponse);

    await invalidateToken(userToken);
    console.log("Token invalidated");
  } catch (error) {
    console.error(error.message);
  }
})();

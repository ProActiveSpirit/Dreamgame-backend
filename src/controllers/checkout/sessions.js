const { Client, CheckoutAPI } = require("@adyen/api-library");

const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST",
});

// Create the request object(s)
const paymentRequest = {
  amount: {
    currency: "",
    value: 1000,
  },
  reference: "YOUR_ORDER_NUMBER",
  shopperReference: "YOUR_UNIQUE_SHOPPER_ID",
  paymentMethod: {
    type: "scheme",
    encryptedCardNumber: "adyenjs_0_1_18$k7s65M5V0KdPxTErhBIPoMPI8HlC..",
    encryptedExpiryMonth: "adyenjs_0_1_18$p2OZxW2XmwAA8C1Avxm3G9UB6e4..",
    encryptedExpiryYear: "adyenjs_0_1_18$CkCOLYZsdqpxGjrALWHj3QoGHqe+..",
    encryptedSecurityCode: "adyenjs_0_1_24$XUyMJyHebrra/TpSda9fha978+..",
    holderName: "S. Hopper",
  },
  authenticationData: {
    threeDSRequestData: {
      nativeThreeDS: "preferred",
    },
  },
  browserInfo: {
    userAgent: "",
    acceptHeader:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    language: "nl-NL",
    colorDepth: 24,
    screenHeight: 723,
    screenWidth: 1536,
    timeZoneOffset: 0,
    javaEnabled: true,
  },
  billingAddress: {
    street: "Infinite Loop",
    houseNumberOrName: "1",
    postalCode: "1011DJ",
    city: "Amsterdam",
    country: "NL",
  },
  shopperEmail: "s.hopper@example.com",
  shopperIP: "192.0.2.1",
  channel: "web",
  origin: "https://your-company.com",
  returnUrl: "",
  merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
};

// Send the request
const checkoutAPI = new CheckoutAPI(client);
const response = checkoutAPI.PaymentsApi.payments(paymentRequest, {
  idempotencyKey: "UUID",
});

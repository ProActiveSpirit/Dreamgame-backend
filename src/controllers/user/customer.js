const prisma = require("../../prisma");
const axios = require("axios");

async function getCustomer(req, res) {
  try {
    // Modify the query to exclude users with the role of "admin"
    const customer = await prisma.customer.findMany({});
    res.json({ customer });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Get ALL OF CUSTOMERS Failed" });
  }
}

async function createCustomer(req, res) {
  const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const response = await axios.get(
    `https://ipinfo.io/${userIp}?token=80a03cd4011e9c`
  );
  console.log("response", response.data.country);

  try {
    const existingUser = await prisma.customer.findMany({
      where: { email: req.body.email },
    });
    console.log("existingUser", existingUser);
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    await prisma.customer.create({
      data: {
        ...req.body,
        ip: userIp,
        region: response.data.country ?? "",
      },
    });

    // await sendVerificationEmail(email, verificationCode);

    res.json({
      message:
        "Registration successful, please check your email for the verification code.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "User registration failed" });
  }
}

async function updateCustomer(req, res) {
  try {
    const existingUser = await prisma.customer.findMany({
      where: { email: req.body.email },
    });
    console.log("existingUser", existingUser);
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    await prisma.customer.create({
      data: {
        ...req.body,
        ip: userIp,
        region: response.data.country ?? "",
      },
    });

    // await sendVerificationEmail(email, verificationCode);

    res.json({
      message:
        "Registration successful, please check your email for the verification code.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "User registration failed" });
  }
}

async function deleteCustomer(req, res) {
  try {
    const existingUser = await prisma.customer.findMany({
      where: { email: req.body.email },
    });
    console.log("existingUser", existingUser);
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    await prisma.customer.create({
      data: {
        ...req.body,
        ip: userIp,
        region: response.data.country ?? "",
      },
    });

    // await sendVerificationEmail(email, verificationCode);

    res.json({
      message:
        "Registration successful, please check your email for the verification code.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "User registration failed" });
  }
}

module.exports = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

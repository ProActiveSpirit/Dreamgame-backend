const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
      where: { name: req.body.name },
    });
    if (existingUser.length != 0) {
      return res
        .status(400)
        .json({ message: "This Display Name is already registered." });
    }

    await prisma.customer.create({
      data: {
        ...req.body,
        ip: userIp,
        region: response.data.country ?? "",
      },
    });

    res.json({
      message:
        "Registration successful",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Customer registration failed" });
  }
}

async function updateCustomer(req, res) {
  try {
    const existingUser = await prisma.customer.findMany({
      where: { id: req.body.id },
    });
    if (existingUser.length == 0) {
      return res
        .status(400)
        .json({ message: "This customer not found." });
    }

    await prisma.customer.update({
      where: { id: req.body.id },
      data: {
        ...req.body,
      },
    });

    res.json({
      message:
        "Customer updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Customer update failed" });
  }
}

async function deleteCustomer(req, res) {
  try {
    const existingUser = await prisma.customer.findMany({
      where: { id: req.body.id },
    });

    if (existingUser.length == 0) {
      return res.status(400).json({ message: "This customer not found." });
    }

    await prisma.customer.delete({
      where: { id: req.body.id },
    });

    res.json({
      message:
        "Customer deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Customer deletion failed" });
  }
}

module.exports = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function verifyUser(req, res) {
  const { id } = req.params;
  const { adminVerified } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) }, // Ensure `id` is parsed as an integer if it's stored as an integer in the database
      data: { role: adminVerified ? "user" : ""},
    });

    res.json({ message: "User verify successfully" });
  } catch (error) {
    if (error.code === 'P2025') { // P2025 is the code for "Record not found"
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

module.exports = { verifyUser };
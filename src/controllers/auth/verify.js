const prisma = require('../../prisma');

async function Verify(req, res) {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.adminVerified) {
      return res.status(400).json({ error: 'User is already verified' });
    }

    await prisma.user.update({
      where: { email },
      data: {
        adminVerified: true,
      },
    });

    res.json({ message: 'Verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { Verify };
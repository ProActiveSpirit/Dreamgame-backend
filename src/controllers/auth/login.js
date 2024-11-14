const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Make sure to define your JWT secret securely
const JWT_SECRET = process.env.JWT_SECRET || 'Dreamgame';

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.role) {
      return res.status(403).json({ message: 'You are not verified by Administrator.' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ accessToken: token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
}

module.exports = { login };
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.adminVerified) {
      return res.status(403).json({ error: 'You are not verified by SuperAdmin.' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ accessToken: token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}

module.exports = { login };
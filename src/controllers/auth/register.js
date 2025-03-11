const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const prisma = require('../../prisma');

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is ${code}`,
  };
  console.log("mailOptions" , mailOptions);
  await transporter.sendMail(mailOptions);
}

async function register(req, res) {
  const { email, password, firstName, lastName } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  try {
    // const deleteResult = await prisma.user.deleteMany({});

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    console.log("existingUser" , existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        firstName,  
        lastName,
        role:"user",
        verificationCode,
        verificationCodeExpires
      },
    });

    // await sendVerificationEmail(email, verificationCode);

    res.json({ message: 'Registration successful, please check your email for the verification code.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User registration failed' });
  }
}

module.exports = { register };
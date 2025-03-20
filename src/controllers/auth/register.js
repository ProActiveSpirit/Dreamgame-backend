const bcrypt = require("bcrypt");
const prisma = require("../../prisma");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(name, email, code) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Dreamgame <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: [`${name} <${email}>`],
      subject: "Email Verification",
      // text: `Your verification code is ${code}`,
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

  } catch (error) {
    console.log(error); //logs any error
  }
}

async function register(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ 
        error: "Registration failed", 
        details: "Password is required" 
      });
    }
    
    // Check if all required fields are provided
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ 
        error: "Registration failed", 
        details: "All fields (email, password, firstName, lastName) are required" 
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        firstName,
        lastName,
        role: "user",
        verificationCode,
        verificationCodeExpires,
        emailVerified: false, // Explicitly set to false
      },
    });

    try {
      await sendVerificationEmail(
        firstName + " " + lastName, // Added space between first and last name
        email, // Use the actual user's email instead of hardcoded one
        verificationCode
      );
    } catch (emailError) {
      // If email fails, delete the created user
      await prisma.user.delete({
        where: { id: user.id },
      });
      throw emailError;
    }

    res.json({
      message:
        "Registration successful, please check your email for the verification code.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Registration failed",
      details: error.details || error.message,
    });
  }
}

module.exports = { register };

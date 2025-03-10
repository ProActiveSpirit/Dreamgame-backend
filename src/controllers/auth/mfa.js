const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const prisma = require('../../prisma');

// Generate 2FA secret and QR code
exports.setup2FA = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Dreamgame:${user.email}` // Replace YourAppName with your application name
    });

    // Store secret temporarily
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        tempSecret: secret.base32
      }
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    res.status(200).json({
      success: true,
      data: {
        qrCode: qrCodeUrl,
        secret: secret.base32
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error setting up 2FA',
      error: error.message
    });
  }
};

// Verify and enable 2FA
exports.enable2FA = async (req, res) => {
  try {
    const email = req.body.email;
    const token = req.body.token;
    // Find user using Prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.tempSecret,
      encoding: 'base32',
      token: token
    });
    console.log("user.tempSecret" , user.tempSecret);
    console.log("token" , token);
    console.log("verified" , verified);
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    // Enable 2FA using Prisma
    const updatedUser = await prisma.user.update({
      where: {
        email:  email  
      },
      data: {
        twoFactorSecret: user.tempSecret,
        isTwoFactorEnabled: true,
        tempSecret: null // Clear temporary secret
      }
    });
  
    res.status(200).json({
      success: true,
      message: '2FA enabled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enabling 2FA',
      error: error.message
    });
  }
};

// Verify 2FA token during login
exports.verify2FA = async (req, res) => {
  try {
    const { token  , email} = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token
    });
    console.log("user.twoFactorSecret" , user.twoFactorSecret);
    console.log("token" , token);
    console.log("verified" , verified);
    if (!verified) {
      return res.status(401).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    res.status(200).json({
      success: true,
      message: '2FA verification successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying 2FA',
      error: error.message
    });
  }
};

exports.get2FAStatus = async (req, res) => {
  console.log("get2FAStatus" , req.body);
  const email = req.body.email;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  if (user.isTwoFactorEnabled) {
    return res.status(200).json({
      success: true,
      message: '2FA is enabled'
    });
  }
  else{
    return res.status(200).json({
      success: false,
      message: '2FA is disabled'
    });
  }
}

// Disable 2FA
exports.disable2FA = async (req, res) => {
  try {
    const { token , email } = req.body;
    console.log("token" , token);
    console.log("email" , email);
    // Find user using Prisma
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    console.log("user" , user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify token one last time before disabling
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token
    });
    console.log("verified"  ,verified);

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    // Disable 2FA using Prisma
    const updatedUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        isTwoFactorEnabled: false,
        twoFactorSecret: null,
        tempSecret: null
      }
    });

    res.status(200).json({
      success: true,
      message: '2FA disabled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error disabling 2FA',
      error: error.message
    });
  }
};

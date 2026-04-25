

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

function createToken(userId) {
  return jwt.sign(
    { id: userId },               
    process.env.JWT_SECRET,       
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

const registerUser = async (req, res) => {
  try {
    
    const { name, email, password, phone, village, crop, land } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide name, email and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '❌ Password must be at least 6 characters.',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '❌ This email is already registered. Please login instead.',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,  
      phone:   phone   || '',
      village: village || '',
      crop:    crop    || 'wheat',
      land:    land    || 0,
    });

    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      message: '✅ Registration successful! Welcome to KrishiRakshak.',
      token,
      user: {
        id:      newUser._id,
        name:    newUser.name,
        email:   newUser.email,
        phone:   newUser.phone,
        village: newUser.village,
        crop:    newUser.crop,
      },
    });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server error during registration.',
      error:   error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password.',
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password.',
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: `✅ Welcome back, ${user.name}!`,
      token,
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        phone:   user.phone,
        village: user.village,
        crop:    user.crop,
      },
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server error during login.',
      error:   error.message,
    });
  }
};

module.exports = { registerUser, loginUser };

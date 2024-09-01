const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, username, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorHandler(res, new Error('Email already in use'), 400);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      username,
      password,
    });

    // TODO: Send verification email here

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
    });    
  } catch (error) {
    errorHandler(res, error);
  }
};


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return errorHandler(res, new Error('Please provide email and password'), 400);
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(res, new Error('Invalid credentials'), 400);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorHandler(res, new Error('Invalid credentials'), 400);
    }

    // Check if user is verified
    // if (!user.isVerified) {
    //   return errorHandler(res, new Error('Email not verified'), 401);
    // }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user),
      },
      message: 'Logged in successfully',
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// @desc    Email Verification
// @route   GET /api/auth/verify/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return errorHandler(res, new Error('Invalid token'), 400);
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/user/profile
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/user/profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;

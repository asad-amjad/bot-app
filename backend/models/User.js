const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Only email should be unique
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    // Mobile number is not unique now
  },
  username: {
    type: String,
    required: true,
    // Username is not unique now
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  website: {
    type: String,
  },
  // isVerified: {
  //   type: Boolean,
  //   default: true, //TODO:
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

// Match user-entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

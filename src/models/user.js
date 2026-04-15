const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String,
    default: 'Present'
  },
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: null
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  // Authentication & Basic Info
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },

  // Profile Information
  photoURL: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },

  // Academic Information
  institution: {
    type: String,
    trim: true,
    default: null
  },
  major: {
    type: String,
    trim: true,
    default: null
  },

  // Bio & About
  about: {
    type: String,
    maxlength: 500,
    default: null
  },

  // Skills (Array of skill strings)
  skills: {
    type: [String],
    default: []
  },

  // Experience (Array of experience objects)
  experience: [experienceSchema],

  // Professional & Social
  location: {
    type: String,
    trim: true,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  linkedin: {
    type: String,
    default: null
  },
  github: {
    type: String,
    default: null
  },
  twitter: {
    type: String,
    default: null
  },

  // Interests
  interests: {
    type: [String],
    default: []
  },

  // Additional Metadata
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  profileCompletedAt: {
    type: Date,
    default: null
  }
}, 
{
  timestamps: true
});

// Existing methods remain the same
userSchema.methods.getJWT = async function () {
  const user = this;
  // Note: In production, "dev123" should be an environment variable
  const token = await jwt.sign({ _id: user._id }, "dev123", { expiresIn: "1d" });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
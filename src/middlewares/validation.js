const User = require("../models/user")
const validateSignUpData = async(req) => {
  const {firstName, email,password} = req.body;
  
  if (!firstName) {
    throw new Error("First name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User already exists");
  }
};

module.exports = { validateSignUpData };

const User = require("../models/user")
const validatSignUpData = async(req) => {
  
  const {firstName, lastName,emailId,password} = req.body;
  const user = await User.findOne({emailId});
  if(user) {
    throw new Error("User Already exists")
  }
  if(!firstName || !lastName) {
    throw new Error("Name is not valid")
  } else if (firstName.length < 4 || firstName.length>50) {
    throw new Error ("firstName should be 4 - 60 chars");
  }
}

module.exports = {validatSignUpData}
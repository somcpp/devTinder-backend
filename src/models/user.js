const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: {
    type: String,
    unique:true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Invalid mail ")
      }
    }
  },
  about: {
    type: String,
    default: 'hello default'
  },
  PhotoURL: {
    type : String
  },
  gender:{
    type: String,
    validate(value) {
      if(!["male","female"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    }
  },
  skills:{
    type: []
  },
  password: String},
  {
    timestamps:true,
  }
  
)

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({_id: user._id}, "dev123", {expiresIn : "1d"});
  return token
} 

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);;
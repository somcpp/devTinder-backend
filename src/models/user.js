const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: {
    type: String,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
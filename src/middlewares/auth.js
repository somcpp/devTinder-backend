const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async(req,res,next) => {
  //read the token from the req cookies
  try
  {
    const {token} = req.cookies
    if(!token) {
      throw new Error("Invalid token")
    }
  const decodedobj = await jwt.verify(token,"dev123")
  const {_id} = decodedobj;
  const user = await User.findById(_id);
  if(!user) {
    throw new Error("User not found");
  }
  req.user = user;
  next();
} catch(err) {
  res.status(400).send("error in getting user " + err.message)
}

}

module.exports = {
  userAuth
}
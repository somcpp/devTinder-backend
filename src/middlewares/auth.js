const userAuth = (req,res,next) => {
  console.log("user is getting authenticated");
  const token = "xyz";
  isUserauthorised = true;
  if(!isUserauthorised) {
    res.status(401).send("unauthorised")
  } else {
    next()
  }
}

module.exports = {
  userAuth
}
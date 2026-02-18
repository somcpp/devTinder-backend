const { validateEditFields } = require("../utils/validation");


const viewProfile = async(req,res) => {
  try {
    const {password, ...finalProfile} = req.user.toObject();
    res.send(finalProfile)
  }
  catch(err) {
    res.status(400).send("Error in getting user : " + err.message)  
  }
}

const editProfile = async(req,res) => {
  try {
    if(!validateEditFields(req)) {
      throw new Error("invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
    await loggedInUser.save();
    res.json({
      message: "profile updated successfully",
      data: loggedInUser
    })
  } catch(err) {
    res.status(400).send("error : " + err.message)
  }
}

module.exports = {
  viewProfile,
  editProfile
}
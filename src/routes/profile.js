const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditFields } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/view",userAuth, async(req,res) => {
  try {
    res.send(req.user)
  }
  catch(err) {
    res.status(400).send("Error in getting user : " + err.message)  
  }
})

profileRouter.post("/edit", userAuth, async(req,res) => {
  try {
    if(!validateEditFields(req)) {
      throw new Error("invalid edit request");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
    await loggedInUser.save();
    res.json({
      message: "profile updated successfully",
      data: loggedInUser
    })
  } catch(err) {
    res.status(400).send("error : " + err.message)
  }
})

module.exports = profileRouter
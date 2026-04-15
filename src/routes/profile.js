const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewProfile, editProfile,deleteProfile } = require("../controllers/profile.controller");


const profileRouter = express.Router();

profileRouter.get("/view",userAuth,viewProfile )

profileRouter.patch("/edit", userAuth,editProfile)

profileRouter.delete("/delete", userAuth, deleteProfile)

module.exports = profileRouter
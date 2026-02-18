const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewProfile, editProfile } = require("../controllers/profile.controller");


const profileRouter = express.Router();

profileRouter.get("/view",userAuth,viewProfile )

profileRouter.post("/edit", userAuth,editProfile)

module.exports = profileRouter
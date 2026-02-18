const express = require("express");
const { createUser,loginUser,logoutUser } = require("../controllers/auth.controller");



const authRouter = express.Router();

authRouter.post("/signup", createUser)

authRouter.post("/login", loginUser)

authRouter.post("/logout", logoutUser)

module.exports = authRouter
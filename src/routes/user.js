const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {pendingRequest, getExistingConnections, userFeed} = require("../controllers/user.controller")
/*
todo:
1.show all the requests recieved to loggedinuser at his end
2.Show all the current connnections of loggedinUser
*/

const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/requests/pending", userAuth, pendingRequest);

userRouter.get("/connections", userAuth, getExistingConnections);

module.exports = userRouter;

userRouter.get("/feed", userAuth, userFeed);

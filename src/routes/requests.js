const express = require('express')
const { userAuth } = require('../middlewares/auth');
const { sendRequest, reviewRequest,outgoingRequests } = require('../controllers/request.controller');


const requestRouter = express.Router();


requestRouter.post("/send/:status/:toUserId", userAuth,sendRequest )

requestRouter.post("/review/:status/:requestId", userAuth, reviewRequest ) 

requestRouter.get("/outgoing",userAuth,outgoingRequests);

module.exports = requestRouter
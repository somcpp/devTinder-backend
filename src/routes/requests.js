const express = require('express')
const { userAuth } = require('../middlewares/auth');
const { sendRequest, reviewRequest } = require('../controllers/request.controller');


const requestRouter = express.Router();


requestRouter.post("/send/:status/:toUserId", userAuth,sendRequest )

requestRouter.post("/review/:status/:requestId", userAuth, reviewRequest ) 

module.exports = requestRouter
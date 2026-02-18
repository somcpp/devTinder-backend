const { connectionRequestModel } = require('../models/connectionRequest');
const User = require('../models/user')

const sendRequest = async(req,res) => {
  try {
  const user = req.user;
  const fromUserId = user._id;
  const {status} = req.params;
  const {toUserId} = req.params;
  //does the UserId actually exists
  const toUser = await User.findById(toUserId);
  if(!toUser) {
    throw new Error("User not found");
  }
  //is status allowed?
  const isAllowed = ['ignored','intrested'];
  if(!isAllowed.includes(status)) {
    throw new Error("Invalid Status type");
  }
  
  //does the request already exist
  const existingConnectionRequest = await connectionRequestModel.findOne({
    $or: [
      {fromUserId, toUserId},
      {fromUserId: toUserId, toUserId: fromUserId}
    ]
  })
  if(existingConnectionRequest) {
    throw new Error("Already sent the connection request before")
  }

  const ConnectionRequest = new connectionRequestModel({
    fromUserId,
    toUserId,
    status
  })

  const data = await ConnectionRequest.save();
  res.status(200).send(data); 
  } catch (error) {
    res.status(400).send(error.message);
  }

}

const reviewRequest = async(req,res) => {
  try{
    const loggedInUser = req.user;
    const {status,requestId} = req.params;

    //validate status
    const allowedStatuses = ["accepted", "rejected"];
    if(!allowedStatuses.includes(status)) {
      throw new Error("Invalid Status");
    }
    //validating the request if the request even exists or not
    const connectionRequest = await connectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "intrested"
    })
    if(!connectionRequest) {
      throw new Error("request not found");
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.send({
      message : "request updated successfully",
      data
    });
  }catch(err){
    res.status(400).send(err.message)
  }
}

module.exports = {
  sendRequest,
  reviewRequest
}
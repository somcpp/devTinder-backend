const { connectionRequestModel } = require("../models/connectionRequest");
const user = require("../models/user");
const USER_SAFE_DATA = "firstName lastName about age gender skills";

const pendingRequest = async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequests = await connectionRequestModel
      .find({
        toUserId: loggedinUser._id,
        status: "intrested",
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .select('fromUserId')
    return res.status(201).json({
      connectionRequests,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

const getExistingConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId toUserId", USER_SAFE_DATA);

    //we need to return only the others id from this connection requests
    const data = await connectionRequests.map((row) => {
      if (loggedInUser._id.toString() == row.fromUserId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
}


const userFeed = async (req, res) => {
  /*
    user feed should have all the users which the user has not interacted with like accepted ignored intrested
    
  */
  try {
    const loggedInUserId = req.user._id;
    //implementing pagination
    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //i need to find all connections where loggedinuser is a part of
    const data = await connectionRequestModel
      .find({
        $or: [{ toUserId: loggedInUserId }, { fromUserId: loggedInUserId }],
      })
      .select("fromUserId toUserId");
    /*
      data consists of all the requests that should be hidden from the user feed
    */
    const hiddenUsers = new Set();
    data.forEach((k) => {
      hiddenUsers.add(k.fromUserId.toString());
      hiddenUsers.add(k.toUserId.toString());
    });
    const users = await user.find({
      _id: { $nin: Array.from(hiddenUsers) },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }

}

module.exports = {
  pendingRequest,
  getExistingConnections,
  userFeed
}
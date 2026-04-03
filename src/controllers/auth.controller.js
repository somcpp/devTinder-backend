const {validatSignUpData} = require('../middlewares/validation')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {MALE_AVATAR,FEMALE_AVATAR} = require('../utils/constants')
const createUser = async (req, res) => {
  try {
    const { password, PhotoURL, gender } = req.body;

    await validatSignUpData(req);

    // Fix photo logic
    let finalPhotoURL = PhotoURL;

    if (!PhotoURL || PhotoURL === "") {
      finalPhotoURL =
        gender === "male" ? MALE_AVATAR : FEMALE_AVATAR;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      PhotoURL: finalPhotoURL,
      password: passwordHash,
    });

    await user.save();  

    const token = await user.getJWT();
    res.cookie("token",token, {
      expires: new Date(Date.now() + 8 * 3600000)
    } )

    // ✅ RETURN CLEAN USER DATA
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        PhotoURL: user.PhotoURL,
      },
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
};

const loginUser = async(req,res) => {
  try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    
    if(!user){
      throw new Error("invalid credentials")
    }
    const isPasswordValid = await user.validatePassword(password);

    if(!isPasswordValid) {
      throw new Error("invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token",token, {
      expires: new Date(Date.now() + 8 * 3600000)
    });
    const userobj = user.toObject();
    delete userobj.password;
    
    res.send({
      message: "Login Successful",
      data: userobj
    })
  }catch(err) {
    res.send(err.message)
  }
}

const logoutUser = async(req,res) => {
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  .send("User Logged out successfully")
}

module.exports = {
  createUser,
  loginUser,
  logoutUser
}
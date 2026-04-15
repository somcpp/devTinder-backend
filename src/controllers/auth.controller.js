const {validateSignUpData} = require('../middlewares/validation')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {MALE_AVATAR,FEMALE_AVATAR} = require('../utils/constants')
const createUser = async (req, res) => {
  try {
    const { password, photoURL, gender } = req.body;

    await validateSignUpData(req);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Determine final photoURL - use default if not provided
    let finalPhotoURL = photoURL;
    if (!finalPhotoURL) {
      finalPhotoURL = gender === "male" ? MALE_AVATAR : FEMALE_AVATAR;
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      photoURL: finalPhotoURL,
      gender: gender || "other",
      institution: req.body.institution,
      major: req.body.major,
      about: req.body.about,
      skills: req.body.skills,
      location: req.body.location,
      phone: req.body.phone,
      linkedin: req.body.linkedin,
      github: req.body.github,
      twitter: req.body.twitter,
      interests: req.body.interests,
      experience: req.body.experience
    });

    await user.save();  

    const token = await user.getJWT();
    res.cookie("token",token, {
      expires: new Date(Date.now() + 8 * 3600000)
    } )
    const userobj = user.toObject();
    delete userobj.password
    // ✅ RETURN CLEAN USER DATA
    res.status(201).json({
      message: "User created successfully",
      data: {
        ...userobj
      },
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
};

const loginUser = async(req,res) => {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    
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
    res.status(401).send(err.message)
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
const express = require("express");
const connectDB =  require("./config/database")
const app = express();
const User = require ("./models/user")
const {validatSignUpData} = require("./middlewares/validation")
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json())
app.use(cookieParser())

app.post("/signup", async(req,res) => {
  try{
    const {firstName,lastName,emailId,password} = req.body;
    validatSignUpData(req);
    const passwordHash =await bcrypt.hash(password,10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    })
    await user.save()
    res.send("user created successfully")
  }catch(err){
    res.status(400).send(err.message)
  }
})

app.post("/login", async(req,res) => {
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
    res.send("Login Successsful")
  }catch(err) {
    res.send(err.message)
  }
})

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const ALLOWED_UPDATES = ["lastName", "about", "gender"];

  const isUpdateAllowed = Object.keys(data).every(
    key => ALLOWED_UPDATES.includes(key)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid update fields");
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,          // return updated document
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send({
      message: "Updated successfully",
      user
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
});


app.get("/profile",userAuth, async(req,res) => {
  try {
    res.send(req.user)
  }
  catch(err) {
    res.status(400).send("Error in getting user : " + err.message)  
  }
})

app.get("/users", async(req,res) => {

})


connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(3000,()=>{
    console.log("hello world");
});
  })
  .catch((err) => {
    console.error("database not connected")
  })




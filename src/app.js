const express = require("express");
const connectDB =  require("./config/database")
const app = express();
const User = require ("./models/user")
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests")
const userRouter = require('./routes/user')

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/request", requestRouter)
app.use("/user",userRouter);


// app.patch("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const data = req.body;

//   const ALLOWED_UPDATES = ["lastName", "about", "gender"];

//   const isUpdateAllowed = Object.keys(data).every(
//     key => ALLOWED_UPDATES.includes(key)
//   );

//   if (!isUpdateAllowed) {
//     return res.status(400).send("Invalid update fields");
//   }

//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       data,
//       {
//         new: true,          // return updated document
//         runValidators: true
//       }
//     );

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     res.send({
//       message: "Updated successfully",
//       user
//     });

//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

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




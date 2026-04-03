const express = require("express");
const connectDB =  require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests")
const userRouter = require('./routes/user')
const cors = require('cors')
require('dotenv').config()

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/request", requestRouter)
app.use("/user",userRouter);


app.use("/", (req,res) => {
  res.send("hello");
})

const port = process.env.PORT;

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(port,()=>{
    console.log("hello world");
});
  })
  .catch((err) => {
    console.error("database not connected")
  })




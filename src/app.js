const express = require("express");

const app = express();

app.use("/test",function(req,res) {
  res.send("hello from the server!!")
})

app.listen(3000,()=>{
  console.log("hello world");
});


const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://som:som@cluster0.pgxox.mongodb.net/devTinder"

const connectDB = async () => {
  await mongoose.connect(DB_URL);
};

module.exports = connectDB;

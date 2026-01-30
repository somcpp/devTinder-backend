const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://som:som@cluster0.pgxox.mongodb.net/devTinder"
const temp_url = "mongodb+srv://saurabhraj2509_db_user:R96HmKERB4Sw3hAV@saurabh.5n08gln.mongodb.net/saubhagya"
const connectDB = async () => {
  await mongoose.connect(DB_URL);
};

module.exports = connectDB;

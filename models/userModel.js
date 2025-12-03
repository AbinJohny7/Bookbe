const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  proPic: {
    type: String,
    default: "",
  },
  userType: {
    type: String,
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
});

//create model using schema
const userModel=mongoose.model('users',userSchema)
// default export in node js
module.exports = userModel
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    if (userName && password && email) {
      //registration logic
      //asyn-await for usermodel return promise
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res
          .status(409)
          .json({ message: "user with this emailID is already registered" });
      } else {
        //register logic
        let newUser = new userModel({ userName, email, password });
        await newUser.save();
        res.status(201).json({ message: "sucessfully Registered", newUser });
      }
    } else {
      res.status(400).json({ message: "Please fill the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //let email=req.body.email
    let { email } = req.body;
    let { password } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // login logic
      if (existingUser.password == password) {
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };
        let token = jwt.sign(payload, process.env.jwtSecretKey);
      //existingUser is used  for taking the value userType
        res.status(200).json({ message: "Login Sucessfully", token,existingUser });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res
        .status(400)
        .json({ message: "user with this email id doesnot exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured in the Server" });
  }
};
exports.googleLoginApi = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // login logic
      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecretKey);

      res.status(200).json({ message: "Login Sucessfully", token,existingUser });
    } else {
      //register logic
      let newUser = new userModel({
        userName,
        email,
        password: "googlePswd",
        proPic,
      });
      await newUser.save();
      // for sending register data to frontend
      let payload = {
        userName: newUser.userName,
        email: newUser.email,
        userType: newUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecretKey);

      res.status(201).json({ message: "Login Sucessfully", token });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong in server" });
  }
};

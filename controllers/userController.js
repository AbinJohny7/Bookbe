const userModel = require("../models/userModel");

exports.getUserDetails = async (req, res) => {
  try {
    let email = req.user;
    let userDetails = await userModel.findOne({ email: email });
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};
exports.updateprofile = async (req, res) => {
  try {
    //we will get the id of the documnet(uesr) from params
    let { id } = req.params;
    let { userName, password, bio } = req.body;
    let proPic = req.file.filename;
  
    let userDetails = await userModel.findByIdAndUpdate(
      { _id: id },
      { userName, password, bio, proPic },
        //new for upadate the new user name and password
      { new: true }
    );
    res
      .status(200)
      .json({ message: "user details updated successfully", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};
exports.getAllUsers=async (req,res) => {
  try {
    //ne from mongo db ne-not equal
    //gt,eq
    //.select('-password) for remove the password from the data
    let allUSers=await userModel.find({userType:{$ne:'admin'}}).select('-password')
    res.status(200).json(allUSers)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrrong in the server"})
  }
}
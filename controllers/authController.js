const userModel = require("../models/userModel");

exports.registerUser= async(req,res)=>{
    try {
        let userName=req.body.userName
        let password=req.body.password
        let email=req.body.email
        if(userName&&password&&email){
            //registration logic
            //asyn-await for usermodel return promise
            let existingUser=await userModel.findOne({email:email})
            if(existingUser){
                res.status(409).json({message:'user with this emailID is already registered'})
            }else{
                let newUser=new userModel({userName,email,password})
                newUser.save()
                    res.status(201).json({message:'sucessfully Registered',newUser})
            }

        }else{
            res.status(400).json({message:'Please fill the fields'})
        }

        
    } catch (error) {
        res.status(500).json({message:'Something went wrong in server'})
    }
}
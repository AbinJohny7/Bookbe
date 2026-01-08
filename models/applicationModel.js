const mongoose=require('mongoose')
const applicationSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
    jobRole:{
        type:String,
        required:true
    }
})

const applicationModel=mongoose.model('application',applicationSchema)
//model
module.exports=applicationModel
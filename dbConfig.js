// a file to configure databse and node.js
// import mongoose
const mongoose=require('mongoose')



// mongoose-connect-using connectionstring()
//added the project name in b/w /?
mongoose.connect(process.env.connectionString).then((res)=>{
    console.log('Connected tooo mongoDB')
}).catch((err)=>{
    console.log(err)
})

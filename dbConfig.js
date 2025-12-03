// a file to configure databse and node.js
// import mongoose
const mongoose=require('mongoose')



// mongoose-connect-using connectionstring()
mongoose.connect('mongodb+srv://abin:abin@cluster0.a4pj1pf.mongodb.net/?appName=Cluster0').then((res)=>{
    console.log('Connected tooo mongoDB')
}).catch((err)=>{
    console.log(err)
})

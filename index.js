require('dotenv').config()
//this configure the .env file to the application,the data inside the  .env file will be accessible throughout the application
//
require('./dbConfig')
const express = require("express");
const cors=require("cors")
const router=require('./routes')


const server=new express()
//middleware to allow resources sharing b/w different orgins 
server.use(cors())
// middle ware to parse json,provided by express
server.use(express.json())
server.use('/uploads',express.static('./uploads'))
server.use(router)


const port=3000
server.listen(port,()=>{
    console.log("Server is listening to",port)
})
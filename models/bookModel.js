const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
        author:{
            type:String,
            require:true
        },
        noOfPages:{
            type:Number,
            require:true
        },
        imgURL:{
            type:String,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        discountPrice:{
            type:Number,
            require:true
        },
        abstract:{
            type:String,
            require:true
        },
        publisher:{
            type:String,
            require:true
        },
        language:
        {
            type:String,
            require:true
        },
        ISBN:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        },
        uploadedImages:{
            type:Array,
            required:true
        },
        userMail:{
            type:String,
            required:true
        }
})

const bookModel = mongoose.model('books',bookSchema)

module.exports = bookModel
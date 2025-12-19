const express=require('express')
const authController=require('./controllers/authController')
const jwtMiddleware = require('./middlewares/jwtMiddleware')
const bookController=require('./controllers/bookController')
const multerConfig = require('./middlewares/multerMiddleware')

//creating router
const router=new express.Router()


router.post('/registerUser',authController.registerUser)
router.post('/loginUser',authController.loginUser)
router.post('/googleLogin',authController.googleLoginApi)
router.post('/addBook',jwtMiddleware,multerConfig.array('uploadedImages'),bookController.AddBookController)
router.get('/getAllBooks',jwtMiddleware,bookController.getAllBookController)
router.get('/limitedBooks',bookController.getLimitedBooks)
router.get('/getSingleBook/:id',jwtMiddleware,bookController.getSingleBook)
module.exports=router
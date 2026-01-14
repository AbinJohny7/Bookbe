const express=require('express')
const authController=require('./controllers/authController')
const jwtMiddleware = require('./middlewares/jwtMiddleware')
const bookController=require('./controllers/bookController')
const multerConfig = require('./middlewares/multerMiddleware')
const userController=require('./controllers/userController')
const jwtAdminMiddleware = require('./middlewares/jwtAdminMiddleware')
const jobController=require('./controllers/jobController')
const applicationController=require('./controllers/applicationController')
const resumeMulterConfig = require('./middlewares/resumeMulterMiddleware')
const purchaseController=require('./controllers/purchaseController')


//creating router
const router=new express.Router()


router.post('/registerUser',authController.registerUser)
router.post('/loginUser',authController.loginUser)
router.post('/googleLogin',authController.googleLoginApi)
router.post('/addBook',jwtMiddleware,multerConfig.array('uploadedImages'),bookController.AddBookController)
router.get('/getAllBooks',jwtMiddleware,bookController.getAllBookController)
router.get('/limitedBooks',bookController.getLimitedBooks)
router.get('/getSingleBook/:id',jwtMiddleware,bookController.getSingleBook)
router.get('/userDetails',jwtMiddleware,userController.getUserDetails)
//getAllusers
router.get('/getAllUsers',jwtAdminMiddleware,userController.getAllUsers)
router.patch('/:id/updateProfile',jwtMiddleware,multerConfig.single("proPic"),userController.updateprofile)
router.post('/addJob',jwtAdminMiddleware,jobController.addJob)
router.get('/getAllJobs',jobController.getJobs)
router.delete('/:id/deleteJob',jwtAdminMiddleware,jobController.deleteJobs)
router.post('/applyJob',resumeMulterConfig.single('resume'),applicationController.ApplyJob)
router.get('/getAllApplications',jwtAdminMiddleware,applicationController.getAllApplication)
router.post('/buyBook',jwtMiddleware,purchaseController.buyBook)
module.exports=router
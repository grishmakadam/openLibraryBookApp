const express=require('express')
const router=express.Router()
const userController=require("../controllers/userController")

router.post('/addUser',userController.signup)
router.post('/login',userController.login)

module.exports=router
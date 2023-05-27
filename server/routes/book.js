const express=require('express')
const router=express.Router()
const bookController=require('../controllers/bookController')

router.post('/addBook',bookController.post)


module.exports=router 
const express=require('express')
const router=express.Router()
const bookController=require('../controllers/bookController')
// router.get('/helloworld',async(req,res)=>{
//     return res.json("hello wolrd")
// })
router.post('/addBook',bookController.post)
router.get('/getBooks/:id',bookController.get)

module.exports=router 
const express=require('express')
const router=express.Router()
const bookController=require('../controllers/bookController')
// router.get('/helloworld',async(req,res)=>{
//     return res.json("hello wolrd")
// })
router.post('/addBook',bookController.post)
router.get('/getBooks/:id',bookController.get)
router.get('/getBookById/:id', bookController.get_book_by_id)
router.patch('/update_progress_status/:email',bookController.update_progress_status)
module.exports=router 
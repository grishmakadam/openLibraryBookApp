const Book = require('../models/Book')

module.exports={
    post:async(req,res)=>{
        
        try{
            const newBook=new Book({
                book_author:req.body.author_name,
                book_name:req.body.book_name,
                cover_id:req.body.cover_id,
                book_id:req.body.id
    
            })
            const book=await newBook.save()
            res.json(book)
        }catch(ex){
            res.status(500).json({message:"Something went wrong!!!"})
        }
       
    },
    
}
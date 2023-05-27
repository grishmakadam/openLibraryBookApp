require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bookRouter=require('./routes/book')
const app=express()
app.use(express.json());            

mongoose.connect(process.env.DATABASE_URL,{useNewUrlparser:true})
const db=mongoose.connection

db.once('open',()=>console.log('connected'))
app.use('/books',bookRouter)
app.listen(6000,()=>console.log("listening"))
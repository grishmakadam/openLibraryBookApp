import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios"
import {Card, Container, Grid, Typography} from '@mui/material'
import image from '../image.jpg'
import {Link} from 'react-router-dom'

const Books = ({title}) => {
    const URL = "http://openlibrary.org/search.json?q=";

    
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState([])
    useEffect(()=>{
        const getBookdata=async(term)=>{
          if(term==""){
            term="cora"
          }
          setLoading(true)
            const res=await axios.get(`${URL}${term}`)
            if(res.data.docs){
              const newBooks = res.data.docs.slice(0, 20).map((bookSingle) => {
                  const {key, author_name, cover_i, edition_count, first_publish_year, title} = bookSingle;

                  return {
                      id: key,
                      author: author_name,
                      cover_id: cover_i,
                      edition_count: edition_count,
                      first_publish_year: first_publish_year,
                      title: title
                  }
              });
              console.log(newBooks)
              setData(newBooks)
        }
      
      }
   getBookdata(title)
       
            
        setLoading(false)
    },[title])


  return (
  
    <Grid container spacing={4} justifyContent="center">
      
      {data.length>0 && data.map(book=>(
        <Grid item xs={12} lg={3} md={5}>
         
        
          <Link to={`book/${book.id.split('/')[2]}`}>
          <Card >
          <img src={book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : image} height="300px" width="250px" alt={book.title}/>
          <Typography>{book.title}</Typography>
            <Typography>{book.author}</Typography>
          </Card>
      
          </Link>
         
      
          
        </Grid>
))}

    </Grid>
  )
}

export default Books
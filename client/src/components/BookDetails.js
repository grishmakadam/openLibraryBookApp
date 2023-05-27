import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const BookDetails = () => {
const [data,setData]=useState()
  const {id}=useParams()

  const getData=async()=>{
    try{
      const res=await axios.get(`https://openlibrary.org/works/${id}.json`)
      console.log(res.data)

      setData(res.data.title)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
      getData()

  },[])
    
  return (
    <div>{data}</div>
  )
}

export default BookDetails
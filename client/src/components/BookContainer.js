import React from 'react'
import { Container,TextField } from '@mui/material'
import Books from './Books';
import { useState,useEffect } from 'react';

const BookContainer = () => {
    const [title,setTitle]=useState("")

    const changeTitle=(e)=>{
  setTitle(e.target.value)
    }
  return (
    <Container>
<TextField label="Search" value={title} onChange={changeTitle} sx={{m:8}}/>
    <Books title={title}/>
    </Container>
  )
}

export default BookContainer
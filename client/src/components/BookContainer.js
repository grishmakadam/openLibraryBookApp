import React from 'react'
import { Button, Container,TextField } from '@mui/material'
import Books from './Books';
import { useState,useEffect } from 'react';

const BookContainer = () => {
    const [title,setTitle]=useState("")
    const [call,setCall]=useState(false)
    const changeTitle=(e)=>{
  setTitle(e.target.value)
  setCall(false)
    }
  return (
    <Container>
<><TextField label="Search" value={title} onChange={changeTitle} sx={{m:8}}/>
<Button onClick={()=>setCall(true)}>Hello </Button>
</>
    {call && <Books title={title}/>}
    </Container>
  )
}

export default BookContainer
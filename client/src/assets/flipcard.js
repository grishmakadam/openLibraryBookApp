import * as React from 'react';
import  "./card.css"
import book from "./book.jpg"
import { Divider, Typography } from '@mui/material';

export default function FlipCard({thought}) {
  return (
    <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src={book} alt="Avatar" style={{width:"300px",height:"300px",borderRadius:'10px'}}/>
      </div>
      <div className="flip-card-back">
       <Typography variant='body' sx={{fontStyle:"italic",fontSize:"18px",padding:"10px",}}><q>{thought.quote}</q></Typography>
       <Divider/>
       <Typography variant='h7' alignSelf="flex-end" sx={{fontStyle:"italic",fontSize:"18px",padding:"10px",}}>~{thought.author}</Typography>
      </div>
    </div>
  </div>
  );
}

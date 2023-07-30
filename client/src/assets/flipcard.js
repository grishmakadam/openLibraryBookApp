import * as React from 'react';
import  "./card.css"
import book from "./book.jpg"
import { Divider, Typography } from '@mui/material';

export default function FlipCard({thought}) {
  return (
    <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src={book} alt="Avatar" style={{width:"300px",height:"300px"}}/>
      </div>
      <div className="flip-card-back">
       <Typography variant='body'>{thought.quote}</Typography>
       <Divider/>
       <Typography variant='h7'>{thought.author}</Typography>
      </div>
    </div>
  </div>
  );
}

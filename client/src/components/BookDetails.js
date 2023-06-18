import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Grid, Typography } from "@mui/material";
import {InputLabel} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select ,Rating} from "@mui/material";
import image from "../image.jpg";
const BookDetails = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const books = useSelector((state) => state.books);

  const getData = async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
      const book = books.filter((x) => x.id.slice(7, x.id.length) == id);
      console.log(book);
      setData({ ...book[0] });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();

    console.log(books);
  }, []);

  return (
    <Grid container height="100vh" pt={5}>
      <Grid
        item
        md={6}
        
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <img
          src={
            data.cover_id != undefined
              ? `https://covers.openlibrary.org/b/id/${data.cover_id}-L.jpg`
              : image
          }
          alt={data.title}
        />

        <FormControl sx={{width:"50%",marginTop:"10px"}}>
      
          <Select
              id="demo-simple-select"

            
            //value={age}
            defaultValue={10}
            sx={{   borderRadius:"40px",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f8363',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f8363',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f8363',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
           
            // onChange={handleChange}
          >
            <MenuItem value={10}>Want to Read</MenuItem>
            <MenuItem value={20}>Reading</MenuItem>
            <MenuItem value={30}>Read</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={6} 
       
        display="flex"
        flexDirection="column">
        <Typography variant="h3">{data.title}</Typography>
        <Typography variant="h5">{data.author}</Typography>
        <Grid item display="flex">
        <Rating name="read-only" value={data.ratings_average} precision={0.5} readOnly />
        <Typography>{data.ratings_average}</Typography>
        </Grid>
      

      </Grid>
    </Grid>
  );
};

export default BookDetails;

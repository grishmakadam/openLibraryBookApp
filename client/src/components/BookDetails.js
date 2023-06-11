import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { bookActions } from "../store/bookData";

const BookDetails = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const books = useSelector((state) => state);
const dispatch=useDispatch()
  console.log(books)
  const getData = async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    //getData();
    const books=bookActions.get_book()
    console.log(books)
   // const book=books.filter(x=>x.id.slice(7,x.id.length)==id)
  //  setData(book)
  }, []);

  return (
    <Grid container>
      <Grid item lg={6} md={6} xs={12}>
        {console.log(data)}
        Hello
      </Grid>
      <Grid item lg={6} md={6} xs={12}>
        Hii
      </Grid>
    </Grid>
  );
};

export default BookDetails;

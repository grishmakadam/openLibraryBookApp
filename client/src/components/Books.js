import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Grid, Typography } from "@mui/material";
import image from "../image.jpg";
import { Link } from "react-router-dom";
import { bookActions } from "../store/bookData";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions } from "../store/loaderSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../assets/Loader";

const Books = ({ title }) => {
  const URL = "http://openlibrary.org/search.json?q=";
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.load);

  const [data, setData] = useState([]);
  useEffect(() => {
    const getBookdata = async (term) => {
      console.log(loader);
      dispatch(loaderActions.set_loader());
      if (term == "") {
        term = "cora";
      }

      const res = await axios.get(`${URL}${term}`);

      if (res.data.docs) {
        const newBooks = res.data.docs.slice(0, 20).map((bookSingle) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
            ratings_average,
            want_to_read_count,
            currently_reading_count,
            already_read_count,
          } = bookSingle;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
            ratings_average: ratings_average,
            want_to_read: want_to_read_count,
            currently_reading: currently_reading_count,
            already_read: already_read_count,
          };
        });
        console.log(newBooks);
        setData(newBooks);

        dispatch(bookActions.add_data(newBooks));
        dispatch(loaderActions.remove_loader());
      }
    };

    getBookdata(title);
  }, [title]);

  return loader ? (
    <Loader/>
  ) : (
    <Grid container spacing={4} justifyContent="center">
      {data.length > 0 &&
        data.map((book) => (
          <Grid item xs={12} lg={3} md={5}>
            <Link to={`book/${book.id.split("/")[2]}`}>
              <Card>
                <img
                  src={
                    book.cover_id
                      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                      : image
                  }
                  height="300px"
                  width="250px"
                  alt={book.title}
                />
                <Typography>{book.title}</Typography>
                <Typography>{book.author}</Typography>
              </Card>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default Books;

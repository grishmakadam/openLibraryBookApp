import React from "react";
import {
  IconButton,
  Container,
  TextField,
  CircularProgress,
} from "@mui/material";
import Books from "./Books";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@mui/icons-material";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../store/bookData";
import App from "../App";
import BookDetails from "./BookDetails";
import Log_Sign from "./Log_Sign";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const BookContainer = () => {
  const book = useSelector((state) => state.book);
  const [title, setTitle] = useState(book.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleKey = (e) => {
    console.log(e.key);
    if (e.key === "Enter" || e._reactName == "onClick") {
      console.log(e);
      dispatch(bookActions.add_searchTerm(title));
      navigate(`/${title}`);
    }
  };
  return (
    <Container>
      <Navbar changeTitle={changeTitle} handleKey={handleKey} title={title} />
    </Container>
  );
};

export default BookContainer;

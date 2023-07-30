import React from "react";
import { IconButton, Container, TextField, CircularProgress, LinearProgress } from "@mui/material";
import Books from "./Books";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@mui/icons-material";
import Navbar from "./Navbar";

const BookContainer = () => {
  const [title, setTitle] = useState("");
  const [call, setCall] = useState(false);

  const changeTitle = (e) => {
    setTitle(e.target.value);
    setCall(false);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      setCall(true);
    }
  };
  return (
    <Container height="100vh">
      <Navbar setCall={setCall} changeTitle={changeTitle} handleKey={handleKey} title={title} call={call}/>
    
   
    </Container>
  );
};

export default BookContainer;

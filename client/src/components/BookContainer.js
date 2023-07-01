import React from "react";
import { IconButton, Container, TextField, CircularProgress } from "@mui/material";
import Books from "./Books";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@mui/icons-material";

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
    <Container>
      <TextField
        label="Search"
        value={title}
        onChange={changeTitle}
        sx={{
          my: 8,
          '& label.Mui-focused': {
            color: '#3f8363',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3f8363',
            },
            '&:hover fieldset': {
              borderColor: '#3f8363',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f8363',
            },
          },
        }}
        onKeyPress={handleKey}
        InputProps={{
          endAdornment: (
            <IconButton onClick={(e) => setCall(true)}>
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />

      {call && <Books title={title} />}
    </Container>
  );
};

export default BookContainer;

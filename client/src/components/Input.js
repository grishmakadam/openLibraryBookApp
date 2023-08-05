import {
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
  } from "@mui/material";
  import React from "react";
  
  const Input = (props) => {
    return (
      <>
        <InputLabel
          htmlFor={props.name}
          style={{
            marginBottom: "5px",
            fontSize: "14px",
            color: "#4C566A",
          }}
        >
          {props.label}
        </InputLabel>
        <TextField
          variant="outlined"
          style={{ height: "64px",width:"300px" }}
          fullWidth
          size="small"
          InputLabelProps={{shrink: false}}
          {...props}
          label={false}
        />
      </>
    );
  };
  
  export default Input;
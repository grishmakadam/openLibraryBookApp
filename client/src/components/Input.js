import {
  Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
  } from "@mui/material";
  import React from "react";
  
  const Input = (props) => {
    return (
      <Grid item>
        <InputLabel
          htmlFor={props.name}
          sx={{
            marginBottom: "5px",
            fontSize: "14px",
            color: "#4C566A",
          }}
        >
          {props.label}
        </InputLabel>
        <TextField
          variant="outlined"
          sx={{ height: "64px",width:{lg:"300px"} }}
          fullWidth
          size="small"
          InputLabelProps={{shrink: false}}
          {...props}
          label={false}
        />
      </Grid>
    );
  };
  
  export default Input;
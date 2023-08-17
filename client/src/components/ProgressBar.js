import { Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

const ProgressBar = ({ rate, value }) => {
  return (
    <Grid
      item
      display="flex"
      width="300px"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Typography variant="body1">
        {rate} {rate == 1 ? "star" : "stars"}
      </Typography>
      <LinearProgress
        color="primary"
        variant="determinate"
        value={value}
        sx={{
          width: "120px",
          height: "7px",
          "&.MuiLinearProgress-root": {
            borderRadius: "10px",
          },
        }}
      />
      <Typography>{value}</Typography>
    </Grid>
  );
};

export default ProgressBar;

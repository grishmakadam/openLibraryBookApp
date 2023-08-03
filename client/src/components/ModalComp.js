import {
  Box,
  Button,
  Grid,
  Modal,
  Rating,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
};
const ModelComp = ({ open, handleClose, data, setData }) => {
  const initialState = [
    { label: 0, value: 0 },
    { label: 100, value: 100 },
  ];
  const [marks, setMarks] = useState(initialState);
  const [value, setValue] = React.useState(0);

  const onChange = (e) => {
    setMarks((prev) => [
      ...initialState,
      { label: e.target.value, value: e.target.value },
    ]);
    setData((prev) => ({ ...prev, progress: e.target.value }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {data.status == 0 && (
          <Grid container flexDirection="column" p={2}>
            <Grid item>
              {" "}
              <Typography my={2}>Update Progress</Typography>
            </Grid>
            <Grid item>
              <Slider
                my={2}
                defaultValue={0}
                onChange={onChange}
                aria-label="Default"
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Grid>
            <Grid item alignSelf="flex-end">
              <Typography
                sx={{
                  fontSize: "12px",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Already Finished?
              </Typography>
            </Grid>
            <Button sx={{ marginTop: "10px" }}>Update Progress</Button>
          </Grid>
        )}
        {data.status == 1 && (
          <Grid container flexDirection="column" p={2}>
            <Grid item>
              <Typography my={2}>Rate the book</Typography>
            </Grid>
            <Grid item>
              <Rating
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
              />
            </Grid>

            <Button sx={{ marginTop: "10px" }}>Submit Rating</Button>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default ModelComp;

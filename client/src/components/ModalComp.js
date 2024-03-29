import {
  Box,
  Button,
  Grid,
  Modal,
  Rating,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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
const ModelComp = ({ open, handleClose, data, setData, handleSubmit }) => {
  const initialState = [
    { label: 0, value: 0 },
    { label: 100, value: 100 },
  ];
  const [marks, setMarks] = useState(0);
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = useState();

  const onChange = (e, newValue) => {
    // setMarks((prev) => [
    //   ...initialState,
    //   { label: newValue, value: newValue },
    // ]);
    setMarks(newValue);
  };

  useEffect(() => {
    setStatus(data.status);
    setMarks(data.progress);
  }, [data.status]);

  const onSubmit = () => {
    console.log(data,marks);
    if (data.status == 0 && marks == 100) {
      setStatus(1);
    } else if (data.status == 1) {
      setData((prev) => ({ ...prev, progress: 100, rating: value }));
    } else {
      setData((prev) => ({ ...prev, progress: marks }));
    }
    handleSubmit();
  };

  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {status == 0 && (
          <Grid container flexDirection="column" p={2}>
            <Grid item>
              {" "}
              <Typography my={2}>Update Progress</Typography>
            </Grid>
            <Grid item>
              <Slider
                my={2}
                onChange={onChange}
                aria-label="Default"
                valueLabelDisplay="on"
                marks={initialState}
                value={marks}
              />
            </Grid>
            <Grid item alignSelf="flex-end">
              <Typography
                sx={{
                  fontSize: "12px",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setStatus(1)}
              >
                Already Finished?
              </Typography>
            </Grid>
            <Button sx={{ marginTop: "10px" }} onClick={onSubmit}>
              Update Progress
            </Button>
          </Grid>
        )}
        {status == 1 && (
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
              
            <Button sx={{ marginTop: "10px" }} onClick={onSubmit}>
              Submit 
            </Button>
            
           
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default ModelComp;

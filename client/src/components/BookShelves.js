import React, { useEffect, useState } from "react";
import axios from "axios";
import { bookShelvesUrlApi, ratingsUrlApi } from "../apicalls/apiCalls";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import ProgressBar from "./ProgressBar";

const BookShelves = ({ setData }) => {
  const { id } = useParams();
  const [shelves, setShelves] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });
  useEffect(() => {
    const func = async () => {
      // const data=await bookShelvesUrlApi(id)
      console.log("ratings");
      const data = await ratingsUrlApi(id);
      console.log(data);
      setShelves({ ...data.counts });
      if (data.summary.average && data.summary.average != 0) {
        setData((prev) => ({ ...prev, ratings_average: data.summary.average }));
      }
    };
    func();
  }, []);
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h5">Community Reviews</Typography>
      </Grid>
      <Grid item container flexDirection="column">
        {Object.keys(shelves).map((x) => (
          <ProgressBar key={x} value={shelves[x]} rate={x} />
        ))}
      </Grid>
    </Grid>
  );
};

export default BookShelves;

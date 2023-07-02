import React, { useEffect, useState } from "react";
import axios from "axios";
import { bookShelvesUrlApi, ratingsUrlApi } from "../apicalls/apiCalls";
import { useParams } from "react-router-dom";
import { Grid, Rating, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";

const BookShelves = ({ setData }) => {
  const { id } = useParams();
  const [shelves, setShelves] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });
  useEffect(() => {
    const func = async () => {
      // const data=await bookShelvesUrlApi(id)
      console.log("ratings")
      const data = await ratingsUrlApi(id);
      console.log(data)
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
      <Grid item container flexDirection="column" >
        <Grid item display="flex" width="200px" justifyContent="space-between"  >
          <Typography variant="body1" >1 star</Typography>
          <Rating
            value={shelves["1"]}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
            
          />
        </Grid>

        <Grid item display="flex" width="200px" justifyContent="space-between">
          <Typography variant="body1">2 stars</Typography>
          <Rating
            value={shelves["2"]}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
          />
        </Grid>
        <Grid item display="flex" width="200px" justifyContent="space-between">
          <Typography variant="body1">3 stars</Typography>
          <Rating
            value={shelves["3"]}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
          />
        </Grid>
        <Grid item display="flex" width="200px" justifyContent="space-between">
          <Typography variant="body1">4 stars</Typography>
          <Rating
            value={shelves["4"]}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
          />
        </Grid>
        <Grid item display="flex" width="200px" justifyContent="space-between">
          <Typography variant="body1">5 stars</Typography>
          <Rating
            value={shelves["5"]}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookShelves;

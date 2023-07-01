import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Rating } from "@mui/material";
import image from "../image.jpg";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BookShelves from "./BookShelves";

const BookDetails = () => {
  const [data, setData] = useState({ ratings_average: 0,subjects:[] });
  const { id } = useParams();
  const books = useSelector(state=>state.book.books);

  const getData = async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
      const book = books.filter((x) => x.id.slice(7, x.id.length) == id);
      const desc = !res.data.description
        ? ""
        : res.data.description.value
        ? res.data.description.value
        : res.data.description;
const subjects=res.data.subjects?res.data.subjects:[]
      setData({
        ...book[0],
        description: desc,
        subjects: [...subjects],
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();

    console.log(books);
  }, []);

  return (
    <Grid container p={5} >
      <Grid
        item
        md={4}
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        container
        spacing={2}
      >
        <Grid item>
          <img
            src={
              data.cover_id != undefined
                ? `https://covers.openlibrary.org/b/id/${data.cover_id}-M.jpg`
                : image
            }
            alt={data.title}
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "50%", marginTop: "10px" }}>
            <Select
              id="demo-simple-select"
              
              IconComponent={(props) => (
                <Button
                  variant="contained"
                  {...props}
                  sx={{
                    height: "100%",
                    m: "-16px -7px 0 0",
                    background: "#3f8363",
                    borderEndStartRadius: 0,
                    borderStartStartRadius: 0,
                  }}
                  disableElevation
                  
                >
                  <KeyboardArrowDown
                    sx={{ fontSize: "30px", color: "white" }}
                  />
                </Button>
              )}
              //value={age}

              defaultValue={10}
              sx={{
                height: "45px",
                width: "250px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f8363",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f8363",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f8363",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}

              // onChange={handleChange}
            >
              <MenuItem value={10}>Want to Read</MenuItem>
              <MenuItem value={20}>Reading</MenuItem>
              <MenuItem value={30}>Read</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={8}
        display="flex"
        flexDirection="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h3">{data.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{data.author}</Typography>
        </Grid>
        <Grid item >
          <Stack direction="row" flexWrap="wrap" >
            {data.subjects.length!=0 && data.subjects.map((x) => (
              <Chip label={x} sx={{mt:1,mr:1}}/>
            ))}
          </Stack>
        </Grid>

        <Grid item display="flex">
          <Rating
            value={data.ratings_average}
            precision={0.5}
            max={5}
            name="read-only"
            readOnly
          />

          <Typography>{data.ratings_average}</Typography>
        </Grid>
        <Grid item>
          <Typography>{data.description!=""?data.description:<em>No description available</em>}</Typography>
        </Grid>
        <Grid item>
        <BookShelves setData={setData}/>
      </Grid>
      </Grid>
    
    </Grid>
  );
};

export default BookDetails;

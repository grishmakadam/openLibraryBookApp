import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  addBookApi,
  bookDetailsApi,
  bookExists,
  updateBookApi,
  verifyUser,
} from "../apicalls/apiCalls";
import { loaderActions } from "../store/loaderSlice";
import Loader from "../assets/Loader";
import ModelComp from "./ModalComp";
import { checkBookExists } from "../apicalls/url";

const BookDetails = () => {
  const [data, setData] = useState({
    ratings_average: 0,
    subjects: [],
    status: -1,
    progress: null,
    rating: null,
    present: false,
  });

  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    const res = await verifyUser();
    if (res.success) {
      if (data.status != -1) {
        setOpen(true);
      } else {
        addBook();
      }
    } else {
      navigate("/user/login");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const books = useSelector((state) => state.book.books);
  const loader = useSelector((state) => state.loader.load);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addBook = async () => {
    console.log(data);
    try {
      // if (data.present == false) {
      //   const temp = await addBookApi({ ...data });
      // } else {
      //   console.log("hii");
      //   const temp = await updateBookApi(id, data);
      // }
      const temp = await addBookApi({ ...data });
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    dispatch(loaderActions.set_loader());
    try {
      const data = await bookDetailsApi(id);
      const book = books.filter((x) => x.id.slice(7, x.id.length) == id);
      const desc = !data.description
        ? ""
        : data.description.value
        ? data.description.value
        : data.description;
      const subjects = data.subjects ? data.subjects : [];
      setData((prev) => ({
        ...prev,
        ...book[0],
        id: book[0].id.slice(7, book[0].id.length),
        description: desc,
        subjects: [...subjects],
      }));
      console.log("hello");

      const db_data = await bookExists(user.email, id);

      if (db_data.success) {
        console.log(db_data);
        setData((prev) => ({
          ...prev,
          status: db_data.book[0].status,
          rating: db_data.book[0].rating,
          progress: db_data.book[0].progress,
          present: true,
        }));
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(loaderActions.remove_loader());
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return loader ? (
    <Loader />
  ) : (
    <Grid container marginTop="60px">
      <Grid
        item
        md={4}
        alignItems="center"
        display="flex"
        flexDirection="column"
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
                    background: "primary",
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
              value={data.status}
              onChange={(e) => {
                setData((prev) => ({ ...prev, status: e.target.value }));
              }}
              defaultValue={-1}
              sx={{
                height: "45px",
                width: "250px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}

              // onChange={handleChange}
            >
              <MenuItem value={-1}>Want to Read</MenuItem>
              <MenuItem value={0}>Reading</MenuItem>
              <MenuItem value={1}>Read</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleOpen()}
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "primary",
              color: "primary",
              height: "40px",
              width: "250px",
              "&:hover": {
                backgroundColor: "#3f836322",
                borderColor: "primary",
              },
            }}
          >
            {data.status == 0 ? "Update Progress" : "Add book"}
          </Button>
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
        <Grid item>
          <Stack direction="row" flexWrap="wrap">
            {data.subjects.length != 0 &&
              data.subjects.map((x, i) => {
                if (i < 12) {
                  return <Chip label={x} sx={{ mt: 1, mr: 1 }} />;
                }
              })}
            {data.subjects.length > 12 && (
              <Chip
                label="See more"
                sx={{
                  mt: 1,
                  mr: 1,
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                }}
              />
            )}
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
          <Typography>
            {data.description != "" ? (
              data.description
            ) : (
              <em>No description available</em>
            )}
          </Typography>
        </Grid>
        <Grid item>
          <BookShelves setData={setData} />
        </Grid>
      </Grid>
      <ModelComp
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
        handleSubmit={addBook}
      />
    </Grid>
  );
};

export default BookDetails;

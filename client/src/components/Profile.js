import { Button, Grid, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import logo from "../assets/book.jpg";
import { CameraAlt } from "@mui/icons-material";
import UserDetails from "./UserDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateImageApi } from "../apicalls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

function convertTobase64(file) {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      res(fileReader.result);
    };
    fileReader.onerror = (e) => {
      rej(e);
    };
  });
}

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(user.image);
  const [isChange, setIsChange] = useState(false);
  const onCamClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    if (e.target.files.length != 0) {
      const file = await convertTobase64(e.target.files[0]);
      setImage((prev) => file);
      setIsChange(true);
    }
  };

  const savePhoto = async (e, clear = false) => {
    console.log(clear);
    if (clear) {
      setImage(user.image);
      setIsChange(false);
      return;
    }

    try {
      const res = await updateImageApi({ image: image });
      dispatch(userActions.set_user(res));
      setIsChange(false);
    } catch (ex) {}
  };

  return (
    <Grid
      container
      marginLeft={2}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems="center"
      sx={{
        py: 2,
        boxShadow: "1px 1px  4px #e2e2e2",
        borderRadius: "10px",
        boxSizing: "border-box",
      }}
    >
      <Grid item px={8}>
        <div className="img">
          {!image && (
            <AccountCircleIcon
              fontSize="large"
              style={{
                borderRadius: "50%",
                height: "100%",
                width: "100%",
                color: "#e0e0e0",
              }}
            />
          )}
          {image && (
            <img
              src={image}
              height="100%"
              width="100%"
              style={{ borderRadius: "50%" }}
            />
          )}
          <IconButton
            sx={{
              position: "relative",
              left: "95px",
              bottom: "50px",
              width: "2.2rem",
              height: "2.2rem",
              borderRadius: "50%",
              backgroundColor: "#e3e3e3",
              "&:hover": {
                backgroundColor: "#e3e3e3",
              },
            }}
            onClick={onCamClick}
          >
            <CameraAlt color="#000" />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={handleChange}
            />
          </IconButton>
        </div>
        {isChange && <p>*Click upload photo to save the photo</p>}
      </Grid>
      <Grid item sx={{ pr: 9 }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={savePhoto}>
          Upload Photo
        </Button>
        <Button variant="outlined" onClick={(e) => savePhoto(e, true)}>
          Clear Photo
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ px: 5, py: 2 }}>
        <UserDetails />
      </Grid>
    </Grid>
  );
};

export default Profile;

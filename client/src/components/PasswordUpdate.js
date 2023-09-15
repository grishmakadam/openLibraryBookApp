import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Input from "./Input";
import { changePasswordApi } from "../apicalls/apiCalls";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { set_snackbar } from "../store/snackbarSlice";
import { useDispatch } from "react-redux";
const PasswordUpdate = () => {
  const dispatch=useDispatch()
  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmPassword: true,
  });
  const [show, setShow] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const onChangeData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let m = 0;
    if (data.password == "") {
      m = 1;
      setValid((prev) => ({ ...prev, password: false }));
    }

    if (data.newPassword == "") {
      m = 1;
      setValid((prev) => ({ ...prev, newPassword: false }));
    }
    if (m == 1) {
      return;
    }
    setValid((prev) => ({ ...prev, newPassword: true, password: true }));
    if (data.newPassword != data.confirmPassword) {
      setValid((prev) => ({ ...prev, confirmPassword: false }));
      return;
    }
    setValid((prev) => ({ ...prev, confirmPassword: true }));
    try {
      const res = await changePasswordApi(data);
      console.log(res)
      if (res.success) {
        dispatch(set_snackbar({ severity: "success", message: res.message }));
      } else {
        console.log(res)
        dispatch(set_snackbar({ severity: "error", message: res.message }));
      }
    } catch (ex) {
      
      dispatch(set_snackbar({ severity: "error", message: ex.message }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        marginLeft={2}
        alignItems="center"
        sx={{
          py: 4,
          px: 6,
          boxShadow: "1px 1px  4px #e2e2e2",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <Grid
          item
          xs={12}
          mb={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography>Change Password</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Input
            name="password"
            label="Old Password"
            onChange={onChangeData}
            error={!valid.password}
            type={show.password ? "text" : "password"}
            helperText={!valid.password ? "Old Password is required" : " "}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    style={{ color: "primary" }}
                  >
                    {show.password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Input
            name="newPassword"
            label="New Password"
            onChange={onChangeData}
            error={!valid.newPassword}
            type={show.newPassword ? "text" : "password"}
            helperText={!valid.newPassword ? "New Password is required" : " "}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                    style={{ color: "primary" }}
                  >
                    {show.newPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Input
            name="confirmPassword"
            label="Confirm Password"
            onChange={onChangeData}
            error={!valid.confirmPassword}
            helperText={
              !valid.confirmPassword ? "Confirm password did not match" : " "
            }
            type={show.confirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                    style={{ color: "primary" }}
                  >
                    {show.confirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ width: "300px" }} variant="contained" type="submit">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PasswordUpdate;

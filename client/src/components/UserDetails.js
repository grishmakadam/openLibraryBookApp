import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailsApi } from "../apicalls/apiCalls";
import { userActions } from "../store/userSlice";

const UserDetails = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    username: user.username,
  });

  const onChangeData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDetailsApi(data);
      dispatch(userActions.set_user(res));
    } catch (ex) {}
  };

  useEffect(() => {}, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="space-between">
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            type="text"
            label="First Name"
            name="fname"
            value={data.fname}
            onChange={onChangeData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            type="text"
            label="Last Name"
            name="lname"
            value={data.lname}
            onChange={onChangeData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            type="text"
            label="Username"
            name="username"
            value={data.username}
            onChange={onChangeData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Input
            type="text"
            label="Email"
            name="email"
            value={data.email}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            Update Details
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserDetails;

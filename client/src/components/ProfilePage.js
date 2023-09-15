import React, { useState } from "react";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { AccountCircle, LockReset } from "@mui/icons-material";
import Profile from "./Profile";
import UserDetails from "./UserDetails";
import PasswordUpdate from "./PasswordUpdate";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container sx={{ mt: "2rem", p: 4, mx: 0 }}>
      {/* <Grid
        item
        container
        xs={12}
        md={4}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item className="tab-grid">
          <Typography>Account Settings</Typography>
          <Typography variant="body2">Edit personal information</Typography>
        </Grid>
        <Grid item className="tab-grid">
          <Typography>Password & Security</Typography>
          <Typography variant="body2">Change Password</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={8} >
        <Grid
          item
          container
          sx={{
            boxShadow: "1px 1px 1px 2px #d3e3db",
            borderRadius: "10px",
            p: "20px",
            backgroundColor: "#fff",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
              boxSizing: "border-box",
            marginBottom:"60px"
          }}
        >
          <Grid item xs={3}>
            <img src={logo} className="img" />
          </Grid>
          <Grid item xs={3}>
            <Typography>Upload new </Typography>
            <Typography>Profile-Pic.jpg</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="outlined">Update</Button>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid> */}
      <Grid item xs={12} py={2}>
        <Typography>Account Settings</Typography>
      </Grid>
      <Grid item xs={3}>
        <Grid
          container
          flexDirection="column"
          sx={{
            py: 2,
            boxShadow: "1px 1px  4px #e2e2e2",
            borderRadius: "10px",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Grid
            item
            p={2}
            pl={4}
            alignItems="center"
            display="flex"
            sx={{
              backgroundColor: !open ? "#CEE6DB" : "",
              borderRight: !open ? "3px solid #3f8363" : "",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          >
            <AccountCircle />
            <Typography sx={{ ml: 2 }}>Personal Details</Typography>
          </Grid>
          <Grid
            item
            p={2}
            pl={4}
            alignItems="center"
            display="flex"
            sx={{
              backgroundColor: open ? "#CEE6DB" : "",
              borderRight: open ? "3px solid #3f8363" : "",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          >
            <LockReset />
            <Typography sx={{ ml: 2 }}>Password</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ display: { xs: "flex",md:"none",lg:"none" } }}>
        <Tabs
          value={open}
          onChange={() => setOpen(false)}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
      
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        {!open && <Profile />}
        {open && <PasswordUpdate />}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;

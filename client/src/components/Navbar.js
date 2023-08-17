import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  AccountCircle,
  Logout,
  ManageAccounts,
  MenuBook,
  SearchOutlined,
} from "@mui/icons-material";
import { Button, Grid, LinearProgress, TextField } from "@mui/material";
import Books from "./Books";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import BookDetails from "./BookDetails";
import Log_Sign from "./Log_Sign";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../apicalls/apiCalls";
import { userActions } from "../store/userSlice";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar({ handleKey, changeTitle, title }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = async (text) => {
    const res = await logoutApi();
    dispatch(userActions.remove_user());
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: "white",
          boxShadow: "none",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
          {/* {user.name != "" && ( */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={user.name!=""?handleDrawerOpen:undefined}
              edge="start"
              sx={{
                marginRight: 5,
                // ...(open && { display: "none" }),
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor:"primary.main"
                }
              }}
            >
              {/* <MenuIcon /> */}
              <LocalLibraryIcon />
            </IconButton>
          {/* )} */}
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          <TextField
            placeholder="Search"
            value={title}
            size="small"
            fullWidth
            onChange={changeTitle}
            sx={{
             
              backgroundColor: "#fff",
              borderRadius: "10px",

              "& label.Mui-focused": {
                color: "#8d8d8d",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary",
                  border: "1px solid primary",
                },
                "&:hover fieldset": {
                  borderColor: "primary",
                },
                "&.Mui-focused fieldset": {
                  border: "2px solid #3f8363",

                  boxShadow: "0px 0px  2px #75bd9d",
                },
              },
            }}
            onKeyPress={handleKey}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleKey}>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
          {user.name == "" && (
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={()=>navigate("/user/signup")}>Sign up</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={()=>navigate("/user/login")}>Log in</Button>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
      {user.name != "" && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Profile", "My Books"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                    onClick={()=>navigate("/profile")}
                  >
                    
                    {index % 2 === 0 ? <ManageAccounts /> : <MenuBook />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[{ text: "Log Out", link: "/user/login" }].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => logout(text)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <Logout /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <Box component="main" sx={{  width:"100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

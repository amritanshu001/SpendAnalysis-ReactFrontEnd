import React, { useState } from "react";

import {
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import { themeModeAction } from "../../store/theme-slice";

import MenuOptions from "./UserMenu/MenuOptions";
import { NewNavLinks } from "./NavElements";

const NewNavbar = () => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const mode = useSelector((state) => state.themeMode.mode);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(themeModeAction.toggleMode());
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  console.log({ location: "Navbar", drawerStatus: drawerOpen });

  return (
    <>
      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={toggleDrawer(false)}
        variant="temporary"
      >
        <NewNavLinks onLinkClick={toggleDrawer(false)} />
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" enableColorOnDark>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Spend Analysis
            </Typography>
            <IconButton onClick={toggleTheme}>
              {mode === "light" ? (
                <DarkModeIcon sx={{ color: "white" }} />
              ) : (
                <LightModeTwoToneIcon />
              )}
            </IconButton>
            {isUserLoggedIn && <MenuOptions />}
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
    </>
  );
};

export default NewNavbar;

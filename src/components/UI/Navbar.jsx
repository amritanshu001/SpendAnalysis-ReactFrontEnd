import React, { useState } from "react";
import styles from "./Navbar.module.css";

import { AnimatePresence } from "framer-motion";
import NavElements from "./NavElements";

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

import Sidebar from "./Sidebar";
import MenuOptions from "./UserMenu/MenuOptions";
import { NewNavLinks } from "./NavElements";

const Navbar = (props) => {
  const [sideMenuState, setSideMenuState] = useState(false);
  const showSideMenu = () => {
    setSideMenuState(true);
  };
  const hideSideMenu = () => {
    setSideMenuState(false);
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.hamburger}>
          <IconButton aria-label="menu" color="inherit" onClick={showSideMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <div>
          <Typography variant="heading">Spend Analysis</Typography>
        </div>
        <NavElements className={styles.navbar} />
      </header>
      <AnimatePresence>
        {sideMenuState && (
          <Sidebar hideSideBar={hideSideMenu}>
            <NavElements
              className={styles.sidebar}
              hideSideBar={hideSideMenu}
            />
          </Sidebar>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

const NewNavbar = () => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const mode = useSelector((state) => state.themeMode.mode);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(themeModeAction.toggleMode());
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  return (
    <>
      <Drawer
        open={drawerOpen}
        // open
        anchor="left"
        onClose={toggleDrawer(false)}
      >
        <NewNavLinks />
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

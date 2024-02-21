import React, { useState } from "react";
import styles from "./Navbar.module.css";

import { AnimatePresence } from "framer-motion";
import NavElements from "./NavElements";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Sidebar from "./Sidebar";

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

export default Navbar;

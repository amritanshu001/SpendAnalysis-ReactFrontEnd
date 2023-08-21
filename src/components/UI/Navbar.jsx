import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";

import { logUserOutActions } from "../../store/auth-slice";

import { useHistory } from "react-router-dom";
import apiURL from "../../endpoint";
import useHttp from "../../hooks/useHTTP";
import NavElements from "./NavElements";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const redirect = useHistory();
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const userToken = useSelector((state) => state.userAuth.authToken);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);

  const [sideMenuState, setSideMenuState] = useState(false);
  const showSideMenu = () => {
    setSideMenuState(true);
  };
  const hideSideMenu = () => {
    setSideMenuState(false);
  };

  const processLogout = useCallback((rawdata) => {
    dispatch(logUserOutActions());
    redirect.replace("/login");
  }, []);

  const {
    isloading: logoutLoading,
    error: logoutError,
    sendRequest: logoutUser,
    resetError: resetLogoutError,
  } = useHttp(processLogout);

  const logoutHandler = () => {
    const logoutConfig = {
      url: apiURL + "/userlogout",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    };
    logoutUser(logoutConfig);
  };

  useEffect(() => {
    if (logoutError) {
      resetLogoutError();
      dispatch(logUserOutActions());
      redirect.replace("/login");
    }
  }, [logoutError]);

  let buttonText = "Logout";
  if (logoutLoading) {
    buttonText = "Logging Out";
  }
  if (!logoutLoading && !logoutError) {
    buttonText = "Logout";
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.hamburger}>
          <IconButton aria-label="menu" color="success" onClick={showSideMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <div>Spend Analysis</div>
        <NavElements
          className={styles.navbar}
          isUserLoggedIn={isUserLoggedIn}
          isUserAdmin={isUserAdmin}
          logoutHandler={logoutHandler}
          buttonText={buttonText}
        />
      </header>
      {sideMenuState && (
        <Sidebar hideSideBar={hideSideMenu}>
          <NavElements
            className={styles.sidebar}
            isUserLoggedIn={isUserLoggedIn}
            isUserAdmin={isUserAdmin}
            logoutHandler={logoutHandler}
            buttonText={buttonText}
            hideSideBar={hideSideMenu}
          />
        </Sidebar>
      )}
    </React.Fragment>
  );
};

export default Navbar;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";

import { logUserOutActions } from "../../store/auth-slice";
import { showAndHideMessages } from "../../store/message-slice";

import { useNavigate } from "react-router-dom";
import apiURL from "../../endpoint";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../lib/endpoint-configs";
import { AnimatePresence } from "framer-motion";
import NavElements from "./NavElements";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
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

  const { mutate: logoutUser, isPending: logoutLoading } = useMutation({
    mutationFn: sendMutationRequest,
    onMutate: () => {
      dispatch(logUserOutActions());
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText: "You have been successfully logged out!",
        })
      );
      redirect("/login", { replace: true });
      console.log("Logged Out successfully");
    },
  });

  const logoutHandler = () => {
    const logoutConfig = {
      url: apiURL + "/userlogout",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    };
    logoutUser({ requestConfig: logoutConfig });
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.hamburger}>
          <IconButton aria-label="menu" color="inherit" onClick={showSideMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <div>Spend Analysis</div>
        <NavElements
          className={styles.navbar}
          isUserLoggedIn={isUserLoggedIn}
          isUserAdmin={isUserAdmin}
          logoutHandler={logoutHandler}
          buttonText={logoutLoading ? "Logging Out..." : "Logout"}
        />
      </header>
      <AnimatePresence>
        {sideMenuState && (
          <Sidebar hideSideBar={hideSideMenu}>
            <NavElements
              className={styles.sidebar}
              isUserLoggedIn={isUserLoggedIn}
              isUserAdmin={isUserAdmin}
              logoutHandler={logoutHandler}
              buttonText={logoutLoading ? "Logging Out..." : "Logout"}
              hideSideBar={hideSideMenu}
            />
          </Sidebar>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Navbar;

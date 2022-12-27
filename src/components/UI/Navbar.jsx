import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { authActions } from "../../store/auth-slice";
import { accountsAction } from "../../store/useraccount-slice";
import { useHistory } from "react-router-dom";
import apiURL from "../../endpoint";
import useHttp from "../../hooks/useHTTP";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const redirect = useHistory();
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const userToken = useSelector((state) => state.userAuth.authToken);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);

  const processLogout = useCallback((rawdata) => {
    dispatch(accountsAction.resetUserAccounts());
    dispatch(authActions.logUserOut());
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
      dispatch(authActions.logUserOut());
      resetLogoutError();
      redirect.replace("/login");
    }
  }, [logoutError]);

  const showAddBankRoute = isUserLoggedIn && isUserAdmin;
  let buttonText = "Logout";
  if (logoutLoading) {
    buttonText = "Logging Out";
  }
  if (!logoutLoading && !logoutError) {
    buttonText = "Logout";
  }

  return (
    <header className={styles.header}>
      <div>Spend Analysis</div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isUserLoggedIn && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/spendanalysis">Spend Analysis</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/manageaccount">Manage Accounts</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/uploadstatement">Upload Statement</NavLink>
            </li>
          )}
          {showAddBankRoute && (
            <li>
              <NavLink to="/addbank">Add Bank Details</NavLink>
            </li>
          )}
        </ul>
        {isUserLoggedIn && (
          <Button className={styles.logout} onClick={logoutHandler}>
            {buttonText}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

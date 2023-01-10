import React from "react";
import styles from "./NavElements.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";

const NavElements = (props) => {
  const logout = () => {
    props.logoutHandler();
    if ("hideSideBar" in props) {
      props.hideSideBar();
    }
  };
  return (
    <nav className={props.className}>
      <ul>
        <li>
          <NavLink to="/" onClick={props.hideSideBar}>
            Home
          </NavLink>
        </li>
        {!props.isUserLoggedIn && (
          <li>
            <NavLink to="/login" onClick={props.hideSideBar}>
              Login
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink to="/spendanalysis" onClick={props.hideSideBar}>
              Spend Analysis
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink to="/manageaccount" onClick={props.hideSideBar}>
              Manage Accounts
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink to="/uploadstatement" onClick={props.hideSideBar}>
              Upload Statement
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && props.isUserAdmin && (
          <li>
            <NavLink to="/addbank" onClick={props.hideSideBar}>
              Add Bank Details
            </NavLink>
          </li>
        )}
      </ul>
      {props.isUserLoggedIn && (
        <Button className={styles.logout} onClick={logout}>
          {props.buttonText}
        </Button>
      )}
    </nav>
  );
};

export default NavElements;

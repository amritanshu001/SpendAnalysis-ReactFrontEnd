import React from "react";
import styles from "./NavElements.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";

const activeLink = ({ isActive }) =>
  isActive ? styles["link-active"] : undefined;

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
          <NavLink to="/" onClick={props.hideSideBar} className={activeLink}>
            Home
          </NavLink>
        </li>
        {!props.isUserLoggedIn && (
          <li>
            <NavLink
              to="/login"
              onClick={props.hideSideBar}
              className={activeLink}
            >
              Login
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink
              to="/spendanalysis"
              onClick={props.hideSideBar}
              className={activeLink}
            >
              Spend Analysis
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink
              to="/manageaccount"
              onClick={props.hideSideBar}
              className={activeLink}
            >
              Manage Accounts
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && (
          <li>
            <NavLink
              to="/uploadstatement"
              onClick={props.hideSideBar}
              className={activeLink}
            >
              Upload Statement
            </NavLink>
          </li>
        )}
        {props.isUserLoggedIn && props.isUserAdmin && (
          <li>
            <NavLink
              to="/addbank"
              onClick={props.hideSideBar}
              className={activeLink}
            >
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

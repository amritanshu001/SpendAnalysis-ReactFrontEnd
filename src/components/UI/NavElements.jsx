import React from "react";
import styles from "./NavElements.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { AnimatePresence } from "framer-motion";

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
              to="/admin/addbank"
              onClick={props.hideSideBar}
              className={activeLink}
            >
              Admin Page
            </NavLink>
          </li>
        )}
      </ul>
      <AnimatePresence>
        {props.isUserLoggedIn && (
          <Button
            className={styles.logout}
            onClick={logout}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            {props.buttonText}
          </Button>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavElements;

import React from "react";
import styles from "./NavElements.module.css";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MenuOptions from "./UserMenu/MenuOptions";

import { useSelector } from "react-redux";

const activeLink = ({ isActive }) =>
  isActive ? styles["link-active"] : undefined;

const NavElements = (props) => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);

  return (
    <nav className={props.className}>
      <ul>
        <li>
          <NavLink to="/" onClick={props.hideSideBar} className={activeLink}>
            Home
          </NavLink>
        </li>
        {!isUserLoggedIn && (
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
        {isUserLoggedIn && (
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
        {isUserLoggedIn && (
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
        {isUserLoggedIn && (
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
        {isUserLoggedIn && isUserAdmin && (
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
        {isUserLoggedIn && (
          <MenuOptions key="menu" hideSideBar={props.hideSideBar} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavElements;

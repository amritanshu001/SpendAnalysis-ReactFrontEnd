import React from "react";
import styles from "./NavElements.module.css";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MenuOptions from "./UserMenu/MenuOptions";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UploadIcon from "@mui/icons-material/Upload";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useSelector } from "react-redux";
import router from "../../lib/metadata";

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

const ListItemContent = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={NavLink} to={props.route}>
        <ListItemIcon>
          <props.icon color="warning" />
        </ListItemIcon>
        <ListItemText
          primary={props.title}
          sx={{ color: (theme) => theme.palette.secondary.dark }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export const NewNavLinks = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);

  const validRoutes = router.filter((route) => {
    if (route.access === "all") {
      return true;
    }
    if (route.access === "logout") {
      return !isUserLoggedIn;
    }
    if (route.access === "user") {
      return isUserLoggedIn;
    }
    if (route.access === "admin") {
      return isUserAdmin;
    }
    return false;
  });

  return (
    <Box
      sx={{
        width: 250,
      }}
    >
      <List>
        {validRoutes.map((route) => (
          <ListItemContent
            key={route.id}
            route={route.path}
            title={route.pathName}
            icon={route.icon}
          />
        ))}
      </List>
    </Box>
  );
};

export default NavElements;

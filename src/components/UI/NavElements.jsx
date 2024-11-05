import React from "react";

import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import router from "../../lib/metadata";

const ListItemContent = (props) => {
  console.log({
    location: "ListItemContent",
    onLinkClickProp: props.onLinkClick,
  });
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={props.route}
        onClick={props.onLinkClick}
      >
        <ListItemIcon>
          <props.icon color="warning" />
        </ListItemIcon>
        <ListItemText
          primary={props.title}
          sx={{
            color: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export const NewNavLinks = (props) => {
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
            onLinkClick={props.onLinkClick}
          />
        ))}
      </List>
    </Box>
  );
};

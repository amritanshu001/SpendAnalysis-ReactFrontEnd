import { useState } from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const AnimatedBox = motion(Box);

const adminRoutes = [
  {
    name: "Maintain Banks",
    route: "/admin/addbank",
    icon: <AccountBalanceIcon />,
  },
  {
    name: "Maintain Accounts",
    route: "/admin/accounts",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Maintain Dates",
    route: "/admin/dateformat",
    icon: <CalendarMonthIcon />,
  },
  {
    name: "Maintain Users",
    route: "/admin/users",
    icon: <PeopleIcon />,
  },
];

export default function NavTabs() {
  const [navState, setNavState] = useState("/admin/addbank");

  const handleChange = (event, newValue) => {
    setNavState(newValue);
  };

  return (
    <AnimatedBox
      sx={{ width: "100%" }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Tabs
        value={navState}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {adminRoutes.map((route) => {
          return (
            <Tab
              key={route.route}
              value={route.route}
              to={route.route}
              label={route.name}
              icon={route.icon}
              component={NavLink}
            />
          );
        })}
      </Tabs>
    </AnimatedBox>
  );
}

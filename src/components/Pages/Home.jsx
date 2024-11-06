import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";
import homeContent from "../../lib/metadata";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AnimatedBox = motion(Box);

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Box,
  ListItemIcon,
} from "@mui/material";

import { useLocation } from "react-router-dom";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

const Home = (props) => {
  const location = useLocation();

  const mapSubTasks = (subtask) => {
    return (
      <li key={subtask.id}>
        <span className={styles["bold-span"]}>{subtask.title}</span>
        <span className={styles["normal-span"]}>{subtask.description}</span>
      </li>
    );
  };

  const mapHomeContent = (content) => {
    return (
      <div className={styles.row} key={content.id}>
        <span className={styles["bold-span"]}>{content.title}</span>
        <span className={styles["normal-span"]}>{content.description}</span>
        {"subtasks" in content && (
          <ul className={styles.subtasks}>
            {content.subtasks.map(mapSubTasks)}
          </ul>
        )}
      </div>
    );
  };

  // throw new Error(" a new error");

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Introduction</Header>
      <Container
        className={styles.container}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            marginLeft: "2rem",
            marginBottom: "2rem",
          }}
        >
          This application is developed to create spend analysis of the bank
          statements uploaded by the users :
        </Typography>
        {homeContent
          .filter((content) => content.path !== "/")
          .map(mapHomeContent)}
      </Container>
    </React.Fragment>
  );
};

const NewHome = () => {
  const location = useLocation();

  const mapSubTasks = (subtask) => {
    return (
      <ListItem disablePadding disableGutters divider key={subtask.id}>
        <ListItemButton component={NavLink} to={`\admin${subtask.path}`}>
          <ListItemText
            inset
            primary={subtask.title}
            secondary={subtask.description}
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.light,
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const mapHomeContent = (content) => {
    return (
      <ListItem disablePadding disableGutters divider key={content.id}>
        <ListItemIcon>{<content.icon color="warning" />}</ListItemIcon>
        <ListItemButton component={NavLink} to={content.path}>
          <ListItemText
            primary={content.title}
            secondary={content.description}
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
              },
            }}
          />
        </ListItemButton>
        {"subtasks" in content && (
          <List key="list2">{content.subtasks.map(mapSubTasks)}</List>
        )}
      </ListItem>
    );
  };

  const subheader = (
    <ListSubheader
      sx={{
        background: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        lineHeight: "24px",
        padding: "0",
      }}
    >
      This application is developed to generate spend analysis of the bank
      statements uploaded by the users :
    </ListSubheader>
  );

  // throw new Error(" a new error");

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Introduction</Header>
      <AnimatedBox
        sx={{
          maxWidth: "80rem",
          margin: "auto",
          width: "90%",
          borderRadius: "8px",
          padding: "1rem",
          "& .MuiListItemText-secondary": {
            fontSize: "0.9rem",
          },
          // "& .MuiButtonBase-root": {
          //   py: 0,
          // },
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <List key="list1" subheader={subheader}>
          {homeContent
            .filter((content) => content.path !== "/")
            .map(mapHomeContent)}
        </List>
      </AnimatedBox>
    </React.Fragment>
  );
};

export default NewHome;

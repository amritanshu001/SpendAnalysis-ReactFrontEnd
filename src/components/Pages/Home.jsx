import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";
import homeContent from "../../lib/metadata";

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
        <div className={styles.intro}>
          This application is developed to create spend analysis of the bank
          statements uploaded by the users :
        </div>
        {homeContent.map(mapHomeContent)}
      </Container>
    </React.Fragment>
  );
};

export default Home;

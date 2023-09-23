import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";
import homeContent from "../../lib/metadata";

import { useLocation } from "react-router-dom";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

const Home = (props) => {
  const location = useLocation();

  const mapHomeContent = (content) => {
    return (
      <div className={styles.row} key={content.id}>
        <span className={styles["bold-span"]}>{content.title}</span>
        <span className={styles["normal-span"]}>{content.description}</span>
      </div>
    );
  };

  // throw new Error(" a new error");

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Introduction</Header>
      <Container className={styles.container}>
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

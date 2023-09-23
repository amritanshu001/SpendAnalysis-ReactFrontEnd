import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";
import homeContent, { higherMetaData } from "../../lib/metadata";
import SearchOptimizer from "../Metadata/SearchOptimizer";
import { useLocation } from "react-router-dom";
import { higherMetaData as metadata } from "../../lib/metadata";

const Home = (props) => {
  const location = useLocation();
  console.log("current path", location.pathname);
  console.log(higherMetaData);

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
      <SearchOptimizer
        metadata={metadata.find((page) => page.path === location.pathname)}
      />
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

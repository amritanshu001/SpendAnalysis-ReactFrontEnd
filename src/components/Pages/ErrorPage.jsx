import React from "react";
import styles from "./ErrorPage.module.css";

import Navbar from "../UI/Navbar";
import Header from "../UI/Header";
import Button from "../UI/Button";
import SearchOptimizer from "../Metadata/SearchOptimizer";

export const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <React.Fragment>
      <SearchOptimizer
        meatadata={{
          title: "Error! - " + error.message,
          description: error.message,
          name: "Amritanshu",
          type: "summary",
        }}
      />
      <Navbar />
      <Header>{"An Error Occured"}</Header>
      <div className={styles["error-body"]}>{error.message}</div>
      <Button onClick={resetErrorBoundary}>Reset Error</Button>
    </React.Fragment>
  );
};

export default ErrorPage;

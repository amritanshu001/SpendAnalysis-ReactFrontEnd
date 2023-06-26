import React from "react";
import styles from "./ErrorPage.module.css";

import Navbar from "../UI/Navbar";
import Header from "../UI/Header";
import Button from "../UI/Button";

export const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Header>{"An Error Occured"}</Header>
      <div className={styles["error-body"]}>{error.message}</div>
      <Button onClick={resetErrorBoundary}>Reset Error</Button>
    </React.Fragment>
  );
};

export default ErrorPage;

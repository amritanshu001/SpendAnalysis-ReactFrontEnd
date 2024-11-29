import React from "react";

import Navbar from "../UI/Navbar";
import Header from "../UI/Header";
import Button from "../UI/Button";
import SearchOptimizer from "../Metadata/SearchOptimizer";
import { Typography } from "@mui/material";

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
      <Typography
        component="div"
        sx={{
          width: "90%",
          fontFamily: "inherit",
          margin: "auto",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "brown",
        }}
      >
        {error.message}
      </Typography>
      <Button onClick={resetErrorBoundary} color="error">
        Reset Error
      </Button>
    </React.Fragment>
  );
};

export default ErrorPage;

import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

const AddBank = (props) => {
  const [responseData, setResponseData] = useState(null);

  const processDateFormats = useCallback((rawdata) => {
    const processedResponse = [];
    for (let key in rawdata) {
      processedResponse.push({ value: key, label: rawdata[key].dateformat });
    }
    setResponseData(processedResponse);
  }, []);

  const dataMapper = (format) => {
    return <li key={format.value}>{format.label}</li>;
  };

  const {
    sendRequest: getDateFormats,
    isloading,
    error,
    resetError,
  } = useHttp(processDateFormats);

  useEffect(() => {
    const dateFormatConfig = {
      url: "https://analyzespends.onrender.com/dateformats",
      // url: "http://localhost:5000/dateformats",
      method: "GET",
    };
    getDateFormats(dateFormatConfig);
  }, [getDateFormats]);

  let message;

  if (!error && !isloading && responseData) {
    message = (
      <Select options={responseData} className={styles["select-list"]}></Select>
    );
  }
  if (isloading) {
    message = <p className={styles.loading}>Loading....</p>;
  }

  if (error) {
    message = <p className={styles.error}>{error}</p>;
  }

  //   const sendRequestFunction = async () => {
  //     const response = await fetch(
  //       "https://analyzespends.onrender.com/dateformats"
  //     );
  //     const rawdata = await response.json();
  //     console.log(rawdata);
  //   };

  //   sendRequestFunction();

  return (
    <React.Fragment>
      <Header>Add Bank Details</Header>
      <Container>{message}</Container>
    </React.Fragment>
  );
};

export default AddBank;

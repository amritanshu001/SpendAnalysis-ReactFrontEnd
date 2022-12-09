import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";

const AddBank = (props) => {
  // const [responseData,setResponseData] = useState(null)

  // const processDateFormats = useCallback((rawdata) => {
  //     console.log(rawdata)
  //     setResponseData(rawdata)
  // },[])

  // const {sendRequest:getDateFormats, isloading, error, resetError}=useHttp(processDateFormats)

  // useEffect(()=>{
  //     const dateFormatConfig = {url:"127.0.0.1:5000/dateformats", method:"GET"}
  //     getDateFormats(dateFormatConfig)
  // })

  const sendRequestFunction = async () => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "OPTIONS");
    const response = await fetch(
      "https://analyzespends.onrender.com/dateformats",
      {
        headers,
      }
    );
    const rawdata = await response.json();
    console.log(rawdata);
  };

  sendRequestFunction();

  return (
    <React.Fragment>
      <Header>Add Bank Details</Header>
      <Container>{/* {error?error:responseData} */}</Container>
    </React.Fragment>
  );
};

export default AddBank;

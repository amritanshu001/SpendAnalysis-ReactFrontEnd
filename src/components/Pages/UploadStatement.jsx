import React, { useState, useCallback } from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";

import styles from "./UploadStatement.module.css";
import useHttp4File from "../../hooks/useHTTP4File";

import { useSelector } from "react-redux";
import Header from "../UI/Header";
import apiURL from "../../endpoint";
import { useRef } from "react";

const mapAccounts = (account) => {
  return (
    <option key={account.id} value={account.id}>
      {account.bank_name}--{account.account_no}
    </option>
  );
};

const UploadStatement = (props) => {
  const accounts = useSelector((state) => state.userAccounts.userAccounts);
  const authToken = useSelector((state) => state.userAuth.authToken);

  const fileInputRef = useRef();
  const [accountId, setAccountId] = useState(0);
  const [insertCount, setInsertCount] = useState({});
  const [validation, setValidation] = useState(null);

  const processFileUpload = useCallback((rawdata) => {
    setInsertCount({
      failed_count: rawdata.fail_count,
      success_count: rawdata.pass_count,
    });
  }, []);

  const {
    isFileloading: fileUploading,
    fileRrror: fileUploadError,
    sendRequest4File: sendFile,
    resetFileError: resetUploadError,
  } = useHttp4File(processFileUpload);

  const onSelectChangeHandler = (event) => {
    setAccountId(+event.target.value);
  };

  const uploadFileHandler = (event) => {
    event.preventDefault();
    setInsertCount({});
    resetUploadError();

    if (accountId === 0) {
      setValidation("Please select an account");
      return;
    }
    if (!fileInputRef.current.files[0]) {
      setValidation("Please select a file to upload");
      return;
    }
    setValidation(null);

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    const fileConfig = {
      url: apiURL + "/statement/" + accountId,
      method: "POST",
      files: fileInputRef.current.files[0],
      body: formData,
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    sendFile(fileConfig);
    setAccountId(0);
    fileInputRef.current.value = "";
  };

  let serverResponse;
  if (fileUploadError) {
    serverResponse = (
      <div className={styles["server-error"]}>{fileUploadError}</div>
    );
  }
  if (fileUploading) {
    serverResponse = <div className={styles["server-loading"]}>Loading...</div>;
  }
  if (
    !fileUploadError &&
    !fileUploading &&
    Object.keys(insertCount).length > 0
  ) {
    serverResponse = (
      <div className={styles["server-success"]}>
        <p>Inserted Records: {insertCount.success_count}</p>
        <p>Failed Records: {insertCount.failed_count}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header>Spend Analysis</Header>
      <Container>
        <form
          encType="multipart/form-data"
          className={styles.form}
          onSubmit={uploadFileHandler}
        >
          <div className={styles.select}>
            <label>Select Account</label>
            <select onChange={onSelectChangeHandler} value={accountId}>
              <option value={0}>---</option>
              {accounts.map(mapAccounts)}
            </select>
          </div>
          <div className={styles["file-input"]}>
            <input
              type="file"
              ref={fileInputRef}
              id="inputfile"
              name="inputfile"
            ></input>
          </div>
          <div className={styles.actions}>
            <Button>Upload Data</Button>
          </div>
          {validation && <p className={styles.error}>{validation}</p>}
        </form>
      </Container>
      {serverResponse}
    </React.Fragment>
  );
};

export default UploadStatement;

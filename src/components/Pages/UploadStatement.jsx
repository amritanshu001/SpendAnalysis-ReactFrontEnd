import React, { useState, useCallback } from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";

import styles from "./UploadStatement.module.css";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { useFetchAccounts } from "../../hooks/useTanstackQueryFetch";
import { sendMutationRequest } from "../../lib/endpoint-configs";

import Header from "../UI/Header";
const apiURL = import.meta.env.VITE_API_URL;
import { useRef } from "react";

import { useLocation } from "react-router-dom";

const mapAccounts = (account) => {
  return (
    <option key={account.id} value={account.id}>
      {account.bank_name}--{account.account_no}
    </option>
  );
};

const UploadStatement = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const location = useLocation();

  const { data: accounts } = useFetchAccounts(authToken);

  const fileInputRef = useRef();
  const [accountId, setAccountId] = useState(0);
  const [insertCount, setInsertCount] = useState({});
  const [validation, setValidation] = useState(null);

  const {
    mutate: uploadFile,
    isError: isFileUplaodError,
    isPending: isFlieUploadPending,
    error: fileError,
    data: responseData,
    isSuccess: isFileUploadSuccess,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: (data) => {
      setInsertCount({
        failed_count: data.fail_count,
        success_count: data.pass_count,
      });
    },
  });

  const onSelectChangeHandler = (event) => {
    setAccountId(+event.target.value);
  };

  const uploadFileHandler = (event) => {
    event.preventDefault();
    setInsertCount({});

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
    uploadFile({ requestConfig: fileConfig });
    setAccountId(0);
    fileInputRef.current.value = "";
  };

  let serverResponse;
  if (isFileUplaodError) {
    serverResponse = (
      <div className={styles["server-error"]}>
        {fileError.status + ":" + fileError.message}
      </div>
    );
  }
  if (isFlieUploadPending) {
    serverResponse = <div className={styles["server-loading"]}>Loading...</div>;
  }
  if (isFileUploadSuccess) {
    serverResponse = (
      <div className={styles["server-success"]}>
        <p>Inserted Records: {insertCount.success_count}</p>
        <p>Failed Records: {insertCount.failed_count}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Upload Statement</Header>
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

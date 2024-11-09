import React, { useState, useCallback } from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";

import styles from "./UploadStatement.module.css";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { useFetchAccounts } from "../../hooks/useTanstackQueryFetch";
import { sendMutationRequest, queryClient } from "../../lib/endpoint-configs";
import RefetchIcon from "../UI/Refetch/RefetchIcon";
import UploadFiles from "../UI/UploadFiles/UploadFiles";

import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Box from "../UI/Box/MUIBox";

import Header from "../UI/Header";
const apiURL = import.meta.env.VITE_API_URL;
import { useRef } from "react";

import { useLocation } from "react-router-dom";

const NewUploadStatement = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const location = useLocation();

  const { data: accounts, refetch: refetchAccounts } =
    useFetchAccounts(authToken);

  const fileInputRef = useRef();
  const [accountId, setAccountId] = useState("");
  const [insertCount, setInsertCount] = useState({});
  const [accountValidation, setAccountValidation] = useState(null);
  const [fileValidation, setFileValidation] = useState(null);

  const {
    mutate: uploadFile,
    isError: isFileUplaodError,
    isPending: isFlieUploadPending,
    error: fileError,
    data: responseData,
    isSuccess: isFileUploadSuccess,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: (data, variables) => {
      setInsertCount({
        failed_count: data.fail_count,
        success_count: data.pass_count,
      });
      const curAccountId = +variables.requestConfig.url
        .toString()
        .split("/")
        .pop();
      queryClient.invalidateQueries({
        queryKey: ["account", curAccountId],
      });
    },
  });

  const onSelectChangeHandler = (event) => {
    setAccountId(+event.target.value);
  };

  const uploadFileHandler = (event) => {
    event.preventDefault();
    setInsertCount({});

    if (accountId === "") {
      setAccountValidation("Please select an account");
      setFileValidation(null);
      return;
    }
    if (!fileInputRef.current.files[0]) {
      setFileValidation("Please select a file to upload");
      setAccountValidation(null);
      return;
    }
    setAccountValidation(null);
    setFileValidation(null);

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
    setAccountId("");
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
      <Box
        initial={{ opacity: 0.25, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          boxShadow: 10,
          border: (theme) =>
            `1px ${
              theme.palette.mode === "light"
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark
            } solid`,

          maxWidth: "40rem",
          margin: "auto",
          p: "1rem",
          borderRadius: 2,
        }}
      >
        <form
          encType="multipart/form-data"
          className={styles.form}
          onSubmit={uploadFileHandler}
        >
          <Stack
            direction="row"
            gap={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              my: "1rem",
            }}
          >
            <FormControl
              error={accountValidation !== null}
              size="small"
              sx={{ minWidth: "250px" }}
            >
              <InputLabel id="account-select" color="secondary">
                Select an Account
              </InputLabel>
              <Select
                label="Select an Account"
                labelId="account-select"
                displayEmpty
                value={accountId}
                onChange={onSelectChangeHandler}
                sx={{ boxShadow: 1 }}
              >
                {accounts &&
                  accounts.length > 0 &&
                  accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.bank_name}--{account.account_no}
                    </MenuItem>
                  ))}
              </Select>
              {accountValidation && (
                <FormHelperText>{accountValidation}</FormHelperText>
              )}
            </FormControl>
            <Tooltip title="Clear account" placement="bottom-start" arrow>
              <span>
                <IconButton
                  onClick={() => setAccountId("")}
                  disabled={accountId === ""}
                >
                  <RemoveCircleIcon
                    sx={{
                      color: (theme) =>
                        accountId === ""
                          ? theme.palette.action.disabled
                          : theme.palette.error.main,
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
            <RefetchIcon
              onClick={refetchAccounts}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
                fontWeight: "bold",
              }}
            />
          </Stack>

          <FormControl
            error={fileValidation !== null}
            sx={{
              alignItems: "center",
            }}
          >
            <UploadFiles
              multiple={false}
              ref={fileInputRef}
              buttonName="Choose Statement File"
              color={fileValidation !== null ? "error" : "secondary"}
            />
            {fileValidation && (
              <FormHelperText>{fileValidation}</FormHelperText>
            )}
          </FormControl>

          <div className={styles.actions}>
            <Button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Upload Data
            </Button>
          </div>
        </form>
      </Box>
      {serverResponse}
    </React.Fragment>
  );
};

export default NewUploadStatement;

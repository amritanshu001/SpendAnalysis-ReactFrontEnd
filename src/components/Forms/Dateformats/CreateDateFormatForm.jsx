import React, { useRef, useState } from "react";
import FormModal from "../../UI/Modal/FormModal";
import Header from "../../UI/Header";

import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { NewInput } from "../../UI/Input";
import Button from "../../UI/Button";
import Box from "../../UI/Box/MUIBox";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Stack,
} from "@mui/material";

const apiURL = import.meta.env.VITE_API_URL;

import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";

import styles from "./CreateDateFormatForm.module.css";

const CreateDateFormatForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const [dateFormatError, setDateFormatError] = useState(null);
  const [dateDescError, setDateDescError] = useState(null);
  const [pyDateError, setPyDateError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dateFormatRef = useRef("");
  const dateDescRef = useRef("");
  const dateTechRef = useRef("");

  const { mutate: createDateFormat, isPending } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dates"] });
      props.onCancel();
    },
    onError: (error) => setErrorMessage(String(error)),
  });

  const createDateFormatHandler = (event) => {
    event.preventDefault();

    if (dateFormatRef.current.value === "") {
      setDateFormatError("Date format cannot be blank");
      setDateDescError(null);
      setPyDateError(null);
      return;
    }
    if (dateDescRef.current.value === "") {
      setDateFormatError(null);
      setDateDescError("Date description cannot be blank");
      setPyDateError(null);
      return;
    }
    if (dateTechRef.current.value === "") {
      setDateFormatError(null);
      setDateDescError(null);
      setPyDateError("Technical date format cannot be blank");
      return;
    }

    setDateFormatError(null);
    setDateDescError(null);
    setPyDateError(null);
    const createDateFormatConfig = {
      url: apiURL + "/dateformats",
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_format: dateFormatRef.current.value,
        desc: dateDescRef.current.value,
        py_date: dateTechRef.current.value,
      }),
    };
    createDateFormat({ requestConfig: createDateFormatConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box
        component="form"
        onSubmit={createDateFormatHandler}
        sx={{
          "& .MuiDialogContent-root": {
            paddingTop: 1,
          },
        }}
      >
        <DialogTitle variant="h4">Create New Date Format</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <NewInput
            type="text"
            id="dateformat"
            inputRef={dateFormatRef}
            label="Date Format"
            error={!!dateFormatError}
            errorText={dateFormatError}
            required
          />

          <NewInput
            type="text"
            id="desc"
            label="Description"
            multiline
            inputRef={dateDescRef}
            error={!!dateDescError}
            errorText={dateDescError}
            required
          />

          <NewInput
            type="text"
            id="techformat"
            inputRef={dateTechRef}
            label="Technical Format"
            error={!!pyDateError}
            errorText={pyDateError}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            transition={{ type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
            }}
          >
            {"Create Date Format"}
          </Button>
          <Button
            whileHover={{
              backgroundColor: "#ab003c",
              scale: 1.1,
              border: "1px solid #ab003c",
            }}
            transition={{ type: "spring", stiffness: 500 }}
            type="button"
            onClick={props.onCancel}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </FormModal>
  );
};

export default CreateDateFormatForm;

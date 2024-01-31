import React, { useRef, useState } from "react";
import FormModal from "../../UI/Modal/FormModal";
import Header from "../../UI/Header";

import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const apiURL = import.meta.env.VITE_API_URL;

import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";

import styles from "./CreateDateFormatForm.module.css";

const CreateDateFormatForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const [errorMessage, setErrorMessage] = useState(null);

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
    console.log("Date Format: ");
    if (
      dateDescRef.current.value === "" ||
      dateFormatRef.current.value === "" ||
      dateTechRef.current.value === ""
    ) {
      setErrorMessage("All Fields are mandatory!");
      return;
    }
    setErrorMessage(null);
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

  const dateFormatRef = useRef("");
  const dateDescRef = useRef("");
  const dateTechRef = useRef("");

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Header>Create New Date Format</Header>
      <form className={styles.form} onSubmit={createDateFormatHandler}>
        <div>
          <label>Date Format</label>
          <input type="text" id="dateformat" ref={dateFormatRef} />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            id="desc"
            rows={3}
            cols={30}
            ref={dateDescRef}
          />
        </div>
        <div>
          <label>Technical Format</label>
          <input type="text" id="techformat" ref={dateTechRef} />
        </div>
        {errorMessage && <p className={styles.message}>{errorMessage}</p>}
        <div className={styles.actions}>
          <motion.button
            whileHover={{
              backgroundColor: "#ab003c",
              scale: 1.1,
              border: "1px solid #ab003c",
            }}
            transition={{ type: "spring", stiffness: 500 }}
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            transition={{ type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
            }}
          >
            {"Create Date Format"}
          </motion.button>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateDateFormatForm;

import React from "react";
import styles from "./UserDelete.module.css";
import FormModal from "../../UI/Modal/FormModal";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
import Header from "../../UI/Header";
import { Typography, Stack, Alert } from "@mui/material";

import { logUserOutActions } from "../../../store/auth-slice";
import { showAndHideMessages } from "../../../store/message-slice";

const apiURL = import.meta.env.VITE_API_URL;

const UnRegister = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: unRegisterUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      props.onCancel();
      dispatch(logUserOutActions());
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText:
            "You have been successfully deregistered and logged out!",
        })
      );
      redirect("/login", { replace: true, state: null });
      console.log("Logged Out successfully");
    },
  });

  const deRegisterUserHandler = (event) => {
    event.preventDefault();
    const deRegisterUserConfig = {
      url: apiURL + "/de-register",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    unRegisterUser({ requestConfig: deRegisterUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box
        onSubmit={deRegisterUserHandler}
        component="form"
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
        }}
      >
        <Typography variant="h4">Are you sure?</Typography>
        <Typography variant="body1">
          You are unregistering from our site!? We are sad to see you go! Please
          note that if you proceed, you will not be able to login to our systems
          without Admin intervention.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.highlightColor.main
                : theme.palette.highlightColor.dark,
          }}
        >
          Do you want to proceed?
        </Typography>

        <Stack direction={"row"} gap={2}>
          <Button type="submit" className={styles["imp-button"]}>
            {isPending ? "De-Register" : "Confirm"}
          </Button>
          <Button
            type="button"
            onClick={props.onCancel}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </Stack>
        {isError && (
          <Alert variant="error">{error.status + ":" + error.message}</Alert>
        )}
      </Box>
    </FormModal>
  );
};

export default UnRegister;

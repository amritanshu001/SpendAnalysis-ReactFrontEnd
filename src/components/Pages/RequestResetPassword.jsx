import React from "react";
import { useLocation } from "react-router-dom";

import { NewInput } from "../UI/Input";
import Box from "../UI/Box/MUIBox";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "../UI/Button";
import Header from "../UI/Header";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";
import { showAndHideMessages } from "../../store/message-slice";
import { useDispatch } from "react-redux";

import useInputValidator from "../../hooks/useInputValidator";
import { useMutation } from "@tanstack/react-query";
import { emailValidator } from "../../lib/validators";
import { sendMutationRequest } from "../../lib/endpoint-configs";

const apiURL = import.meta.env.VITE_API_URL;

const siteAddress = document.location.origin + document.location.pathname;

const ResetPassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    inputValue: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInput: resetEmail,
  } = useInputValidator(emailValidator);

  const { mutate: sendPasswordResetRequest, isPending: passwordResetLoading } =
    useMutation({
      mutationFn: sendMutationRequest,
      onSuccess: (data) =>
        dispatch(
          showAndHideMessages({
            status: "success",
            messageText:
              "Success. If the email is registered in our systems, you will receive a password reset link on your mail. Please click on the link to reset your password. The link is valid for 24 hours",
          })
        ),
      onError: (err) => {
        dispatch(
          showAndHideMessages({
            status: "error",
            messageText: err.status + ":" + err.message,
          })
        );
      },
    });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: enteredEmail,
        site_url: siteAddress,
      }),
    };

    sendPasswordResetRequest({ requestConfig });
    resetEmail();
  };

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Reset Password Request</Header>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layout
        sx={{
          width: "90%",
          maxWidth: "25rem",
          mx: "auto",
          p: "1rem",
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          boxShadow: 10,
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": {
            m: "1rem auto",
            width: "90%",
          },
        }}
      >
        <NewInput
          id="email"
          type="email"
          name="email"
          label="Email Id"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          disabled={passwordResetLoading}
          error={emailIsError}
          errorText={emailIsError ? "Enter email in correct format" : null}
        />

        <Button
          type="submit"
          disabled={!emailIsValid}
          whileHover={{ scale: emailIsValid ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          icon={<RestartAltIcon />}
          loading={passwordResetLoading}
        >
          Send Reset Link
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ResetPassword;

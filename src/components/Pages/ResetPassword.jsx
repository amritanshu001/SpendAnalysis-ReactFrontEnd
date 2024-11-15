import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { NewInput } from "../UI/Input";
import Box from "../UI/Box/MUIBox";

import Button from "../UI/Button";
import Header from "../UI/Header";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";
import { useDispatch } from "react-redux";
import { showAndHideMessages } from "../../store/message-slice";
import useInputValidator from "../../hooks/useInputValidator";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../lib/endpoint-configs";
import { passwordValidator } from "../../lib/validators";

const apiURL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { hash: userHash } = useParams();
  const location = useLocation();
  const currentPathArray = location.pathname.split("/");
  const dispatch = useDispatch();
  const history = useNavigate();
  // const [responseMessage, setResponseMessage] = useState(null);
  const {
    inputValue: enteredPassword,
    inputIsValid: passwordIsValid,
    isError: passwordIsError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    resetInput: resetPassword,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredRePassword,
    inputIsValid: repasswordIsValid,
    isError: repasswordIsError,
    inputBlurHandler: repasswordBlurHandler,
    inputChangeHandler: repasswordChangeHandler,
    resetInput: resetRePassword,
  } = useInputValidator(passwordValidator);

  const {
    isPending: passwordResetLoading,
    isError: isPasswordResetError,
    error: passwordResetError,
    mutate: sendPasswordReset,
    isSuccess: isPassswordResetSuccess,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: (data) =>
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText:
            "Password reset successfully. Redirecting you back to Login page...",
        })
      ),
    onError: (err) => {
      dispatch(
        showAndHideMessages({
          status: "error",
          messageText: `${err.status}":" ${err.message}. Redirecting to Login page....`,
        })
      );
    },
  });

  let passwordMatch = enteredPassword === enteredRePassword;
  let formIsValid = passwordIsValid && repasswordIsValid && passwordMatch;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userHash: userHash,
        newPassword: enteredPassword,
      }),
    };

    sendPasswordReset({ requestConfig });
    resetPassword();
    resetRePassword();
  };

  useEffect(() => {
    setTimeout(() => {
      if (isPasswordResetError || isPassswordResetSuccess) {
        history("/login", { replace: true, state: null });
      }
    }, 2000);
  }, [isPasswordResetError, isPassswordResetSuccess]);

  return (
    <React.Fragment>
      <HeadMetaData pathname={`/${currentPathArray[1]}/:hash`} />
      <Header>Reset Password</Header>
      {/* <Container> */}
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
          id="newpassword"
          type="password"
          name="newpassword"
          label="New Password"
          value={enteredPassword}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          disabled={passwordResetLoading}
          error={passwordIsError}
          errorText={
            passwordIsError
              ? "Password should be atleast 8 characters long"
              : null
          }
        >
          New Password
        </NewInput>
        <NewInput
          id="repeatnewpassword"
          type="password"
          name="repeatnewpassword"
          label="Repeat New Password"
          value={enteredRePassword}
          onBlur={repasswordBlurHandler}
          onChange={repasswordChangeHandler}
          disabled={passwordResetLoading}
          error={!passwordMatch}
          errorText={!passwordMatch ? "Passwords do not match" : null}
        >
          Repeat New Password
        </NewInput>

        <Button
          type="submit"
          disabled={!formIsValid}
          loading={passwordResetLoading}
        >
          Reset Password
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ResetPassword;

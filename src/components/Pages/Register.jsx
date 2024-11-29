import { NewInput } from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Box from "../UI/Box/MUIBox";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { Link, useLocation } from "react-router-dom";

import { passwordValidator, emailValidator } from "../../lib/validators";

import { showAndHideMessages } from "../../store/message-slice";

const apiURL = import.meta.env.VITE_API_URL;

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../lib/endpoint-configs";
import React from "react";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";
import { motion, AnimatePresence } from "framer-motion";
import { Link as NavLink, Stack, Typography } from "@mui/material";

const AnimatedLink = motion(Link);

const Register = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();

  const { mutate: sendUserRegistration, isPending: registrationPending } =
    useMutation({
      mutationFn: sendMutationRequest,
      onSuccess: (data) => {
        dispatch(
          showAndHideMessages({
            status: "success",
            messageText: `Registration successful! Your User Id is ${data.user_id}. Please login with your credentials`,
          })
        );
        redirect("/login", { replace: true, state: null });
      },
      onError: (err) => {
        dispatch(
          showAndHideMessages({
            status: "error",
            messageText: err.status + ":" + err.message,
          })
        );
      },
    });

  const {
    inputValue: enteredUserName,
    inputIsValid: userNameValid,
    isError: userNameError,
    inputBlurHandler: userNameBlurHandler,
    inputChangeHandler: userNameChangeHandler,
    resetInput: resetUserName,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInput: resetEmail,
  } = useInputValidator(emailValidator);

  const {
    inputValue: enteredPassword,
    inputIsValid: passwordIsValid,
    isError: passwordError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    resetInput: resetPassword,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredConfPassword,
    inputIsValid: confPasswordIsValid,
    isError: confPasswordError,
    inputBlurHandler: confPasswordBlurHandler,
    inputChangeHandler: confPasswordChangeHandler,
    resetInput: resetConfPassword,
  } = useInputValidator(passwordValidator);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const registerConfig = {
      url: apiURL + "/registration",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: enteredUserName,
        email_id: enteredEmail,
        password: enteredPassword,
      }),
    };
    sendUserRegistration({ requestConfig: registerConfig });

    resetPassword();
    resetUserName();
    resetEmail();
    resetConfPassword();
  };

  let passwordMatch = enteredPassword === enteredConfPassword;

  let formIsValid =
    emailIsValid &&
    passwordIsValid &&
    confPasswordIsValid &&
    passwordMatch &&
    userNameValid;

  let confirmError = confPasswordError || !passwordMatch;

  const buttonName = registrationPending ? "Registering..." : "Register";

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Register</Header>
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
          maxWidth: "35rem",
          mx: "auto",
          px: 2,
          py: "1rem",
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
        <AnimatePresence>
          <NewInput
            key="username"
            id="username"
            type="text"
            name="username"
            label="User Name"
            value={enteredUserName}
            onBlur={userNameBlurHandler}
            onChange={userNameChangeHandler}
            disabled={registrationPending}
            error={userNameError}
            required
            errorText={
              userNameError
                ? "User Name should be atleast 8 character long"
                : null
            }
          />

          <NewInput
            key="email"
            id="email"
            type="email"
            name="email"
            label="Email Id"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            disabled={registrationPending}
            error={emailIsError}
            required
            errorText={emailIsError ? "Enter correct email format" : null}
          />
          <NewInput
            key={"password"}
            id="password"
            type="password"
            name="password"
            label="Password"
            value={enteredPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            disabled={registrationPending}
            error={passwordError}
            required
            errorText={
              passwordError
                ? "Password should be atleast 8 character long"
                : null
            }
          />

          <NewInput
            key={"conf"}
            id="confpassword"
            type="password"
            name="confpassword"
            label="Confirm Password"
            value={enteredConfPassword}
            onBlur={confPasswordBlurHandler}
            onChange={confPasswordChangeHandler}
            required
            disabled={registrationPending}
            error={confirmError}
            errorText={confirmError ? "Passwords do'nt match" : null}
          />
        </AnimatePresence>
        <Stack direction="column" textAlign="center" gap={2}>
          <Button
            type="submit"
            disabled={!formIsValid}
            whileHover={{ scale: formIsValid ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            variant="contained"
            icon={<AppRegistrationIcon />}
            loading={registrationPending}
          >
            {buttonName}
          </Button>
          <AnimatePresence>
            {!registrationPending && (
              <Stack
                direction="row"
                key="register"
                justifyContent="center"
                alignItems={"center"}
                gap={1}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "inline", paddingTop: "0.4rem" }}
                >
                  Already a User?
                </Typography>
                <NavLink
                  component={AnimatedLink}
                  to="/login"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  exit={{ x: 60, opacity: 0 }}
                  key="button"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.info.dark
                        : theme.palette.info.light,
                  }}
                >
                  Login
                </NavLink>
              </Stack>
            )}
          </AnimatePresence>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Register;

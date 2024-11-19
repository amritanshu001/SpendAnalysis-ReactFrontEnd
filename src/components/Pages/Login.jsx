import { NewInput } from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import LoginIcon from "@mui/icons-material/Login";
import Box from "../UI/Box/MUIBox";

import { Link, useLocation } from "react-router-dom";

import { passwordValidator, emailValidator } from "../../lib/validators";
import { authActions } from "../../store/auth-slice";
import { logUserInActions } from "../../store/auth-slice";
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
import { Typography, Stack, Link as NavLink } from "@mui/material";

const AnimatedLink = motion(Link);

const LoginPage = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();

  const { isPending: isLoginPending, mutate: sendLoginRequest } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: (data) => {
      dispatch(
        authActions.logUserIn({
          authToken: data.access_token,
          isAdmin: data.admin,
          expiresIn: data.expires_in,
          email: data.email_id,
        })
      );
      dispatch(logUserInActions(data.access_token));
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText: "Login Successful. Welcome " + data.email_id,
        })
      );
      redirect("/", { replace: true, state: null });
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // loginErrorReset();
    const loginConfig = {
      url: apiURL + "/userlogin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: enteredEmail,
        password: enteredPassword,
      }),
    };

    sendLoginRequest({ requestConfig: loginConfig });

    resetPassword();
    resetEmail();
  };
  const formIsValid = emailIsValid && passwordIsValid;
  const buttonName = isLoginPending ? "Logging In..." : "Login";

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Login</Header>
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
        <AnimatePresence>
          <NewInput
            key="email"
            id="email"
            type="email"
            name="email"
            label="Email Id"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            disabled={isLoginPending}
            error={emailIsError}
            required
            errorText={emailIsError ? "Enter correct email format" : null}
          />
          <NewInput
            key={"password"}
            id="password"
            type="password"
            name="password"
            label="Enter Password"
            value={enteredPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            disabled={isLoginPending}
            error={passwordError}
            required
            errorText={
              passwordError
                ? "Password should be atleast 8 characters long"
                : null
            }
          />
        </AnimatePresence>
        <Stack direction="column" textAlign="center" gap={2}>
          <Button
            type="submit"
            disabled={!formIsValid}
            whileHover={{ scale: formIsValid ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            variant="contained"
            icon={<LoginIcon />}
            loading={isLoginPending}
          >
            {buttonName}
          </Button>
          <AnimatePresence>
            {!isLoginPending && (
              <>
                <NavLink
                  component={AnimatedLink}
                  to="/request-resetpassword"
                  whileHover={{ scale: 1.1, color: "#FF3161" }}
                  exit={{ x: 60, opacity: 0 }}
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.primary.light,
                  }}
                  key="link"
                >
                  Forgot your password?
                </NavLink>

                <Stack
                  direction="row"
                  key="register"
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Typography
                    variant="body2"
                    sx={{ display: "inline", paddingTop: "0.4rem" }}
                  >
                    Don't have an account?
                  </Typography>
                  <NavLink
                    component={AnimatedLink}
                    to="/sign-up"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    exit={{ x: 60, opacity: 0 }}
                    sx={{
                      p: 1,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.info.dark
                          : theme.palette.info.light,
                    }}
                  >
                    Sign Up!
                  </NavLink>
                </Stack>
              </>
            )}
          </AnimatePresence>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default LoginPage;

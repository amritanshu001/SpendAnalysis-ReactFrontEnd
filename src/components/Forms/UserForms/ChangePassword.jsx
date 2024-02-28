import React, { useState, useRef } from "react";
import styles from "./UserDelete.module.css";
import FormModal from "../../UI/Modal/FormModal";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logUserOutActions } from "../../../store/auth-slice";
import { showAndHideMessages } from "../../../store/message-slice";
import { passwordValidator, isFieldBlank } from "../../../lib/validators";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const textCompare = (text1, text2) => {
  return !(text1 === text2);
};

const apiURL = import.meta.env.VITE_API_URL;

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const oldPasswordRef = useRef("");
  const repeatOldPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const repeatNewPasswordRef = useRef("");

  const [oldPasswordErrorCompare, setOldPasswordErrorCompare] = useState(null);
  const [newPasswordErrorCompare, setNewPasswordErrorCompare] = useState(null);

  const [newPasswordError, setNewPasswordError] = useState(null);
  const [newRepeatPasswordError, setNewRepeatPasswordError] = useState(null);
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [oldRepeatPasswordError, setOldRepeatPasswordError] = useState(null);

  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: userChangePassword,
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
            "Password has been changed successfully. Please login with your new password.",
        })
      );
      redirect("/login", { replace: true });
      console.log("Logged Out successfully");
    },
  });

  const changePasswordHandler = (event) => {
    event.preventDefault();

    setNewPasswordErrorCompare(null);
    setOldPasswordErrorCompare(null);
    setNewPasswordError(null);
    setNewRepeatPasswordError(null);
    setOldPasswordError(null);
    setOldRepeatPasswordError(null);

    if (!isFieldBlank(oldPasswordRef.current.value)) {
      setOldPasswordError("Old Password cannot be blank");
      return;
    }
    if (!isFieldBlank(repeatOldPasswordRef.current.value)) {
      setOldRepeatPasswordError("Old Password cannot be blank");
      return;
    }
    if (!passwordValidator(oldPasswordRef.current.value)) {
      setOldPasswordError("Old Password cannot be less than 8 characters");
      return;
    }

    if (
      textCompare(
        oldPasswordRef.current.value,
        repeatOldPasswordRef.current.value
      )
    ) {
      setOldPasswordErrorCompare("Old Passwords do not match");
      return;
    }
    if (!isFieldBlank(newPasswordRef.current.value)) {
      setNewPasswordError("New Password cannot be blank");
      return;
    }
    if (!isFieldBlank(repeatNewPasswordRef.current.value)) {
      setNewRepeatPasswordError("New Password cannot be blank");
      return;
    }
    if (!passwordValidator(newPasswordRef.current.value)) {
      setNewPasswordError("New Password cannot be less than 8 characters");
      return;
    }

    if (
      textCompare(
        newPasswordRef.current.value,
        repeatNewPasswordRef.current.value
      )
    ) {
      setNewPasswordErrorCompare("New Passwords do not match");
      return;
    }

    const changePasswordConfig = {
      url: apiURL + "/change-password",
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: oldPasswordRef.current.value,
        new_password: newPasswordRef.current.value,
      }),
    };
    userChangePassword({ requestConfig: changePasswordConfig });

    oldPasswordRef.current.value = "";
    repeatOldPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    repeatNewPasswordRef.current.value = "";
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box
        component="form"
        onSubmit={changePasswordHandler}
        className={styles.form}
      >
        <Box>
          <TextField
            id="old-password-input"
            label="Old Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth={true}
            color="success"
            inputRef={oldPasswordRef}
            error={!!oldPasswordErrorCompare || !!oldPasswordError}
            helperText={oldPasswordError}
          />

          <TextField
            id="repeat-old-password-input"
            label="Re-type Old Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth={true}
            color="success"
            inputRef={repeatOldPasswordRef}
            error={oldPasswordErrorCompare || oldRepeatPasswordError}
            helperText={oldRepeatPasswordError}
          />
          {oldPasswordErrorCompare && (
            <Typography color="error" align="center" variant="subtitle1">
              {oldPasswordErrorCompare}
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            id="new-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth={true}
            color="success"
            inputRef={newPasswordRef}
            error={newPasswordErrorCompare || newPasswordError}
            helperText={newPasswordError}
          />

          <TextField
            id="new-repeat-password-input"
            label="Re-type New Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth={true}
            color="success"
            inputRef={repeatNewPasswordRef}
            error={newPasswordErrorCompare || newRepeatPasswordError}
            helperText={newRepeatPasswordError}
          />
          {newPasswordErrorCompare && (
            <Typography color="error" align="center" variant="subtitle1">
              {newPasswordErrorCompare}
            </Typography>
          )}
        </Box>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "Updating..." : "Change Password"}
          </button>
        </div>
        {isError && (
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </Box>
    </FormModal>
  );
};

export default ChangePassword;

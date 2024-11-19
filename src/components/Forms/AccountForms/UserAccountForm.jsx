import React, { useState } from "react";
import styles from "./UserAccountForm.module.css";
import FormModal from "../../UI/Modal/FormModal";
import Header from "../../UI/Header";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
import { NewInput } from "../../UI/Input";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Checkbox,
} from "@mui/material";

const UserAccountForm = ({ data, onCancel, ...props }) => {
  const [accountJoint, setAccountJoint] = useState(data.joint);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const [validation, setValidation] = useState(null);
  const {
    mutate: editAccount,
    isPending,
    isError,
    error: errorEditAccount,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", authToken] });
      onCancel();
    },
  });

  const jointChangeHandler = (event) => {
    setAccountJoint(event.target.checked);
  };

  const accountEditHandler = (event) => {
    event.preventDefault();

    if (accountJoint === data.joint) {
      setValidation("No Data Changed");
      return;
    }
    setValidation(null);
    const accountChangeConfig = {
      url: apiURL + "/accounts/" + data.id,
      method: "PUT",
      body: JSON.stringify({
        joint: accountJoint,
      }),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    editAccount({ requestConfig: accountChangeConfig });
  };

  return (
    <FormModal onBackdropClick={onCancel}>
      <Box
        className={styles.form}
        onSubmit={accountEditHandler}
        component="form"
        sx={{
          "& .MuiDialogContent-root": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: 1,
          },
        }}
      >
        <DialogTitle variant="h4">Edit Account Details</DialogTitle>
        <DialogContent>
          <Stack gap={2} direction={"row"} justifyContent="space-around">
            <NewInput
              label="Account #"
              disabled
              value={data.account_no}
              id={"account_no"}
            />
            <NewInput
              label="Bank Name"
              disabled
              value={data.bank_name}
              id={"bank_name"}
            />
          </Stack>
          <Stack gap={4} direction={"row"} justifyContent="flex-start">
            <FormControlLabel
              label="Active"
              control={
                <Checkbox
                  checked={data.active}
                  disabled
                  color="secondary"
                  size="large"
                />
              }
            />
            <FormControlLabel
              onClick={jointChangeHandler}
              label="Joint"
              control={
                <Checkbox
                  checked={accountJoint}
                  onChange={jointChangeHandler}
                  color="secondary"
                  size="large"
                />
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
        {isError && (
          <Alert severity="error">
            {errorEditAccount.status + ":" + errorEditAccount.message}
          </Alert>
        )}
        {validation && <Alert severity="warning">{validation}</Alert>}
      </Box>
    </FormModal>
  );
};

export default UserAccountForm;

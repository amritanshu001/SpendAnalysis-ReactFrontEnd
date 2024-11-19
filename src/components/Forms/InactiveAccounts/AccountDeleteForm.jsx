import React from "react";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";

const AccountDeleteForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: deleteAccountForever,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inactive-accounts", authToken],
      });
      props.onCancel();
    },
  });

  const deleteFormSubmitHandler = (event) => {
    event.preventDefault();
    const deleteAccountConfig = {
      url: apiURL + "/admin/accounts/" + props.account.id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    deleteAccountForever({ requestConfig: deleteAccountConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box component="form" onSubmit={deleteFormSubmitHandler}>
        <DialogTitle variant="h4">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Account# {props.account.account_no} will be permanently deleted!
          </DialogContentText>
          <DialogContentText
            sx={{
              fontWeight: "bold",
            }}
          >
            This action cannot be reverted!
          </DialogContentText>
          <DialogContentText
            sx={{
              fontWeight: "bold",
              color: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.highlightColor.dark
                  : theme.palette.highlightColor.main,
            }}
          >
            Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {isPending ? "Deleting..." : "Confirm Delete"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </DialogActions>
        {isError && (
          <Alert severity="error">
            {error.status + ":" + errorEditAccount.message}
          </Alert>
        )}
      </Box>
    </FormModal>
  );
};

export default AccountDeleteForm;

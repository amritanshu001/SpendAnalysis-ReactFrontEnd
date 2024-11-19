import React from "react";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
const apiURL = import.meta.env.VITE_API_URL;

const AccountDeleteForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: deleteAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[1] === authToken &&
          (query.queryKey[0] === "accounts" ||
            query.queryKey[0] === "inactive-accounts"),
      });
      props.onCancel();
    },
  });

  const deleteFormSubmitHandler = (event) => {
    event.preventDefault();
    const deleteAccountConfig = {
      url: apiURL + "/accounts/" + props.account.id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    deleteAccount({ requestConfig: deleteAccountConfig });
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box onSubmit={deleteFormSubmitHandler} component="form">
        <DialogTitle variant="h4">Remove Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Account# {props.account.account_no} will be deleted!
          </DialogContentText>
          <DialogContentText
            sx={{
              fontWeight: "bold",
              color: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.highlightColor.main
                  : theme.palette.highlightColor.dark,
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
            type="button"
            onClick={props.onCancel}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
        {isError && <p>{error.status + ":" + errorEditAccount.message}</p>}
      </Box>
    </FormModal>
  );
};

export default AccountDeleteForm;

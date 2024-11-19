import React from "react";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
const apiURL = import.meta.env.VITE_API_URL;

const AccountReactivate = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: reactivateAccount,
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

  const reactivateFormSubmitHandler = (event) => {
    event.preventDefault();
    const activateAccountConfig = {
      url: apiURL + "/admin/accounts/" + props.account.id,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    reactivateAccount({ requestConfig: activateAccountConfig });
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box onSubmit={reactivateFormSubmitHandler} component="form">
        <DialogTitle variant="h4">Reactivate User</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1.25rem" }}>
            Account# {props.account.account_no} will be reactivated.
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
            {isPending ? "Deleting..." : "Confirm Reactivation"}
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
        {isError && (
          <Alert severity="error">
            {error.status + ":" + errorEditAccount.message}
          </Alert>
        )}
      </Box>
    </FormModal>
  );
};

export default AccountReactivate;

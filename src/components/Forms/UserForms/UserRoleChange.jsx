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
  DialogTitle,
  DialogContent,
  DialogContentText,
  Alert,
} from "@mui/material";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";

const UserRoleChange = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: changeUserRole,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      props.onCancel();
    },
  });

  const changeUserRoleHandler = (event) => {
    event.preventDefault();
    const changeUserRoleConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin: props.admin }),
    };
    changeUserRole({ requestConfig: changeUserRoleConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box component="form" onSubmit={changeUserRoleHandler}>
        <DialogTitle variant="h4">Change Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {props.user.userName} will be{" "}
            {props.admin ? "upgraded" : "donwgraded"} to{" "}
            {props.admin ? "Admin" : "User"}
            {props.admin ? " and will have advanced privilages!" : "."}
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
          <Button type="submit" loading={isPending}>
            {isPending ? "Changing Role..." : "Confirm"}
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
          <Alert severity="error">{error.status + ":" + error.message}</Alert>
        )}
      </Box>
    </FormModal>
  );
};

export default UserRoleChange;

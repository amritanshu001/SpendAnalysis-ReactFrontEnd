import React from "react";
import styles from "./UserDelete.module.css";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Alert,
} from "@mui/material";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
const apiURL = import.meta.env.VITE_API_URL;

const UserDelete = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: deleteUser,
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

  const deleteUserHandler = (event) => {
    event.preventDefault();
    const deleteUserConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    deleteUser({ requestConfig: deleteUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box onSubmit={deleteUserHandler} component="form">
        <DialogContent>
          <DialogContentText>
            User {props.user.userName} will be <strong>deleted forever</strong>.
            This action <strong>cannot be reverted!!!</strong>
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
            {isPending ? "Deleting..." : "Confirm"}
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
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </Box>
    </FormModal>
  );
};

export default UserDelete;

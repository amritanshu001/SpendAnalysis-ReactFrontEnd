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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const apiURL = import.meta.env.VITE_API_URL;

const ReactivateUser = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: reactivateUser,
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

  const reactivateUserHandler = (event) => {
    event.preventDefault();
    const reactivateUserConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    reactivateUser({ requestConfig: reactivateUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <Box
        onSubmit={reactivateUserHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <DialogTitle>Reactivate User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are <strong>reactivating</strong> User {props.user.userName}.
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
            {isPending ? "Re-Activate..." : "Confirm"}
          </Button>
          <Button
            type="button"
            onClick={props.onCancel}
            variant="contained"
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

export default ReactivateUser;

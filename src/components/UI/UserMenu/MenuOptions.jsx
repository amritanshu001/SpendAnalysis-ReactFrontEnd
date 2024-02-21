import React from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";

import { logUserOutActions } from "../../../store/auth-slice";
import { showAndHideMessages } from "../../../store/message-slice";

import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";

import UnRegister from "../../Forms/UserForms/UnRegister";
import { formModalAction } from "../../../store/formmodal-slice";

const AnimatedMenuItem = motion(MenuItem);

const MenuOptions = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const redirect = useNavigate();
  const authToken = useSelector((state) => state.userAuth.authToken);
  const userEmail = useSelector((state) => state.userAuth.email);
  const modalStatus = useSelector((state) => state.formModal.showModal);

  const { mutate: logoutUser, isPending: logoutLoading } = useMutation({
    mutationFn: sendMutationRequest,
    onMutate: () => {
      dispatch(logUserOutActions());
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText: "You have been successfully logged out!",
        })
      );
      redirect("/login", { replace: true });
      console.log("Logged Out successfully");
    },
  });

  const logoutHandler = () => {
    setAnchorEl(null);
    if (props.hideSideBar) {
      props.hideSideBar();
    }
    const logoutConfig = {
      url: apiURL + "/userlogout",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    logoutUser({ requestConfig: logoutConfig });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deRegisterHandler = () => {
    handleClose();
    dispatch(formModalAction.showModal());
  };

  const hideModalHandler = () => {
    dispatch(formModalAction.hideModal());
  };
  return (
    <>
      {modalStatus && <UnRegister onCancel={hideModalHandler} />}
      <Tooltip title="User settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {userEmail ? userEmail[0].toUpperCase() : ""}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <AnimatedMenuItem disabled>
          <Typography> {userEmail}</Typography>
        </AnimatedMenuItem>
        <Divider />
        <AnimatedMenuItem onClick={handleClose}>
          <ListItemIcon>
            <LockResetIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Change Password</Typography>
        </AnimatedMenuItem>
        <AnimatedMenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">
            {logoutLoading ? "Logging Out..." : "Logout"}
          </Typography>
        </AnimatedMenuItem>
        <Divider />
        <AnimatedMenuItem
          onClick={deRegisterHandler}
          whileHover={{ scale: 1.1 }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" sx={{ color: "#ffb3ba" }} />
          </ListItemIcon>
          <Typography sx={{ color: "#ffb3ba" }}>Un-Register</Typography>
        </AnimatedMenuItem>
      </Menu>
    </>
  );
};

export default MenuOptions;

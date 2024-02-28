import React, { useState } from "react";
import { useFetchUsers } from "../../../hooks/useTanstackQueryFetch";
import DisplayGrid, {
  AnimatedTippedIconButton,
} from "../../UI/MUI Grid/DisplayGrid";
import HeadMetaData from "../../UI/HeadMetadata/HeadMetaData";
import Header from "../../UI/Header";
import SpinnerCircular from "../../UI/Feedback/SpinnerCircular";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import Stack from "@mui/material/Stack";
import RestoreIcon from "@mui/icons-material/Restore";
import { CircularProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

import { formModalAction } from "../../../store/formmodal-slice";

import UserRoleChange from "../../Forms/UserForms/UserRoleChange";
import UserDelete from "../../Forms/UserForms/UserDelete";
import ReactivateUser from "../../Forms/UserForms/ReactivateUser";

import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
const apiURL = import.meta.env.VITE_API_URL;

import { Tooltip } from "@mui/material";

const TippedIcon = (props) => (
  <Tooltip title={props.title} placement="bottom-start" arrow>
    {props.icon}
  </Tooltip>
);

const convert2DateCreatedOn = (params) => {
  const newDate = new Date(params.row.created_on);
  return newDate;
};

const convert2DateUpdatedOn = (params) => {
  if (!params.row.updated_on) {
    return null;
  }
  const newDate = new Date(params.row.updated_on);
  return newDate;
};

const convert2DateExpiresOn = (params) => {
  if (!params.row.reset_expiry) {
    return null;
  }
  const newDate = new Date(params.row.reset_expiry);
  return newDate;
};

const convert2LastLoggedIn = (params) => {
  if (!params.row.last_logged_in) {
    return null;
  }
  const newDate = new Date(params.row.last_logged_in);
  return newDate;
};

const ManageUsers = () => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const location = useLocation();
  const dispatch = useDispatch();
  const [userAction, setUserAction] = useState({ action: null, data: null });
  const [anchorEl, setAnchorEl] = useState({ event: null, target: null });
  const menuOpen = Boolean(anchorEl.event);

  const menuCloseHandler = () => {
    setAnchorEl({ event: null, target: null });
  };

  const {
    mutate: resetUserExpiryDate,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const hideModalHandler = () => {
    dispatch(formModalAction.hideModal());
    setUserAction(null);
    menuCloseHandler();
  };

  const deleteUserForeverHandler = () => {
    setAnchorEl((old) => {
      return {
        ...old,
        event: null,
      };
    });
    setUserAction({ action: "delete", data: null });
    dispatch(formModalAction.showModal());
  };

  const reactivateUserHandler = () => {
    setAnchorEl((old) => {
      return {
        ...old,
        event: null,
      };
    });
    setUserAction({ action: "re-activate", data: null });
    dispatch(formModalAction.showModal());
  };

  const gridUserUpgradeHandler = (params) => {
    const clickHandler = () => {
      setUserAction({ action: "upgrade", data: { ...params.row } });
      dispatch(formModalAction.showModal());
    };
    return (
      <AnimatedTippedIconButton
        title="Elevate to Admin"
        color="primary"
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        icon={<UpgradeIcon />}
      />
    );
  };

  const gridUserDowngradeHandler = (params) => {
    const clickHandler = () => {
      setUserAction({ action: "downgrade", data: { ...params.row } });
      dispatch(formModalAction.showModal());
    };
    return (
      <AnimatedTippedIconButton
        title="Downgrade to User"
        color="warning"
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        icon={<VerticalAlignBottomIcon />}
      />
    );
  };

  const gridUserKebabHandler = (params) => {
    if (params.row.active) {
      return null;
    }
    const clickHandler = (event) => {
      setAnchorEl({ event: event.currentTarget, target: { ...params.row } });
    };
    return (
      <AnimatedTippedIconButton
        title="Other Actions"
        color="error"
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        icon={<MoreVertIcon />}
      />
    );
  };

  const gridUserExpiryRefreshHandler = (params) => {
    const clickHandler = (event) => {
      event.preventDefault();
      const resetPasswordExpiryDate = {
        url: apiURL + "/admin/user/" + params.id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reset_expiry: null, reset_hash: null }),
      };
      resetUserExpiryDate({ requestConfig: resetPasswordExpiryDate });
    };
    return (
      <AnimatedTippedIconButton
        title="Reset Password Expiry request"
        color="success"
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        icon={<RestoreIcon />}
      />
    );
  };

  const {
    data: users,
    isPending: usersLoading,
    isSuccess: usersFetchSuccess,
    isError: isUserFetchError,
    error: userFetchError,
  } = useFetchUsers(authToken);
  const txnCols = [
    {
      headerName: "User Name",
      field: "userName",
      flex: 1,
      minWidth: 150,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 250,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Active",
      field: "active",
      width: 70,
      headerClassName: "table__header",
      renderCell: (params) =>
        params.row.active ? (
          <TippedIcon icon={<CheckIcon color="success" />} title="Active" />
        ) : (
          <TippedIcon icon={<ClearIcon color="error" />} title="Inactive" />
        ),
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Role",
      field: "admin",
      minWidth: 70,
      flex: 1,
      headerClassName: "table__header",
      renderCell: (params) =>
        params.row.admin ? (
          <TippedIcon
            icon={<AdminPanelSettingsIcon color="primary" />}
            title="Admin"
          />
        ) : (
          <TippedIcon icon={<PersonIcon color="secondary" />} title="User" />
        ),
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Created On",
      field: "created_on",
      minWidth: 100,
      flex: 1,
      type: "date",
      valueGetter: convert2DateCreatedOn,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Last Updated",
      field: "updated_on",
      minWidth: 100,
      flex: 1,
      type: "date",
      valueGetter: convert2DateUpdatedOn,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Password Reset Expires",
      field: "reset_expiry",
      minWidth: 150,
      flex: 1,
      type: "date",
      valueGetter: convert2DateExpiresOn,

      renderCell: (params) => {
        if (!params.row.reset_hash) {
          return "";
        }
        const date = new Date();
        const expiryDate = new Date(params.value);
        return (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <p className={date > expiryDate ? "error" : ""}>
              {params.row.reset_expiry}
            </p>
            {isPending ? (
              <CircularProgress size="1rem" />
            ) : (
              gridUserExpiryRefreshHandler(params)
            )}
          </Stack>
        );
      },
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Last Logged In",
      field: "last_logged_in",
      minWidth: 100,
      flex: 1,
      type: "date",
      valueGetter: convert2LastLoggedIn,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        const date = new Date();
        const diffDays = Math.ceil(
          (date - params.value) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 30) {
          return "warning";
        }
      },
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Change Role",
      field: "Role_change",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (!params.row.active) {
          return "";
        }

        return params.row.admin
          ? gridUserDowngradeHandler(params)
          : gridUserUpgradeHandler(params);
      },
    },
    {
      headerName: "Other Actions",
      field: "actions",
      minWidth: 90,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
      renderCell: gridUserKebabHandler,
    },
  ];
  return (
    <>
      <HeadMetaData pathname={location.pathname} />
      <Menu
        anchorEl={anchorEl.event}
        open={menuOpen}
        onClose={menuCloseHandler}
      >
        <MenuItem key="restore" onClick={reactivateUserHandler}>
          <ListItemIcon>
            <SettingsBackupRestoreIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Re-Activate</Typography>
        </MenuItem>
        <MenuItem key="delete" onClick={deleteUserForeverHandler}>
          <ListItemIcon>
            <PersonRemoveIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <Typography variant="inherit">Delete Forever</Typography>
        </MenuItem>
      </Menu>
      {formModalStatus && userAction.action === "upgrade" && (
        <UserRoleChange
          onCancel={hideModalHandler}
          user={userAction.data}
          admin={true}
        />
      )}
      {formModalStatus && userAction.action === "downgrade" && (
        <UserRoleChange
          onCancel={hideModalHandler}
          user={userAction.data}
          admin={false}
        />
      )}
      {formModalStatus && userAction.action === "delete" && (
        <UserDelete onCancel={hideModalHandler} user={anchorEl.target} />
      )}
      {formModalStatus && userAction.action === "re-activate" && (
        <ReactivateUser onCancel={hideModalHandler} user={anchorEl.target} />
      )}
      <Header>Manage Users</Header>
      <AnimatePresence>
        {usersLoading && <SpinnerCircular key="waiting" />}
        {isUserFetchError && (
          <motion.p className="error" key="error">
            {userFetchError.status + ":" + userFetchError.message}
          </motion.p>
        )}
        {usersFetchSuccess && (
          <DisplayGrid
            rows={users}
            columns={txnCols}
            boxWidth="95%"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0.25, y: 100 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ManageUsers;

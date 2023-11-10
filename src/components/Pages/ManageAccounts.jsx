import styles from "./ManageAccounts.module.css";

import Header from "../UI/Header";
import { AnimatePresence } from "framer-motion";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import UserAccountForm from "../Forms/AccountForms/UserAccountForm";
import AccountDeleteForm from "../Forms/AccountForms/AccountDeleteForm";
import CreateAccountForm from "../Forms/AccountForms/CreateAccountForm";

import { useFetchAccounts } from "../../hooks/useTanstackQueryFetch";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { accountsAction } from "../../store/useraccount-slice";
import { formModalAction } from "../../store/formmodal-slice";
import { motion } from "framer-motion";

import DisplayGrid, {
  RowEditIcon,
  RowDeleteIcon,
} from "../UI/MUI Grid/DisplayGrid";

const AnimatedIconButton = motion(IconButton);

let formData;

const ManageAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data: accountData,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
    error: accountsFetchError,
    isSuccess,
  } = useFetchAccounts(authToken);

  if (isSuccess) {
    dispatch(
      accountsAction.setUserAccounts({
        accounts: accountData,
      })
    );
  }

  const [accountAction, setAccountAction] = useState(null);

  const backdropClick = () => {
    formData = {};
    setAccountAction(null);
    dispatch(formModalAction.hideModal());
  };

  const gridRowEditHandler = (params) => {
    const clickHandler = () => {
      formData = { formAction: "Edit", data: { ...params.row } };
      setAccountAction("Edit");
      dispatch(formModalAction.showModal());
    };
    return (
      <RowEditIcon
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    );
  };

  const gridRowDeleteHandler = (params) => {
    const clickHandler = () => {
      formData = { formAction: "Delete", data: { ...params.row } };
      setAccountAction("Delete");
      dispatch(formModalAction.showModal());
    };
    return (
      <RowDeleteIcon
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    );
  };

  const txnCols = [
    {
      headerName: "Account#",
      field: "account_no",
      flex: 1,
      minWidth: 150,
      headerClassName: "table__header",
    },
    {
      headerName: "Bank",
      field: "bank_name",
      minWidth: 200,
      flex: 1,
      headerClassName: "table__header",
    },
    {
      headerName: "Active",
      field: "active",
      width: 75,
      headerClassName: "table__header",
      valueGetter: (params) => (params.row.active ? "Yes" : "No"),
    },
    {
      headerName: "Joint",
      field: "joint",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      valueGetter: (params) => (params.row.joint ? "Yes" : "No"),
    },
    {
      headerName: "Edit",
      field: "edit",
      minWidth: 75,
      flex: 1,
      renderCell: gridRowEditHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
    },
    {
      headerName: "Delete",
      field: "delete",
      minWidth: 100,
      flex: 1,
      renderCell: gridRowDeleteHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
    },
  ];

  let message;
  if (isAccountsLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }
  if (isAccountsError) {
    message = (
      <p className={styles.error}>
        {accountsFetchError.status + ":" + accountsFetchError.message}
      </p>
    );
  }

  if (!isAccountsLoading && !isAccountsError && accountData) {
    message = (
      <DisplayGrid
        rows={accountData}
        columns={txnCols}
        boxWidth="60%"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0.25, y: 100 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  const addAccountClickHandler = () => {
    setAccountAction("Create");
    dispatch(formModalAction.showModal());
  };

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <AnimatePresence>
        {accountAction === "Create" && formModalStatus && (
          <CreateAccountForm key="create" onCancel={backdropClick} />
        )}

        {accountAction === "Edit" && formModalStatus && (
          <UserAccountForm
            key="edit"
            data={formData.data}
            onCancel={backdropClick}
          />
        )}
        {accountAction === "Delete" && formModalStatus && (
          <AccountDeleteForm
            key="delete"
            onCancel={backdropClick}
            account={formData.data}
          />
        )}
      </AnimatePresence>
      <Header>
        My Accounts
        <Tooltip title="Add New Account" placement="top-start" arrow>
          <AnimatedIconButton
            color="primary"
            aria-label="add"
            onClick={addAccountClickHandler}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <AddIcon />
          </AnimatedIconButton>
        </Tooltip>
      </Header>
      {/* <Container className={styles.container}>{message}</Container> */}
      {message}
    </React.Fragment>
  );
};

export default ManageAccounts;

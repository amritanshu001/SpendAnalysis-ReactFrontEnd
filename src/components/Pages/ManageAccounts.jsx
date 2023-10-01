import styles from "./ManageAccounts.module.css";

import Header from "../UI/Header";
import Container from "../UI/Container";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import UserAccountForm from "../Forms/AccountForms/UserAccountForm";
import AccountDeleteForm from "../Forms/AccountForms/AccountDeleteForm";
import CreateAccountForm from "../Forms/AccountForms/CreateAccountForm";

import { useFetchAccounts } from "../../hooks/useTanstackQueryFetch";
import { convert2AccountFormat } from "../../lib/server-communication";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { accountsAction } from "../../store/useraccount-slice";
import { formModalAction } from "../../store/formmodal-slice";

import DisplayGrid, {
  RowEditIcon,
  RowDeleteIcon,
} from "../UI/MUI Grid/DisplayGrid";

let formData;

const ManageAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  // const formModalStatus = useSelector((state) => state.formModal.showModal);
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
        accounts: convert2AccountFormat(accountData),
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
    return <RowEditIcon onClick={clickHandler} />;
  };

  const gridRowDeleteHandler = (params) => {
    const clickHandler = () => {
      formData = { formAction: "Delete", data: { ...params.row } };
      setAccountAction("Delete");
      dispatch(formModalAction.showModal());
    };
    return <RowDeleteIcon onClick={clickHandler} />;
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
      <Container className={styles.container}>
        <DisplayGrid
          rows={convert2AccountFormat(accountData)}
          columns={txnCols}
          boxWidth="90%"
        />
      </Container>
    );
  }

  const addAccountClickHandler = () => {
    setAccountAction("Create");
    dispatch(formModalAction.showModal());
  };

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      {accountAction === "Create" && (
        <CreateAccountForm onCancel={backdropClick} />
      )}
      {accountAction === "Edit" && (
        <UserAccountForm data={formData.data} onCancel={backdropClick} />
      )}
      {accountAction === "Delete" && (
        <AccountDeleteForm onCancel={backdropClick} account={formData.data} />
      )}
      <Header>
        My Accounts
        <Tooltip title="Add New Account" placement="top-start" arrow>
          <IconButton
            color="primary"
            aria-label="add"
            onClick={addAccountClickHandler}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Header>
      {/* <Container className={styles.container}>{message}</Container> */}
      {message}
    </React.Fragment>
  );
};

export default ManageAccounts;

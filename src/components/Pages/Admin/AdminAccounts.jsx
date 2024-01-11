import React, { useState } from "react";
import styles from "./AdminAccounts.module.css";

import DisplayGrid from "../../UI/MUI Grid/DisplayGrid";
import HeadMetaData from "../../UI/HeadMetadata/HeadMetaData";
import {
  RowDeleteIcon,
  RowReactivateIcon,
} from "../../UI/MUI Grid/DisplayGrid";
import { formModalAction } from "../../../store/formmodal-slice";
import Header from "../../UI/Header";
import SpinnerCircular from "../../UI/Feedback/SpinnerCircular";

import AccountDeleteForm from "../../Forms/InactiveAccounts/AccountDeleteForm";
import AccountReactivate from "../../Forms/InactiveAccounts/AccountReactivate";

import { useFetchInactiveAccounts } from "../../../hooks/useTanstackQueryFetch";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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

const AdminAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const location = useLocation();

  const dispatch = useDispatch();
  const [accountAction, setAccountAction] = useState(null);

  const hideModalHandler = () => {
    setAccountAction(null);
    dispatch(formModalAction.hideModal());
  };

  const gridRowDeleteHandler = (params) => {
    const clickHandler = () => {
      setAccountAction({ action: "Delete", data: { ...params.row } });
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

  const gridRowActivateHandler = (params) => {
    const clickHandler = () => {
      setAccountAction({ action: "Activate", data: { ...params.row } });
      dispatch(formModalAction.showModal());
    };
    return (
      <RowReactivateIcon
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
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Bank",
      field: "bank_name",
      minWidth: 200,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "User Email",
      field: "emails",
      width: 200,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Joint",
      field: "joint",
      minWidth: 50,
      flex: 1,
      headerClassName: "table__header",
      valueGetter: (params) => (params.row.joint ? "Yes" : "No"),
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Created On",
      field: "created_on",
      minWidth: 120,
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
      minWidth: 120,
      flex: 1,
      type: "date",
      valueGetter: convert2DateUpdatedOn,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Re-Activate",
      field: "activate",
      minWidth: 75,
      flex: 1,
      renderCell: gridRowActivateHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
    },
    {
      headerName: "Delete",
      field: "delete",
      minWidth: 75,
      flex: 1,
      renderCell: gridRowDeleteHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
    },
  ];

  const {
    data: inactiveAccounts,
    isLoading: accountsLoading,
    isSuccess: accountsLoadSuccess,
    isError: isAccountsLoadError,
    error: accountsLoadError,
  } = useFetchInactiveAccounts(authToken);

  console.log("From API, Inactive Accounts", inactiveAccounts);
  return (
    <>
      <HeadMetaData pathname={location.pathname} />
      <Header>Manage Inactive Accounts</Header>
      {formModalStatus &&
        accountAction &&
        accountAction.action === "Delete" && (
          <AccountDeleteForm
            account={accountAction.data}
            onCancel={hideModalHandler}
          />
        )}
      {formModalAction &&
        accountAction &&
        accountAction.action === "Activate" && (
          <AccountReactivate
            account={accountAction.data}
            onCancel={hideModalHandler}
          />
        )}
      {isAccountsLoadError && (
        <p className={styles.error}>
          {accountsLoadError.status + ":" + accountsLoadError.message}
        </p>
      )}
      {accountsLoading && <SpinnerCircular />}
      {accountsLoadSuccess && (
        <DisplayGrid
          rows={inactiveAccounts}
          columns={txnCols}
          boxWidth="95%"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0.25, y: 100 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
};

export default AdminAccounts;

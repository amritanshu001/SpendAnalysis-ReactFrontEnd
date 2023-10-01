import styles from "./ManageAccounts.module.css";

import Header from "../UI/Header";
import FormModal from "../UI/Modal/FormModal";
import Container from "../UI/Container";

import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import UserAccountForm from "../Forms/AccountForms/UserAccountForm";
import DeleteForm from "../Forms/AccountForms/DeleteForm";
import CreateAccountForm from "../Forms/AccountForms/CreateAccountForm";

import useHttp from "../../hooks/useHTTP";
import { useFetchAccounts } from "../../hooks/useTanstackQueryFetch";
import { convert2AccountFormat } from "../../lib/server-communication";
import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { accountsAction } from "../../store/useraccount-slice";
import { formModalAction } from "../../store/formmodal-slice";

const apiURL = import.meta.env.VITE_API_URL;

import DisplayGrid, {
  RowEditIcon,
  RowDeleteIcon,
} from "../UI/MUI Grid/DisplayGrid";

let formData;

const ManageAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  // const accountData = useSelector((state) => state.userAccounts.userAccounts);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data: accountData,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
    error: accountsFetchError,
  } = useFetchAccounts(authToken);

  console.log(convert2AccountFormat(accountData));

  const [isCreateClicked, setCreateClicked] = useState(false);
  const [firstMount, setFirstMount] = useState(0);
  const [accountAction, setAccountAction] = useState(null);

  const processAccountDetails = useCallback((rawdata) => {
    setFirstMount(1);
    const processedData = [];
    for (let key in rawdata) {
      const row = {};
      row["id"] = rawdata[key].account_id;
      row.account_no = rawdata[key].account_no;
      row.active = rawdata[key].active;
      row.joint = rawdata[key].joint;
      row.bank_name = rawdata[key]["bank_dets"].bank_name;
      processedData.push(row);
    }
    dispatch(accountsAction.setUserAccounts({ accounts: processedData }));
  }, []);

  const {
    isloading: accountsLoading,
    error: accountsError,
    sendRequest: getUserAccounts,
    resetError: resetAccountsError,
  } = useHttp(processAccountDetails);

  const backdropClick = () => {
    formData = {};
    setCreateClicked(false);
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

  const accountChangeProcess = useCallback((rawdata) => {
    const accountsConfig = {
      url: apiURL + "/accounts",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    getUserAccounts(accountsConfig);
    backdropClick();
  }, []);

  const {
    isloading: accountChanging,
    error: accountChangeError,
    sendRequest: changeAccount,
    resetError: resetChangeError,
  } = useHttp(accountChangeProcess);

  const accountSaveHandler = (account_id, joint) => {
    const accountChangeConfig = {
      url: apiURL + "/accounts/" + account_id,
      method: "PUT",
      body: {
        joint: joint,
      },
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    changeAccount(accountChangeConfig);
  };

  const {
    isloading: deleteInProgress,
    error: deleteError,
    sendRequest: sendDeleteRequest,
  } = useHttp(accountChangeProcess);

  const deleteAccountHandler = (account_id) => {
    const delectAccountConfig = {
      url: apiURL + "/accounts/" + account_id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    sendDeleteRequest(delectAccountConfig);
  };

  const addAccountClickHandler = () => {
    setCreateClicked(true);
    setAccountAction("Create");
    dispatch(formModalAction.showModal());
  };

  const {
    isloading: creatingAccount,
    error: createError,
    sendRequest: createAccount,
  } = useHttp(accountChangeProcess);

  const newAccountSaveHandler = (bank_id, account_no, joint) => {
    const newAccountConfig = {
      url: apiURL + "/accounts",
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: {
        joint: joint,
        bank: bank_id,
        account_no: account_no,
      },
    };
    createAccount(newAccountConfig);
    setCreateClicked(false);
  };

  let showEditForm =
    !!formData &&
    Object.keys(formData).length > 0 &&
    formData.formAction === "Edit";
  let showDeleteForm =
    !!formData &&
    Object.keys(formData).length > 0 &&
    formData.formAction === "Delete";

  // useEffect(() => {
  //   if (accountData.length === 0 && firstMount === 0) {
  //     const accountsConfig = {
  //       url: apiURL + "/accounts",
  //       headers: {
  //         Authorization: "Bearer " + authToken,
  //       },
  //     };
  //     getUserAccounts(accountsConfig);
  //   }
  // }, [authToken, getUserAccounts, accountData, firstMount]);

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      {formModalStatus && accountAction === "Create" && (
        <CreateAccountForm onCancel={backdropClick} />
      )}
      {/* {formModalStatus && (
        <FormModal onBackdropClick={backdropClick}>
          {showEditForm && (
            <UserAccountForm
              data={formData.data}
              onCancel={backdropClick}
              onSave={accountSaveHandler}
              loading={accountChanging}
              error={accountChangeError}
            />
          )}
          {showDeleteForm && (
            <DeleteForm
              account={formData.data}
              onCancel={backdropClick}
              onDelete={deleteAccountHandler}
              loading={deleteInProgress}
              error={deleteError}
            />
          )}
          {isCreateClicked && (
            <CreateAccountForm
              onCancel={backdropClick}
              onCreate={newAccountSaveHandler}
              loading={creatingAccount}
              error={createError}
            />
          )}
        </FormModal>
      )} */}
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

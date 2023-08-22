import styles from "./ManageAccounts.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Table from "../UI/Table/Table";
import FormModal from "../UI/Modal/FormModal";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import UserAccountForm from "../Forms/AccountForms/UserAccountForm";
import DeleteForm from "../Forms/AccountForms/DeleteForm";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { accountsAction } from "../../store/useraccount-slice";
import { formModalAction } from "../../store/formmodal-slice";

import apiURL from "../../endpoint";
import CreateAccountForm from "../Forms/AccountForms/CreateAccountForm";

const header = [
  { name: "Account#", tech_name: "account_no" },
  { name: "Bank", tech_name: "bank_name" },
  { name: "Active", tech_name: "active" },
  { name: "Joint", tech_name: "joint" },
];

const ManageAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const accountData = useSelector((state) => state.userAccounts.userAccounts);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const dispatch = useDispatch();
  const [editFormData, setEditFormData] = useState({});
  const [deleteAccount, setDeleteAccount] = useState({});
  const [isCreateClicked, setCreateClicked] = useState(false);
  const [firstMount, setFirstMount] = useState(0);

  const processAccountDetails = useCallback((rawdata) => {
    setFirstMount(1);
    const processedData = [];
    for (let key in rawdata) {
      const row = {};
      row["id"] = rawdata[key].account_id;
      row.account_no = rawdata[key].account_no;
      row.active = rawdata[key].active ? "Yes" : "No";
      row.joint = rawdata[key].joint ? "Yes" : "No";
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

  useEffect(() => {
    if (accountData.length === 0 && firstMount === 0) {
      const accountsConfig = {
        url: apiURL + "/accounts",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      getUserAccounts(accountsConfig);
    }
  }, [authToken, getUserAccounts, accountData, firstMount]);

  const editRowHandler = (row) => {
    setEditFormData(row);
    dispatch(formModalAction.showModal());
  };

  const deleteRowHandler = (row) => {
    setDeleteAccount(row);
    dispatch(formModalAction.showModal());
  };

  const backdropClick = () => {
    setDeleteAccount({});
    setEditFormData({});
    setCreateClicked(false);
    dispatch(formModalAction.hideModal());
  };

  let message;
  if (accountsLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }
  if (accountsError) {
    message = <p className={styles.error}>{accountsError}</p>;
  }

  if (!accountsLoading && !accountsError && accountData) {
    message = (
      <Table
        header={header}
        body={accountData}
        editable={true}
        onEdit={editRowHandler}
        toDelete={true}
        onDelete={deleteRowHandler}
      />
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

  return (
    <React.Fragment>
      {formModalStatus && (
        <FormModal onBackdropClick={backdropClick}>
          {Object.keys(editFormData).length > 0 && (
            <UserAccountForm
              data={editFormData}
              header={header}
              onCancel={backdropClick}
              onSave={accountSaveHandler}
              loading={accountChanging}
              error={accountChangeError}
            />
          )}
          {Object.keys(deleteAccount).length > 0 && (
            <DeleteForm
              account={deleteAccount}
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
      <Container className={styles.container}>{message}</Container>
    </React.Fragment>
  );
};

export default ManageAccounts;

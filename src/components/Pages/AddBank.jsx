import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Table from "../UI/Table/Table";
import FormModal from "../UI/Modal/FormModal";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { banksAction } from "../../store/banks-slice";
import { formModalAction } from "../../store/formmodal-slice";
import apiURL from "../../endpoint";
import { Tooltip } from "@mui/material";
import CreateCopyBankForm from "../Forms/CreateCopyBankForm";

const header = [
  { name: "Bank Name", tech_name: "bank_name" },
  { name: "Balance (col)", tech_name: "bal_col" },
  { name: "Cheque No. (col)", tech_name: "chq_no_col" },
  { name: "Credit Amount (col)", tech_name: "crdt_amt_col" },
  { name: "Date Format", tech_name: "date_format" },
  { name: "Start row", tech_name: "start_row" },
  { name: "Transaction Date (col)", tech_name: "txn_date_col" },
  { name: "Transaction Remark (col)", tech_name: "txn_rmrk_col" },
  { name: "Value Date (col)", tech_name: "val_date_col" },
  { name: "Withdrawal Amount (col)", tech_name: "with_amt_col" },
];

const AddBank = (props) => {
  const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  const [dateFormats, setDateFormats] = useState([]);
  const [addBankClicked, setAddBankClicked] = useState(false);
  const [editBankData, setEditBankData] = useState({});
  const [copyBankData, setCopyBankData] = useState({});
  const [deleteBankData, setDeleteBankDate] = useState({});
  const [firstMount, setFirstMount] = useState(0);

  const disptach = useDispatch();

  const processBankDetails = useCallback((rawdata) => {
    setFirstMount(1);
    const processedData = [];
    for (let key in rawdata) {
      const row = {};
      row["bal_col"] = rawdata[key].bal_col;
      row["id"] = rawdata[key].bank_id;
      row.bank_name = rawdata[key].bank_name;
      row.chq_no_col = rawdata[key].chq_no_col;
      row.crdt_amt_col = rawdata[key].crdt_amt_col;
      row.start_row = rawdata[key].start_row;
      row.txn_date_col = rawdata[key].txn_date_col;
      row.txn_rmrk_col = rawdata[key].txn_rmrk_col;
      row.val_date_col = rawdata[key].val_date_col;
      row.with_amt_col = rawdata[key].with_amt_col;
      row.date_format = rawdata[key].date.date_format;
      row.date_format_id = rawdata[key].date.date_id;
      processedData.push(row);
    }
    disptach(banksAction.setBanks({ banks: processedData }));
  }, []);

  const processDateFormats = useCallback((rawdata) => {
    let processedData = [];
    for (let key in rawdata) {
      const date = {};
      date.id = rawdata[key].date_id;
      date.date_format = rawdata[key].date_format;
      date.desc = rawdata[key].desc;
      processedData.push(date);
    }
    setDateFormats(processedData);
  }, []);

  const {
    isloading: banksLoading,
    error: banksError,
    sendRequest: getBankDetails,
  } = useHttp(processBankDetails);

  const { sendRequest: loadDateFormats } = useHttp(processDateFormats);

  useEffect(() => {
    // if (!bankData || bankData.length === 0) {
    if (bankData.length === 0 && firstMount === 0) {
      const bankConfig = {
        url: apiURL + "/banks",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      getBankDetails(bankConfig);
    }
    if (dateFormats.length === 0) {
      const datesConfig = {
        url: apiURL + "/dateformats",
      };

      loadDateFormats(datesConfig);
    }
  }, [getBankDetails, authToken, apiURL, firstMount, bankData]);

  const hideModalHandler = () => {
    setAddBankClicked(false);
    setEditBankData({});
    setCopyBankData({});
    setDeleteBankDate({});
    resetBankError();
    resetEditBankError();
    disptach(formModalAction.hideModal());
  };

  const refreshBankData = useCallback(() => {
    const bankConfig = {
      url: apiURL + "/banks",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    getBankDetails(bankConfig);
    hideModalHandler();
  }, [getBankDetails]);

  const addBankClickHandler = () => {
    disptach(formModalAction.showModal());
    setAddBankClicked(true);
  };

  const editBankClickHandler = (row) => {
    setEditBankData(row);
    disptach(formModalAction.showModal());
  };

  const copyBankClickHandler = (row) => {
    setCopyBankData(row);
    disptach(formModalAction.showModal());
  };

  const deleteBankHandler = (row) => {
    setDeleteBankDate(row);
    disptach(formModalAction.showModal());
  };

  let message;

  if (!banksError && !banksLoading && bankData) {
    message = (
      <Table
        header={header}
        body={bankData}
        editable={true}
        onEdit={editBankClickHandler}
        copy={true}
        onCopy={copyBankClickHandler}
      />
    );
  }
  if (banksLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }

  if (banksError) {
    message = <p className={styles.error}>{banksError}</p>;
  }

  const {
    isloading: newBankLoading,
    error: newBankError,
    sendRequest: createBank,
    resetError: resetBankError,
  } = useHttp(refreshBankData);

  const {
    isloading: editBankLoading,
    error: editBankError,
    sendRequest: editBank,
    resetError: resetEditBankError,
  } = useHttp(refreshBankData);

  const createNewBankHandler = (bankData) => {
    const { id: bankId, ...requestBody } = bankData;
    const bankConfig = {
      url: apiURL + "/banks",
      method: "POST",
      body: requestBody,
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    createBank(bankConfig);
  };

  const editBankSaveHandler = (bankData) => {
    const { id: bankId, ...rest } = bankData;
    const editBankConfig = {
      url: apiURL + "/banks/" + bankId,
      method: "PUT",
      body: rest,
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    editBank(editBankConfig);
  };

  return (
    <React.Fragment>
      {modalStatus && (
        <FormModal
          onBackdropClick={hideModalHandler}
          className={styles.modalsize}
        >
          {addBankClicked && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              onSave={createNewBankHandler}
              loading={newBankLoading}
              error={newBankError}
              dateformats={dateFormats}
              resetError={resetBankError}
              creating
            />
          )}
          {Object.keys(editBankData).length > 0 && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              dateformats={dateFormats}
              loading={editBankLoading}
              error={editBankError}
              payload={editBankData}
              resetError={resetEditBankError}
              onSave={editBankSaveHandler}
              editing
            />
          )}
          {Object.keys(copyBankData).length > 0 && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              onSave={createNewBankHandler}
              dateformats={dateFormats}
              payload={copyBankData}
              loading={newBankLoading}
              error={newBankError}
              resetError={resetBankError}
              copying
            />
          )}
        </FormModal>
      )}
      <Header>
        Bank Details
        <Tooltip title="Add New Bank" placement="top-start" arrow>
          <IconButton
            color="primary"
            aria-label="add"
            onClick={addBankClickHandler}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Header>
      <Container className={styles.container}>{message}</Container>
    </React.Fragment>
  );
};

export default AddBank;

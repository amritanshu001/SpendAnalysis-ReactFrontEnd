import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import FormModal from "../UI/Modal/FormModal";
import { RowCopyIcon, RowEditIcon } from "../UI/MUI Grid/DisplayGrid";
import DisplayGrid from "../UI/MUI Grid/DisplayGrid";

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

let bankFormData = {};

const AddBank = (props) => {
  const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  const [dateFormats, setDateFormats] = useState([]);
  const [addBankClicked, setAddBankClicked] = useState(false);
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
    bankFormData = {};
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

  const editBankClickHandler = (params) => {
    const clickHandler = () => {
      bankFormData = { action: "Edit", data: { ...params.row } };
      disptach(formModalAction.showModal());
    };
    return <RowEditIcon onClick={clickHandler} />;
  };

  const copyBankClickHandler = (params) => {
    const clickHandler = () => {
      bankFormData = { action: "Copy", data: { ...params.row } };
      disptach(formModalAction.showModal());
    };
    return <RowCopyIcon onClick={clickHandler} />;
  };

  const txnCols = [
    {
      headerName: "Bank Name",
      field: "bank_name",
      flex: 1,
      minWidth: 100,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Balance (col)",
      field: "bal_col",
      minWidth: 100,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Cheque No. (col)",
      field: "chq_no_col",
      minWidth: 100,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Credit Amount (col)",
      field: "crdt_amt_col",
      minWidth: 100,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },

    {
      headerName: "Date Format",
      field: "date_format",
      minWidth: 125,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Start row",
      field: "start_row",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Transaction Date (col)",
      field: "txn_date_col",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Transaction Remark (col)",
      field: "txn_rmrk_col",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Value Date (col)",
      field: "val_date_col",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Withdrawal Amount (col)",
      field: "with_amt_col",
      minWidth: 75,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Copy",
      field: "copy",
      minWidth: 100,
      flex: 1,
      renderCell: copyBankClickHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Edit",
      field: "edit",
      minWidth: 75,
      flex: 1,
      renderCell: editBankClickHandler,
      valueGetter: (params) => {
        return params;
      },
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
  ];

  let message;
  if (!banksError && !banksLoading && bankData) {
    message = (
      <Container className={styles.container}>
        <DisplayGrid rows={bankData} columns={txnCols} boxWidth="95%" />
      </Container>
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

  let showEditForm =
    !!bankFormData &&
    Object.keys(bankFormData).length > 0 &&
    bankFormData.action === "Edit";
  let showCopyForm =
    !!bankFormData &&
    Object.keys(bankFormData).length > 0 &&
    bankFormData.action === "Copy";

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
          {showEditForm && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              dateformats={dateFormats}
              loading={editBankLoading}
              error={editBankError}
              payload={bankFormData.data}
              resetError={resetEditBankError}
              onSave={editBankSaveHandler}
              editing
            />
          )}
          {showCopyForm && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              onSave={createNewBankHandler}
              dateformats={dateFormats}
              payload={bankFormData.data}
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
      {message}
    </React.Fragment>
  );
};

export default AddBank;

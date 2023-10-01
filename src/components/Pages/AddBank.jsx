import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
// import FormModal from "../UI/Modal/FormModal";
import { RowCopyIcon, RowEditIcon } from "../UI/MUI Grid/DisplayGrid";
import DisplayGrid from "../UI/MUI Grid/DisplayGrid";

import { useFetchBanks } from "../../hooks/useTanstackQueryFetch";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { banksAction } from "../../store/banks-slice";
import { formModalAction } from "../../store/formmodal-slice";
const apiURL = import.meta.env.VITE_API_URL;
import { Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import CreateBankForm from "../Forms/BankForms/CreateBankForm";
import EditBankForm from "../Forms/BankForms/EditBankForm";
import CopyBankForm from "../Forms/BankForms/CopyBankForm";
import { convert2BankFormat } from "../../lib/server-communication";

let bankFormData = {};

const AddBank = (props) => {
  const location = useLocation();
  // const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const [bankAction, setBankAction] = useState(null);

  const disptach = useDispatch();
  const {
    data: bankFetchData,
    error: bankfetchError,
    isLoading: bankFetchLoading,
    isError: isBankFetchError,
    isSuccess,
  } = useFetchBanks(authToken);

  if (isSuccess) {
    disptach(
      banksAction.setBanks({ banks: convert2BankFormat(bankFetchData) })
    );
  }

  const hideModalHandler = () => {
    setBankAction(null);
    bankFormData = {};
    disptach(formModalAction.hideModal());
  };

  const addBankClickHandler = () => {
    setBankAction("Create");
    disptach(formModalAction.showModal());
  };

  const editBankClickHandler = (params) => {
    const clickHandler = () => {
      bankFormData = { action: "Edit", data: { ...params.row } };
      setBankAction("Edit");
      disptach(formModalAction.showModal());
    };
    return <RowEditIcon onClick={clickHandler} />;
  };

  const copyBankClickHandler = (params) => {
    const clickHandler = () => {
      bankFormData = { action: "Copy", data: { ...params.row } };
      console.log(bankFormData.data);
      setBankAction("Copy");
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
  if (bankFetchData) {
    message = (
      <Container className={styles.container}>
        <DisplayGrid
          rows={convert2BankFormat(bankFetchData)}
          columns={txnCols}
          boxWidth="95%"
        />
      </Container>
    );
  }
  if (bankFetchLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }

  if (isBankFetchError) {
    message = (
      <p className={styles.error}>
        {bankfetchError.status + ":" + bankfetchError.message}
      </p>
    );
  }

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      {bankAction === "Create" && (
        <CreateBankForm hideModalHandler={hideModalHandler} />
      )}
      {bankAction === "Edit" && (
        <EditBankForm
          hideModalHandler={hideModalHandler}
          editFormData={bankFormData}
        />
      )}
      {bankAction === "Copy" && (
        <CopyBankForm
          hideModalHandler={hideModalHandler}
          copyFormData={bankFormData}
        />
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

import styles from "./AddBank.module.css";

import Container from "../../UI/Container";
import Header from "../../UI/Header";
// import FormModal from "../UI/Modal/FormModal";
import { RowCopyIcon, RowEditIcon } from "../../UI/MUI Grid/DisplayGrid";
import DisplayGrid from "../../UI/MUI Grid/DisplayGrid";

import { useFetchBanks } from "../../../hooks/useTanstackQueryFetch";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SpinnerCircular from "../../UI/Feedback/SpinnerCircular";

import { banksAction } from "../../../store/banks-slice";
import { formModalAction } from "../../../store/formmodal-slice";
const apiURL = import.meta.env.VITE_API_URL;
import { useLocation } from "react-router-dom";
import HeadMetaData from "../../UI/HeadMetadata/HeadMetaData";

import CreateBankForm from "../../Forms/BankForms/CreateBankForm";
import EditBankForm from "../../Forms/BankForms/EditBankForm";
import CopyBankForm from "../../Forms/BankForms/CopyBankForm";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedIconButton = motion(IconButton);

let bankFormData = {};

const AddBank = (props) => {
  const location = useLocation();
  // const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  const [bankAction, setBankAction] = useState(null);

  const disptach = useDispatch();
  const {
    data: bankFetchData,
    error: bankfetchError,
    isLoading: bankFetchLoading,
    isError: isBankFetchError,
    isSuccess,
  } = useFetchBanks(authToken);

  useEffect(() => {
    if (isSuccess) {
      disptach(banksAction.setBanks({ banks: bankFetchData }));
    }
  }, [isSuccess, bankFetchData, banksAction.setBanks]);

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
    return (
      <RowEditIcon
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    );
  };

  const copyBankClickHandler = (params) => {
    const clickHandler = () => {
      bankFormData = { action: "Copy", data: { ...params.row } };
      setBankAction("Copy");
      disptach(formModalAction.showModal());
    };
    return (
      <RowCopyIcon
        onClick={clickHandler}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    );
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

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <AnimatePresence>
        {bankAction === "Create" && modalStatus && (
          <CreateBankForm key="create" hideModalHandler={hideModalHandler} />
        )}
        {bankAction === "Edit" && modalStatus && (
          <EditBankForm
            key="edit"
            hideModalHandler={hideModalHandler}
            editFormData={bankFormData}
          />
        )}
        {bankAction === "Copy" && modalStatus && (
          <CopyBankForm
            key="copy"
            hideModalHandler={hideModalHandler}
            copyFormData={bankFormData}
          />
        )}
      </AnimatePresence>
      <Header>
        Bank Details
        <Tooltip title="Add New Bank" placement="top-start" arrow>
          <AnimatedIconButton
            color="primary"
            aria-label="add"
            onClick={addBankClickHandler}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <AddIcon />
          </AnimatedIconButton>
        </Tooltip>
      </Header>
      <AnimatePresence>
        {bankFetchLoading && <SpinnerCircular />}
        {isBankFetchError && (
          <p className={styles.error}>
            {bankfetchError.status + ":" + bankfetchError.message}
          </p>
        )}
        {isSuccess && (
          <DisplayGrid
            rows={bankFetchData}
            columns={txnCols}
            boxWidth="95%"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0.25, y: 100 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default AddBank;

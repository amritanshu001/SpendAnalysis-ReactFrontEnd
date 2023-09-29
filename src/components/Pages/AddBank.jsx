import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import FormModal from "../UI/Modal/FormModal";
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
import CreateCopyBankForm from "../Forms/CreateCopyBankForm";
import { useLocation } from "react-router-dom";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  sendMutationRequest,
  sendQueryRequest,
  queryClient,
} from "../../lib/endpoint-configs";
import {
  convert2DateFormat,
  convert2BankFormat,
} from "../../lib/server-communication";

let bankFormData = {};

const AddBank = (props) => {
  const location = useLocation();
  const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  const [addBankClicked, setAddBankClicked] = useState(false);

  const disptach = useDispatch();

  const { data: dateFormatData } = useQuery({
    queryKey: ["dateformats"],
    queryFn: ({ signal }) => {
      const datesConfig = {
        url: apiURL + "/dateformats",
      };
      return sendQueryRequest({ signal, requestConfig: datesConfig });
    },
    refetchInterval: (data) => {
      return data ? 300000 : 1;
    },
    staleTime: 300000,
  });

  const {
    data: bankFetchData,
    error: bankfetchError,
    isLoading: bankFetchLoading,
    isError: isBankFetchError,
  } = useFetchBanks(authToken);

  if (!bankData) {
    disptach(
      banksAction.setBanks({ banks: convert2BankFormat(bankFetchData) })
    );
  }

  const dateFormats = convert2DateFormat(dateFormatData);

  const {
    mutate: createNewBank,
    isPending: isCreateBankPending,
    isError: isCreateBankError,
    error: createBankError,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      hideModalHandler();
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  const {
    mutate: editOldBank,
    isPending: isEditBankPending,
    isError: isEditBankError,
    error: editOldBankError,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      hideModalHandler();
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  const hideModalHandler = () => {
    setAddBankClicked(false);
    bankFormData = {};
    disptach(formModalAction.hideModal());
  };

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

  // const {
  //   isloading: newBankLoading,
  //   error: newBankError,
  //   sendRequest: createBank,
  //   resetError: resetBankError,
  // } = useHttp(refreshBankData);

  // const {
  //   isloading: editBankLoading,
  //   error: editBankError,
  //   sendRequest: editBank,
  //   resetError: resetEditBankError,
  // } = useHttp(refreshBankData);

  const createNewBankHandler = (bankData) => {
    const { id: bankId, ...requestBody } = bankData;
    const bankConfig = {
      url: apiURL + "/banks",
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    createNewBank({ requestConfig: bankConfig });
  };

  const editBankSaveHandler = (bankData) => {
    const { id: bankId, ...rest } = bankData;
    const editBankConfig = {
      url: apiURL + "/banks/" + bankId,
      method: "PUT",
      body: JSON.stringify(rest),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    editOldBank({ requestConfig: editBankConfig });
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
      <HeadMetaData pathname={location.pathname} />
      {modalStatus && (
        <FormModal
          onBackdropClick={hideModalHandler}
          className={styles.modalsize}
        >
          {addBankClicked && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              onSave={createNewBankHandler}
              loading={isCreateBankPending}
              error={createBankError}
              isError={isCreateBankError}
              dateformats={dateFormats}
              creating
            />
          )}
          {showEditForm && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              dateformats={dateFormats}
              loading={isEditBankPending}
              error={editOldBankError}
              isError={isEditBankError}
              payload={bankFormData.data}
              onSave={editBankSaveHandler}
              editing
            />
          )}
          {showCopyForm && (
            <CreateCopyBankForm
              onCancel={hideModalHandler}
              onSave={createNewBankHandler}
              dateformats={dateFormats}
              loading={isCreateBankPending}
              error={createBankError}
              isError={isCreateBankError}
              payload={bankFormData.data}
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

import React, { useState } from "react";
import { useFetchDates } from "../../../hooks/useTanstackQueryFetch";
import DisplayGrid from "../../UI/MUI Grid/DisplayGrid";
import HeadMetaData from "../../UI/HeadMetadata/HeadMetaData";
import Header from "../../UI/Header";
import SpinnerCircular from "../../UI/Feedback/SpinnerCircular";
import CreateDateFormatForm from "../../Forms/Dateformats/CreateDateFormatForm";

import { formModalAction } from "../../../store/formmodal-slice";

import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

const AnimatedIconButton = motion(IconButton);

const ManageDates = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.formModal.showModal);
  const {
    data: dateformats,
    isPending: dateFormatsLoading,
    isSuccess: datesLoadSuccess,
    isError: isDatesLoadError,
    error: datesLoadError,
  } = useFetchDates();
  const [dateAction, setDateAction] = useState({});

  const addNewDateFormatHandler = () => {
    setDateAction({ action: "Create" });
    dispatch(formModalAction.showModal());
  };

  const hideModalHandler = () => {
    setDateAction({});
    dispatch(formModalAction.hideModal());
  };

  const txnCols = [
    {
      headerName: "Date Format",
      field: "date_format",
      flex: 1,
      minWidth: 100,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Description",
      field: "desc",
      minWidth: 700,
      flex: 1,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Technical Format",
      field: "py_date",
      width: 400,
      headerClassName: "table__header",
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <>
      <HeadMetaData pathname={location.pathname} />
      <Header>
        Manage Date Formats
        <Tooltip title="Add New Bank" placement="top-start" arrow>
          <AnimatedIconButton
            color="primary"
            aria-label="add"
            onClick={addNewDateFormatHandler}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <AddIcon />
          </AnimatedIconButton>
        </Tooltip>
      </Header>
      <AnimatePresence>
        {modalStatus && dateAction.action === "Create" && (
          <CreateDateFormatForm onCancel={hideModalHandler} key="modal" />
        )}

        {dateFormatsLoading && <SpinnerCircular key="waiting" />}
        {isDatesLoadError && (
          <motion.p className="error" key="error">
            {datesLoadError.status + ":" + datesLoadError.message}
          </motion.p>
        )}
        {datesLoadSuccess && (
          <DisplayGrid
            key="datagrid"
            rows={dateformats}
            columns={txnCols}
            boxWidth="95%"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0.25, y: 100 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ManageDates;

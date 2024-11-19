import React from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Dialog } from "@mui/material";

const AnimatedDilog = motion(Dialog);

const FormModal = (props) => {
  const modalStatus = useSelector((state) => state.formModal.showModal);
  return (
    <AnimatedDilog
      open={modalStatus}
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -300, transition: { duration: 0.3 } }}
      key="modal-div"
      onClose={props.onBackdropClick}
      sx={{
        ...props.sx,
        backdropFilter: "blur(5px)",
        "& .MuiPaper-root": {
          width: "80%",
        },
      }}
    >
      {props.children}
    </AnimatedDilog>
  );
};

export default FormModal;

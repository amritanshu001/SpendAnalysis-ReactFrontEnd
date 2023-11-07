import Backdrop from "../Backdrop";
import React from "react";
import styles from "./FormModal.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const FormModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onBackdropClick}></Backdrop>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <motion.div
          initial={{ opacity: 0, y: -300 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -300 }}
          key="modal-div"
          className={`${props.className} ${styles.modal}`}
        >
          {props.children}
        </motion.div>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
};

export default FormModal;

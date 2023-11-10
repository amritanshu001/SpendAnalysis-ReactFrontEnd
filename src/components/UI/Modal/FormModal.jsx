import Backdrop from "../Backdrop";
import React from "react";
import styles from "./FormModal.module.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const FormModal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop key="backdrop" onClick={props.onBackdropClick}></Backdrop>
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -300, transition: { duration: 0.3 } }}
        key="modal-div"
        className={`${props.className} ${styles.modal}`}
      >
        {props.children}
      </motion.div>
    </>,
    document.getElementById("modal")
  );
};

export default FormModal;

import Backdrop from "../Backdrop";
import React from "react";
import styles from "./FormModal.module.css";
import { formModalAction } from "../../../store/formmodal-slice";
import ReactDOM from "react-dom";

import { useDispatch } from "react-redux";

const FormModal = (props) => {
  const dispatch = useDispatch();

  const backdropHideHandler = () => {
    dispatch(formModalAction.hideModal());
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={backdropHideHandler}></Backdrop>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>{props.children}</div>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
};

export default FormModal;

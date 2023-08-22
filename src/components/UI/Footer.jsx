import React from "react";
import styles from "./Footer.module.css";

import Alert from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { messageAction } from "../../store/message-slice";

const Footer = (props) => {
  const dispatch = useDispatch();
  const alertClose = () => {
    dispatch(messageAction.hideMessages());
  };
  return (
    <div className={styles.footer}>
      <Alert severity={props.message.status} onClose={alertClose}>
        {props.message.messageText}
      </Alert>
    </div>
  );
};

export default Footer;

import React, { forwardRef } from "react";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";

import Alert from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { messageAction } from "../../store/message-slice";

const Footer = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const alertClose = () => {
    dispatch(messageAction.hideMessages());
  };
  return (
    <motion.div
      className={styles.footer}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      ref={ref}
    >
      <Alert severity={props.message.status} onClose={alertClose}>
        {props.message.messageText}
      </Alert>
    </motion.div>
  );
});

export default Footer;

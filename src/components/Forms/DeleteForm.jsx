import React from "react";
import styles from "./DeleteForm.module.css";

const DeleteForm = (props) => {
  const deleteFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.account.id);
  };

  return (
    <form onSubmit={deleteFormSubmitHandler} className={styles.form}>
      <div>
        <p>Account# {props.account.account_no} will be deleted!</p>
        <p className={styles.message}> Do you want to proceed?</p>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles["imp-button"]}>
          {props.loading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    </form>
  );
};

export default DeleteForm;

import React, { useState, useRef } from "react";
import styles from "./UserAccountForm.module.css";

const UserAccountForm = ({ data, loading, error, onSave, onCancel }) => {
  const [accountJoint, setAccountJoint] = useState(data.joint);

  const jointChangeHandler = (event) => {
    setAccountJoint(event.target.checked);
  };

  const accountEditHandler = (event) => {
    event.preventDefault();
    onSave(data.id, accountJoint);
  };

  return (
    <form className={styles.form} onSubmit={accountEditHandler}>
      <div className={styles.inputs}>
        <div className={styles.readonly}>
          <label htmlFor="account_no">Account#</label>
          <input id="account_no" readOnly={true} value={data.account_no} />
        </div>
        <div className={styles.readonly}>
          <label htmlFor="bank_name">Bank Name</label>
          <input id="bank_name" readOnly={true} value={data.bank_name} />
        </div>
      </div>
      <div className={styles.checkbox}>
        <div>
          <input
            type="checkbox"
            defaultChecked={data.active}
            disabled={true}
          ></input>
          <label>Active</label>
        </div>
        <div onClick={jointChangeHandler}>
          <input
            type="checkbox"
            checked={accountJoint}
            onChange={jointChangeHandler}
          ></input>
          <label>Joint</label>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{loading ? "Saving..." : "Save Changes"}</button>
      </div>
      {error && <p>{props.error}</p>}
    </form>
  );
};

export default UserAccountForm;

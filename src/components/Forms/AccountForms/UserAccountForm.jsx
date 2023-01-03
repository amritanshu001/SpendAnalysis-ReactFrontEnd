import React, { useState, useRef } from "react";
import styles from "./UserAccountForm.module.css";

const UserAccountForm = ({
  data,
  header,
  loading,
  error,
  onSave,
  onCancel,
}) => {
  const [accountNo, setAccountNo] = useState(data.account_no);
  const [bankName, setBankName] = useState(data.bank_name);
  const [accountActive, setAccountActive] = useState(
    data.active === "Yes" ? true : false
  );
  const [accountJoint, setAccountJoint] = useState(
    data.joint === "Yes" ? true : false
  );

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
          <input id="account_no" readOnly={true} value={accountNo} />
        </div>
        <div className={styles.readonly}>
          <label htmlFor="bank_name">Bank Name</label>
          <input id="bank_name" readOnly={true} value={bankName} />
        </div>
      </div>
      <div className={styles.checkbox}>
        <div>
          <input
            type="checkbox"
            defaultChecked={accountActive}
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

import React, { useState, useRef } from "react";
import styles from "./UserAccountForm.module.css";
import { useDispatch } from "react-redux";
import { formModalAction } from "../../store/formmodal-slice";

const UserAccountForm = ({ data, header }) => {
  const [accountNo, setAccountNo] = useState(data.account_no);
  const [bankName, setBankName] = useState(data.bank_name);
  const [accountActive, setAccountActive] = useState(
    data.active === "Yes" ? true : false
  );
  const [accountJoint, setAccountJoint] = useState(
    data.joint === "Yes" ? true : false
  );

  const dispatch = useDispatch();

  const activeChangeHandler = (event) => {
    setAccountActive(event.target.checked);
  };

  const jointChangeHandler = (event) => {
    setAccountJoint(event.target.checked);
  };

  const cancelHandler = () => {
    dispatch(formModalAction.hideModal());
  };

  const accountEditHandler = (event) => {
    event.preventDefault();
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
            checked={accountActive}
            onChange={activeChangeHandler}
          ></input>
          <label>Active</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={accountJoint}
            onChange={jointChangeHandler}
          ></input>
          <label>Joint</label>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default UserAccountForm;

import React, { useState } from "react";
import styles from "./CreateCopyBankForm.module.css";
import Input from "../UI/Input";

import useInputValidator from "../../hooks/useInputValidator";
import { isFieldBlank, isNumber } from "../../lib/validators";

const CreateCopyBankForm = (props) => {
  const {
    inputValue: bankName,
    inputIsValid: bankNameValid,
    error: bankNameError,
    inputBlurHandler: bankNameBlurHandler,
    inputChangeHandler: bankNameChangeHandler,
    resetInput: resetBankName,
  } = useInputValidator(isFieldBlank);

  const [dateFormat, setDateFormat] = useState(0);

  let buttonProcessing;
  let buttonProcessed;
  console.log(Object.keys(props));
  if ("creating" in props) {
    buttonProcessing = "Creating...";
    buttonProcessed = "Create Bank";
  }

  if ("editing" in props) {
    buttonProcessing = "Changing...";
    buttonProcessed = "Change Bank";
  }

  if ("copying" in props) {
    buttonProcessing = "Copying...";
    buttonProcessed = "Copy & Create Bank";
  }

  return (
    <form className={styles.form}>
      <div className={styles.readonly}>
        <Input
          type="text"
          name="Bankname"
          id="bankname"
          value={bankName}
          onBlur={bankNameBlurHandler}
          onChange={bankNameChangeHandler}
        >
          Bank Name
        </Input>
      </div>
      <div></div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">
          {props.loading ? buttonProcessing : buttonProcessed}
        </button>
      </div>
      {props.error && <p>{props.error}</p>}
    </form>
  );
};

export default CreateCopyBankForm;

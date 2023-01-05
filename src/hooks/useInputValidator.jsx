import { useState } from "react";

const useInputValidator = (inputValidator, initial_value = "") => {
  const [value, setValue] = useState(initial_value);
  const [isTouched, setIsTouched] = useState(false);

  const resetInput = () => {
    setValue(initial_value);
    setIsTouched(false);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setValue(event.target.value);
  };

  const removeInput = () => {
    setValue("");
    setIsTouched(false);
  };

  let inputIsValid = inputValidator(value);
  let isError = isTouched && !inputIsValid;

  return {
    inputValue: value,
    inputIsValid,
    isError,
    inputBlurHandler,
    inputChangeHandler,
    resetInput,
    removeInput,
  };
};

export default useInputValidator;

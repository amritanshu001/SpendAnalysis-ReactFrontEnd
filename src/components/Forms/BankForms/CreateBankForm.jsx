import React from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";

const CreateBankForm = (props) => {
  const {
    mutate: createNewBank,
    isPending,
    isError,
    error,
  } = useMutation({ mutationFn: sendMutationRequest });

  const createNewBankHandler = (bankData) => {
    const { id: bankId, ...requestBody } = bankData;
    const bankConfig = {
      url: apiURL + "/banks",
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    createNewBank({ requestConfig: bankConfig });
  };

  return <div>CreateBankForm</div>;
};

export default CreateBankForm;

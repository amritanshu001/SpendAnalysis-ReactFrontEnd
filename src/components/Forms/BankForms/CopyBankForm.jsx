import React from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useSelector } from "react-redux";
import FormModal from "../../UI/Modal/FormModal";
import CreateCopyBankForm from "../CreateCopyBankForm";
import { useFetchDates } from "../../../hooks/useTanstackQueryFetch";
import { queryClient } from "../../../lib/endpoint-configs";
import { convert2DateFormat } from "../../../lib/server-communication";

const apiURL = import.meta.env.VITE_API_URL;

const CopyBankForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  //   const dispatch = useDispatch()
  const { data: dateFormats } = useFetchDates();

  const {
    mutate: createNewBank,
    isPending: isCreateBankPending,
    isError: isCreateBankError,
    error: createBankError,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      props.hideModalHandler();
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

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

  return (
    <>
      {modalStatus && (
        <FormModal onBackdropClick={props.hideModalHandler}>
          <CreateCopyBankForm
            onCancel={props.hideModalHandler}
            onSave={createNewBankHandler}
            dateformats={convert2DateFormat(dateFormats)}
            loading={isCreateBankPending}
            error={createBankError}
            isError={isCreateBankError}
            payload={props.copyFormData.data}
            copying
          />
        </FormModal>
      )}
    </>
  );
};

export default CopyBankForm;

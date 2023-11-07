import React from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useSelector } from "react-redux";
import FormModal from "../../UI/Modal/FormModal";
import CreateCopyBankForm from "../CreateCopyBankForm";
import { useFetchDates } from "../../../hooks/useTanstackQueryFetch";
import { queryClient } from "../../../lib/endpoint-configs";
import { convert2DateFormat } from "../../../lib/server-communication";
import { AnimatePresence } from "framer-motion";

const apiURL = import.meta.env.VITE_API_URL;

const CreateBankForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const modalStatus = useSelector((state) => state.formModal.showModal);
  //   const dispatch = useDispatch();
  const {
    mutate: createNewBank,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      props.hideModalHandler();
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });

  //   const { data: dateFormats } = useFetchDates();

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
    <AnimatePresence>
      {modalStatus && (
        <FormModal onBackdropClick={props.hideModalHandler}>
          <CreateCopyBankForm
            onCancel={props.hideModalHandler}
            onSave={createNewBankHandler}
            loading={isPending}
            error={error}
            isError={isError}
            // dateformats={dateFormats}
            creating
          />
        </FormModal>
      )}
    </AnimatePresence>
  );
};

export default CreateBankForm;

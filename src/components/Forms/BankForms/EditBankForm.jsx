import React from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useSelector } from "react-redux";
import FormModal from "../../UI/Modal/FormModal";
import CreateCopyBankForm from "../CreateCopyBankForm";
import { queryClient } from "../../../lib/endpoint-configs";

const apiURL = import.meta.env.VITE_API_URL;

const EditBankForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);

  const {
    mutate: editOldBank,
    isPending: isEditBankPending,
    isError: isEditBankError,
    error: editOldBankError,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      props.hideModalHandler();
      queryClient.invalidateQueries({ queryKey: ["banks", authToken] });
    },
  });

  const editBankSaveHandler = (bankData) => {
    const { id: bankId, ...rest } = bankData;
    const editBankConfig = {
      url: apiURL + "/banks/" + bankId,
      method: "PUT",
      body: JSON.stringify(rest),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    editOldBank({ requestConfig: editBankConfig });
  };

  return (
    <FormModal onBackdropClick={props.hideModalHandler}>
      <CreateCopyBankForm
        onCancel={props.hideModalHandler}
        loading={isEditBankPending}
        error={editOldBankError}
        isError={isEditBankError}
        payload={props.editFormData.data}
        onSave={editBankSaveHandler}
        editing
      />
    </FormModal>
  );
};

export default EditBankForm;

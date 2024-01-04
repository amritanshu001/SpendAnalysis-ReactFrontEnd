import React from "react";
import DisplayGrid from "../../UI/MUI Grid/DisplayGrid";
import { RowDeleteIcon } from "../../UI/MUI Grid/DisplayGrid";
import { useFetchInactiveAccounts } from "../../../hooks/useTanstackQueryFetch";
import { useSelector } from "react-redux";

const AdminAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    data: inactiveAccounts,
    isLoading: accountsLoading,
    isSuccess: accountsLoadSuccess,
    isError: accountsLoadError,
  } = useFetchInactiveAccounts(authToken);

  console.log("From API, Inactive Accounts", inactiveAccounts);
  return <div>AdminAccounts</div>;
};

export default AdminAccounts;

const serverResponse = async (configData) => {
    try {
        const response = await fetch(configData.url, {
            method: configData.method,
            headers: configData.headers,
            body: JSON.stringify(configData.body),
          })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || errorData.msg);
        }
        return response.json()
    } catch (err) {
        throw err
    }
}

export default serverResponse

export const convert2BankFormat = (bankData) =>{
    const processedBankData = [];
    for (let key in bankData) {
        const row = {};
        row["bal_col"] = bankData[key].bal_col;
        row["id"] = bankData[key].bank_id;
        row.bank_name = bankData[key].bank_name;
        row.chq_no_col = bankData[key].chq_no_col;
        row.crdt_amt_col = bankData[key].crdt_amt_col;
        row.start_row = bankData[key].start_row;
        row.txn_date_col = bankData[key].txn_date_col;
        row.txn_rmrk_col = bankData[key].txn_rmrk_col;
        row.val_date_col = bankData[key].val_date_col;
        row.with_amt_col = bankData[key].with_amt_col;
        row.date_format = bankData[key].date.date_format;
        row.date_id = bankData[key].date.date_id
        processedBankData.push(row);
      }
    return processedBankData
}

export const convert2AccountFormat = (accountData) => {
    const processedAccountData = [];
    for (let key in accountData) {
      const row = {};
      row["id"] = accountData[key].account_id;
      row.account_no = accountData[key].account_no;
      row.active = accountData[key].active;
      row.joint = accountData[key].joint;
      row.bank_name = accountData[key]["bank_dets"].bank_name;
      processedAccountData.push(row);
    }
    return processedAccountData
}

export const convert2InactiveAccountFormat = (inactiveAccounts) => {
  return inactiveAccounts.map((account)=>{
    return {
      id:account.account_id,
      account_no:account.account_no,
      bank_name : account["bank_dets"].bank_name,
      emails : account.user_emails,
      joint:account.joint,
      created_on: convertDates(account.created_on),
      updated_on: convertDates(account.updated_on)
    }
  })
}

export const convert2DateFormat = (rawdata) => {

    let processedData = [];
    for (let key in rawdata) {
      const date = {};
      date.id = rawdata[key].date_id;
      date.date_format = rawdata[key].date_format;
      date.desc = rawdata[key].desc;
      date.py_date = rawdata[key].py_date
      processedData.push(date);
    }

    return processedData
}

const convertDates = (date) => {
  if (!date) {
    return null
  }
  const convertDate = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return convertDate.toLocaleString(undefined, options);
};

export const convert2TransactionFormat = (rawdata) => {
  const processedData = rawdata.transactions.map((transaction) => {
    return {
      id: transaction.txn_id,
      balance: +transaction.balance,
      cheque_no: transaction.cheque_no,
      deposit_amt:
        +transaction.deposit_amt === 0 ? "" : +transaction.deposit_amt,
      txn_date: convertDates(transaction.txn_date),
      txn_remarks: transaction.txn_remarks,
      value_date: convertDates(transaction.value_date),
      withdrawal_amt:
        +transaction.withdrawal_amt === 0 ? "" : +transaction.withdrawal_amt,
    };
  })
  return processedData
}

export const convert2UsersFormat = (users) => {
  return users.map((user)=>{
    return {
      id:user.user_id,
      userName:user.user_name,
      admin : user.admin,
      email : user.email_id,
      active:user.u_active,
      created_on: convertDates(user.created_on),
      updated_on: convertDates(user.updated_on),
      reset_expiry: convertDates(user.reset_expiry),
      reset_hash: user.reset_hash,
      last_logged_in: convertDates(user.last_logged_in)
    }
  })
}

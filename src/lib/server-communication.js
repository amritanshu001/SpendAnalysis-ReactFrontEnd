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

export const convert2DateFormat = (rawdata) => {

    let processedData = [];
    for (let key in rawdata) {
      const date = {};
      date.id = rawdata[key].date_id;
      date.date_format = rawdata[key].date_format;
      date.desc = rawdata[key].desc;
      processedData.push(date);
    }

    return processedData
}

import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import styles from "./Table.module.css";

const Table = ({ header, body, editable, onEdit }) => {
  return (
    <table className={styles.table}>
      <TableHeader header={header} editable={editable} />
      <TableBody
        header={header}
        body={body}
        editable={editable}
        onEdit={onEdit}
      />
    </table>
  );
};

export default Table;

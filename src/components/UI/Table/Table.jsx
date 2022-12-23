import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import styles from "./Table.module.css";

const Table = ({ header, body }) => {
  return (
    <table className={styles.table}>
      <TableHeader header={header} />
      <TableBody header={header} body={body} />
    </table>
  );
};

export default Table;

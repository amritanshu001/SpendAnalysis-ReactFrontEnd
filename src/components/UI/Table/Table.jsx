import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import styles from "./Table.module.css";

const Table = ({
  header,
  body,
  editable,
  onEdit,
  toDelete,
  onDelete,
  copy,
  onCopy,
}) => {
  return (
    <table className={styles.table}>
      <TableHeader
        header={header}
        editable={editable}
        toDelete={toDelete}
        toCopy={copy}
      />
      <TableBody
        header={header}
        body={body}
        editable={editable}
        onEdit={onEdit}
        toDelete={toDelete}
        onDelete={onDelete}
        toCopy={copy}
        onCopy={onCopy}
      />
    </table>
  );
};

export default Table;

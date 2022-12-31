import React from "react";
import TableRow from "./TableRow";

const TableBody = (props) => {
  const mapRows = (row) => {
    const editHandler = () => {
      props.onEdit(row);
    };
    const deleteHandler = () => {
      props.onDelete(row);
    };
    return (
      <TableRow
        key={row.id}
        row={row}
        header={props.header}
        editable={props.editable}
        onEdit={editHandler}
        toDelete={props.toDelete}
        onDelete={deleteHandler}
      />
    );
  };

  return <tbody>{props.body.map(mapRows)}</tbody>;
};

export default TableBody;

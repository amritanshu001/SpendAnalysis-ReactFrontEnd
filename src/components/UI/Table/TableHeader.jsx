import React from "react";

const TableHeader = (props) => {
  const mapColumns = (cols) => {
    return <th key={cols.tech_name}>{cols.name}</th>;
  };

  return (
    <thead>
      <tr>
        {props.header.map(mapColumns)}
        {props.editable && <th>Edit</th>}
        {props.toDelete && <th>Delete</th>}
        {props.toCopy && <th>Copy</th>}
      </tr>
    </thead>
  );
};

export default TableHeader;

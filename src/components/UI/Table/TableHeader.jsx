import React from "react";

const TableHeader = (props) => {
  const mapColumns = (cols) => {
    return <th key={cols.tech_name}>{cols.name}</th>;
  };

  return <tr>{props.header.map(mapColumns)}</tr>;
};

export default TableHeader;

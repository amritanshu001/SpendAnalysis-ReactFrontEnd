import React from "react";

const TableHeader = (props) => {
  const mapColumns = (cols) => {
    return <th key={cols.tech_name}>{cols.name}</th>;
  };

  return (
    <thead>
      <tr>
        {/* <th></th>
        <th></th> */}
        {props.header.map(mapColumns)}
      </tr>
    </thead>
  );
};

export default TableHeader;

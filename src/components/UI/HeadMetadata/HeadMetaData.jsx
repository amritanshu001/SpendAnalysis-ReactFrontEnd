import React from "react";
import SearchOptimizer from "../../Metadata/SearchOptimizer";
import { higherMetaData as metadata } from "../../../lib/metadata";

const HeadMetaData = (props) => {
  return (
    <SearchOptimizer
      metadata={metadata.find((page) => page.path === props.pathname)}
    />
  );
};

export default HeadMetaData;

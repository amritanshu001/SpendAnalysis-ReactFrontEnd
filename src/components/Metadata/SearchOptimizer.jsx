import React from "react";
import { Helmet } from "react-helmet-async";

const SearchOptimizer = (props) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{props.metadata.title}</title>
      <meta name="description" content={props.metadata.description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={props.metadata.type} />
      <meta property="og:title" content={props.metadata.title} />
      <meta property="og:description" content={props.metadata.description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={props.metadata.name} />
      <meta name="twitter:card" content={props.metadata.type} />
      <meta name="twitter:title" content={props.metadata.title} />
      <meta name="twitter:description" content={props.metadata.description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SearchOptimizer;

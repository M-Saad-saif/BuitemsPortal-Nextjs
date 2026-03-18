import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({width, className=""}) => {
  return (
    <div className={className}>
      <InfinitySpin width={width} color="#1a3c6e" />
    </div>
  );
};

export default Spinner;

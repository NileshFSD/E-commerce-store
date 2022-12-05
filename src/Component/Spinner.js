import React from "react";
import { Vortex } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="spinner">
      <Vortex width={100} height={100} />
    </div>
  );
};

export default Spinner;

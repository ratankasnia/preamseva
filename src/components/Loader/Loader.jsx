import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="relative flex h-[80vh] w-full items-center justify-center">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;

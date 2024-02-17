import React from "react";

function LoadingBox({text}) {
  return (
    <div className="loading-box w-100">
      <div className="spinner-loading"></div>
      <p className="loading-text ">Loading {text || ""} ....</p>
    </div>
  );
}

export default LoadingBox;

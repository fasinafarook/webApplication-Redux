import React from "react";

const Loader = ({ color }) => {
  return (
    <div
      className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin"
      style={{ borderTopColor: color }}
    />
  );
};

export default Loader;

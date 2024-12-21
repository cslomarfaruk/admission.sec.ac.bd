import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="w-12 h-12 border-4 border-t-4 border-white border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;

import React from "react";

const ToolHeader = ({ heading, desc, className = "" }) => {
  return (
    <header
      className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 px-4 pt-14 pb-44"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 86%)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {heading}
        </h1>
        <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-blue-100">
          {desc}
        </p>
      </div>
    </header>
  );
};

export default ToolHeader;
    
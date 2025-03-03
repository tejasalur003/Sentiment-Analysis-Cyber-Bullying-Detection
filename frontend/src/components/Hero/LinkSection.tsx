import React from "react";

const LinkSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-col items-center gap-4 p-6">
      {/* Link Input Box */}
      <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-3">
        <input
          type="text"
          className="w-full p-3 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Paste your link here..."
        />
      </div>

      {/* Analyze Button */}
      <button className="px-4 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all">
        Analyze
      </button>
    </div>
  );
};

export default LinkSection;

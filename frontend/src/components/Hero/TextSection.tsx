import React from "react";

const TextSection = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-6">
      {/* Text Area Holder */}
      <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-4">
        <textarea
          className="w-full h-72 md:h-96 p-4 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none"
          placeholder="Paste or type your comment here..."
        ></textarea>
      </div>

      {/* Analyze Button */}
      <button className="px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all">
        Analyze
      </button>
    </div>
  );
};

export default TextSection;

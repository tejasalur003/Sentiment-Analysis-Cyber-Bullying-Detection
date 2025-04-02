import React, { useState } from "react";
import Loader from "../Loader";

interface TextSectionProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
}

const TextSection: React.FC<TextSectionProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState("");

  return (
    <div className="p-6 bg-gray-900 text-gray-300 border border-gray-800 rounded-xl shadow-lg max-w-3xl w-full mx-auto font-poppins">
      {/* Loader */}
      <Loader isLoading={isLoading} />

      <h2 className="text-xl font-semibold mb-3 text-gray-200 tracking-wide">Enter Text for Analysis</h2>
      
      <textarea
        className="w-full h-48 md:h-64 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none  focus:border-gray-400 focus:ring-2 focus:ring-gray-500 tracking-wide"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button
        className="mt-4 px-5 py-2 bg-green-500 text-white font-medium text-lg rounded-lg hover:bg-green-400 transition duration-200 tracking-wide"
        onClick={() => onAnalyze(text)}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
};

export default TextSection;

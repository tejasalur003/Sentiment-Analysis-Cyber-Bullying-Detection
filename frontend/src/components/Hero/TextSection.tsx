import React, { useState } from "react";

interface TextSectionProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
}

const TextSection: React.FC<TextSectionProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState("");

  return (
    <div className="p-4 bg-gray-800 text-gray-100 rounded-lg max-w-3xl w-full mx-auto">
      <h2 className="text-lg font-bold mb-2">Enter Text for Analysis</h2>
      <textarea
        className="w-full h-48 md:h-64 p-4 bg-gray-600 text-gray-100 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400 resize-none placeholder-gray-300"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-500 transition duration-200"
        onClick={() => onAnalyze(text)}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
};

export default TextSection;

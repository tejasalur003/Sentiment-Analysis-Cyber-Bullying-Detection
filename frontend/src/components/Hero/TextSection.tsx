import React, { useState } from "react";

interface TextSectionProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
}

const TextSection: React.FC<TextSectionProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState("");

  return (
    <div className="w-full flex flex-col items-center gap-4 p-6">
      <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-4">
        <textarea
          className="w-full h-72 md:h-96 p-4 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        className="px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all"
        onClick={() => onAnalyze(text)}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
};

export default TextSection;

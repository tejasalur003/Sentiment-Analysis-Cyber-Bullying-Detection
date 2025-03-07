import React, { useState } from "react";

interface LinkSectionProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
}

const LinkSection: React.FC<LinkSectionProps> = ({ onAnalyze, isLoading }) => {
  const [link, setLink] = useState("");

  return (
    <div className="w-full flex flex-col items-center gap-4 p-6">
      <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-4">
        <input
          type="text"
          className="w-full p-3 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <button
        className="px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all"
        onClick={() => onAnalyze(link)}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
};

export default LinkSection;

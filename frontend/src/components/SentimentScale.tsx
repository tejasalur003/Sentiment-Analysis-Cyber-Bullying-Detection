import React from "react";
import Pointer from "./Pointer";

interface SentimentScaleProps {
  score?: number; // Score between 0 to 1 (default 0.5)
}

const SentimentScale: React.FC<SentimentScaleProps> = ({ score = 0.5 }) => {
  const getSentimentColor = (value: number) => {
    if (value < 0.2) return "text-red-600"; // Extremely Negative
    if (value < 0.4) return "text-red-400"; // Slightly Negative
    if (value < 0.6) return "text-gray-400"; // Neutral
    if (value < 0.8) return "text-green-400"; // Slightly Positive
    return "text-green-500"; // Very Positive
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6 mb-2 p-4 pb-12 z-50 overflow-visible">
      {/* Scale Line */}
      <div className="relative h-3 bg-gray-700 rounded-full overflow-visible">
        <div className="absolute top-0 left-0 h-full w-[20%] bg-red-500"></div>
        <div className="absolute top-0 left-[20%] h-full w-[20%] bg-red-400"></div>
        <div className="absolute top-0 left-[40%] h-full w-[20%] bg-gray-500"></div>
        <div className="absolute top-0 left-[60%] h-full w-[20%] bg-green-400"></div>
        <div className="absolute top-0 left-[80%] h-full w-[20%] bg-green-500"></div>
      </div>

      {/* Pointer Component */}
      <Pointer position={score} />

      {/* Scale Labels */}
      <div className="flex justify-between text-gray-400 text-xs mt-3 px-1">
        <span>0</span>
        <span>0.2</span>
        <span>0.4</span>
        <span>0.6</span>
        <span>0.8</span>
        <span>1</span>
      </div>

      {/* Score Label */}
      <p className={`text-sm font-semibold text-center mt-1 ${getSentimentColor(score)}`}>
        Score: {score.toFixed(2)}
      </p>
    </div>
  );
};

export default SentimentScale;

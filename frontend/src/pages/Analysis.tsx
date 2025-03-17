import React from "react";
import { useLocation } from "react-router-dom";

const Analysis: React.FC = () => {
  const location = useLocation();
  const { text, sentiment, score } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Analysis Result</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Entered Text:</h3>
          <p className="bg-gray-700 p-4 rounded-lg text-gray-200">{text || "No text provided"}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Sentiment Analysis:</h3>
          <p className="text-green-300 font-medium">{sentiment || "No sentiment available"}</p>
          <p className="text-gray-400">Score: {score || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

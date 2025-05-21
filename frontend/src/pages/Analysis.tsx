import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SentimentScale from "../components/SentimentScale";

const Analysis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text, sentiment, score } = location.state || {};

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "Extremely Negative":
        return "text-red-600";
      case "Slightly Negative":
        return "text-red-400";
      case "Neutral":
        return "text-gray-400";
      case "Slightly Positive":
        return "text-green-400";
      case "Very Positive":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const showCyberbullyingNote =
    sentiment === "Slightly Negative" || sentiment === "Extremely Negative";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-white font-poppins">
  {/* Main container */}
  <div className="w-full max-w-4xl p-10 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-left">

    <h2 className="text-3xl font-semibold mb-8 tracking-wide text-center">
      Sentiment Analysis Result
    </h2>

    {/* Analyzed Text */}
    <div className="mb-8 max-w-[90%] mx-auto">
      <h3 className="text-lg font-medium text-gray-300 mb-3">Analyzed Text:</h3>
      <p className="bg-gray-800 border border-gray-600 px-5 py-4 rounded-md text-gray-200 leading-relaxed break-words">
        {text || "No text provided"}
      </p>
    </div>

    {/* Result and Score container */}
    <div className="max-w-[90%] mx-auto grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 items-center mb-8 text-gray-300">

      <h3 className="text-lg font-medium col-span-2 mb-2">Result:</h3>

      {/* Sentiment */}
      <span className="font-semibold text-lg text-gray-300">Sentiment:</span>
      <p className={`text-2xl font-semibold ${getSentimentColor(sentiment)}`}>
        {sentiment || "No sentiment available"}
      </p>

      {/* Score */}
      <span className="font-semibold text-lg text-gray-300">Score:</span>
      <p className="text-gray-400 text-lg font-semibold text-white">
        {score !== undefined ? score.toFixed(2) : "N/A"}
      </p>
    </div>

    {score !== undefined && (
      <div className="w-full flex flex-col items-center ">
        <SentimentScale score={score} />
        {showCyberbullyingNote && (
          <p className="text-black text-sm bg-red-400 bg-opacity-30 px-4 py-2 rounded-md border border-red-700 max-w-[90%] mx-auto">
            ⚠️ This text may indicate cyberbullying. Consider further analysis.
          </p>
        )}
      </div>
    )}

    {/* Buttons */}
    <div className="mt-10 flex gap-4 justify-center">
      <button
        className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold text-lg rounded-md transition duration-200"
        onClick={() => navigate("/")}
      >
        Analyze Another Text
      </button>

      <button
        className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg rounded-md transition duration-200"
        onClick={() => navigate("/emotion-analysis", { state: { text } })}
      >
        Emotion Analysis
      </button>

      <button
        className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-lg rounded-md transition duration-200"
        onClick={() => navigate("/cyberbullying-check", { state: { text } })}
      >
        Check for Cyberbullying
      </button>
    </div>
  </div>
</div>


  );
};

export default Analysis;

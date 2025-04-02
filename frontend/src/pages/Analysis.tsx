import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SentimentScale from "../components/SentimentScale"; // Import SentimentScale component

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 pt-24 pb-16">
      <div className="bg-gray-900 px-10 py-8 rounded-xl shadow-lg w-full max-w-3xl text-center border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Sentiment Analysis Result
        </h2>

        <div className="mb-6 text-left">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Analyzed Text:</h3>
          <p className="bg-gray-800 px-5 py-4 rounded-lg text-gray-200 border border-gray-700 leading-relaxed">
            {text || "No text provided"}
          </p>
        </div>

        <div className="mb-6 text-left">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Result:</h3>
          <p className={`text-2xl font-semibold ${getSentimentColor(sentiment)} mb-2`}>
            {sentiment || "No sentiment available"}
          </p>
          <p className="text-gray-400 text-lg">
            Score: <span className="font-semibold text-white">{score !== undefined ? score.toFixed(2) : "N/A"}</span>
          </p>
        </div>

        {score !== undefined && (
          <div className="w-full flex flex-col items-center mt-10">
            <SentimentScale score={score} />
            {showCyberbullyingNote && (
              <p className="mt-2 text-black text-sm bg-red-400 bg-opacity-30 px-4 py-2 rounded-md border border-red-700">
                ⚠️ This text may indicate cyberbullying. Consider further analysis.
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-medium text-lg rounded-lg transition duration-200"
            onClick={() => window.history.back()}
          >
            Analyze Another Text
          </button>

          {(
            <button
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium text-lg rounded-lg transition duration-200"
              onClick={() => navigate("/cyberbullying-check", { state: { text } })}
            >
              Check for Cyberbullying
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;

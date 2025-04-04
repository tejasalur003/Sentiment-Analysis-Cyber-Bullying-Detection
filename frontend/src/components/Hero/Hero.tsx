import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkSection from "./LinkSection";
import TextSection from "./TextSection";
import Loader from "../Loader";

const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const analyzeSentiment = async (input: string) => {
    if (!input.trim()) {
      alert("Please enter valid text or extract from a link!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        // Ensure `score` is a valid number
        const score = parseFloat(data.score.toFixed(4));

        navigate("/analysis", {
          state: {
            text: input,
            sentiment: data.sentiment,
            score, // Pass as a number
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend.");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-6 min-h-screen pt-24 bg-gray-950 text-gray-300">
      {/* Loader */}
      <Loader isLoading={isLoading} />

      {/* Link Input Section */}
      <div className="w-[80%] max-w-4xl bg-gray-900 text-white border border-gray-800 rounded-xl shadow-lg p-6">
        <LinkSection onAnalyze={analyzeSentiment} />
      </div>

      {/* Divider with "OR" */}
      <div className="relative flex items-center w-[80%] max-w-4xl">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="px-4 bg-gray-950 text-gray-500 text-lg font-medium">OR</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      {/* Text Input Section */}
      <div className="w-[80%] max-w-4xl bg-gray-900 text-white border border-gray-800 rounded-xl shadow-lg p-6">
        <TextSection onAnalyze={analyzeSentiment} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Hero;

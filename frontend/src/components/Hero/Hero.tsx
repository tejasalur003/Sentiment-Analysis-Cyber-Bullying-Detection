import React, { useState } from "react";
import LinkSection from "./LinkSection";
import TextSection from "./TextSection";

const Hero: React.FC = () => {
  const [results, setResults] = useState<{ link?: string; text?: string }>({});
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const analyzeSentiment = async (input: string, type: "link" | "text") => {
    if (!input.trim()) {
      alert(`Please enter a valid ${type}!`);
      return;
    }

    setLoadingType(type);
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
        setResults((prev) => ({
          ...prev,
          [type]: `Sentiment: ${data.sentiment} (Score: ${data.score.toFixed(4)})`,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend.");
    }
    setLoadingType(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-6 min-h-screen pt-24">
      {/* Link Input Section */}
      <LinkSection
        onAnalyze={(input) => analyzeSentiment(input, "link")}
        isLoading={loadingType === "link"}
      />
      {results.link && (
        <p className="mt-4 text-lg font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md">
          {results.link}
        </p>
      )}

      {/* Divider with "OR" */}
      <div className="relative flex items-center w-full max-w-3xl">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 bg-white text-gray-500 text-lg font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Text Input Section */}
      <TextSection
        onAnalyze={(input) => analyzeSentiment(input, "text")}
        isLoading={loadingType === "text"}
      />
      {results.text && (
        <p className="mt-4 text-lg font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md">
          {results.text}
        </p>
      )}
    </div>
  );
};

export default Hero;

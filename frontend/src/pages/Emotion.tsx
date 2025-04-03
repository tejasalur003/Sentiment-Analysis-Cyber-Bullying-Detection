import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

interface EmotionScores {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  love: number;
  surprise: number;
}

const EmotionAnalysis = () => {
  const location = useLocation();
  const [text, setText] = useState<string>("");
  const [emotionScores, setEmotionScores] = useState<EmotionScores | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.text) {
      setText(location.state.text);
    }
  }, [location.state]);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text for analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEmotionScores(null);

    try {
      const response = await fetch("http://localhost:5000/emotion_analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emotion analysis from backend.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setEmotionScores(data.scores);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error("Error detecting emotion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = () => {
    if (!emotionScores) return "";

    // Sort emotions by score in descending order
    const sortedEmotions = Object.entries(emotionScores)
      .map(([emotion, score]) => ({ emotion, score }))
      .sort((a, b) => b.score - a.score);

    // Get top 3 emotions
    const topEmotions = sortedEmotions.slice(0, 3);

    if (topEmotions.length < 1) return "No strong emotion detected.";

    const [dominant, second, third] = topEmotions;
    let report = `The dominant emotion detected is **${dominant.emotion}** with a confidence of **${dominant.score.toFixed(2)}%**.`;

    if (second) {
      report += ` However, there is also a strong presence of **${second.emotion}** at **${second.score.toFixed(2)}%**.`;
    }

    if (third) {
      report += ` Additionally, **${third.emotion}** is detected at **${third.score.toFixed(2)}%**.`;
    }

    return report;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-300">
          Emotion Analysis
        </h2>

        <textarea
          className="w-full h-40 p-4 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {error && (
          <div className="mt-4 p-3 bg-blue-500 text-white rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Loader Component */}
        <Loader isLoading={isLoading} />

        <div className="flex justify-center mt-4">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`px-6 py-2 text-white font-semibold rounded-lg transition-all ${
              isLoading ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Analyzing..." : "Analyze Emotion"}
          </button>
        </div>

        {emotionScores && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-blue-500">
            <h3 className="text-xl font-semibold mb-2 text-gray-300">Emotion Report:</h3>
            <p className="text-gray-300">{generateReport()}</p>

            <div className="mt-4">
              {Object.entries(emotionScores).map(([emotion, score]) => (
                <div key={emotion} className="flex justify-between text-gray-300">
                  <span className="capitalize">{emotion}</span>
                  <span className="font-bold">{score.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionAnalysis;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { predictEmotion, EmotionScores } from "../api/EmotionPredict";

const Emotion = () => {
  const location = useLocation();
  const [text, setText] = useState<string>("");
  const [emotionScores, setEmotionScores] = useState<EmotionScores | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(false);

    try {
      const data = await predictEmotion(text);
      //console.log("Backend response:", data);
      setEmotionScores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error("Error detecting emotion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPrimaryEmotion = () => {
    if (!emotionScores) return null;
    const sorted = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);
    return sorted[0];
  };

  const getOtherEmotions = () => {
    if (!emotionScores) return [];
    const sorted = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(1);
  };

  const primaryEmotion = getPrimaryEmotion();
  const otherEmotions = getOtherEmotions();

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
          <div className="mt-4 p-3 bg-red-500 text-white rounded-lg text-center">
            {error}
          </div>
        )}

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

        {primaryEmotion && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-blue-500">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Result:</h3>
            <p className="text-gray-300">
              The most prominent emotion expressed in the text is{" "}
              <span className="text-white font-bold">"{primaryEmotion[0]}"</span> with a confidence score of{" "}
              <span className="font-bold">{primaryEmotion[1].toFixed(2)}%</span>.
            </p>

            {otherEmotions.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-blue-400 hover:underline focus:outline-none"
                >
                  {showDropdown ? "Hide Other Emotions" : "Show Other Emotions"}
                </button>

                {showDropdown && (
                  <div className="mt-2 bg-gray-800 rounded-lg border border-gray-600 p-3 space-y-2">
                    {otherEmotions.map(([emotion, score]) => (
                      <div
                        key={emotion}
                        className="flex justify-between text-gray-300"
                      >
                        <span className="capitalize">"{emotion}"</span>
                        <span className="font-bold">{score.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Emotion;

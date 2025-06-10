import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { predictEmotion, EmotionScores } from "../api/EmotionPredict";

const Emotion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [emotionScores, setEmotionScores] = useState<EmotionScores | null>(
    null
  );
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
      setEmotionScores(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
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
    <div className="min-h-screen text-white font-poppins flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl p-10 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-left">
        <h2 className="text-3xl font-semibold mb-6 tracking-wide text-center text-[#D9D9F1]">
          Emotion Analysis
        </h2>

        <div className="mb-6 p-4 rounded-lg">
          <textarea
            className="w-full h-36 p-3 bg-gray-800 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 "
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
            {error}
          </div>
        )}

        <Loader isLoading={isLoading} />

        <div className="mb-6 flex justify-start gap-4">
          <button
            onClick={() =>
              navigate("/analysis", {
                state: {
                  ...location.state,
                  text,
                },
              })
            }
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            Back
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`px-6 py-3 font-semibold rounded-md transition duration-200 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Analyzing..." : "Analyze Emotion"}
          </button>
        </div>

        {primaryEmotion && (
          <div className="p-6  bg-gray-800 rounded-lg border border-blue-600 text-[#D9D9F1]">
            <h3 className="text-xl font-semibold mb-3">Result:</h3>
            <p className="text-[#F0F0F7]">
              The most prominent emotion expressed in the text is{" "}
              <span className="font-bold">"{primaryEmotion[0]}"</span> with a
              confidence score of{" "}
              <span className="font-bold">{primaryEmotion[1].toFixed(2)}%</span>
              .
            </p>

            {otherEmotions.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-blue-400 hover:underline focus:outline-none"
                >
                  {showDropdown ? "Hide Other Emotions" : "Show Other Emotions"}
                </button>

                {showDropdown && (
                  <div className="  rounded-lg p-4 space-y-2 text-[#D9D9F1]">
                    {otherEmotions.map(([emotion, score]) => (
                      <div key={emotion} className="flex justify-between">
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

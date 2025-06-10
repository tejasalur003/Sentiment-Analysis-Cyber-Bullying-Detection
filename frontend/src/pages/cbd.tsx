import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { predictCyberbullyingAll, CyberbullyingPrediction } from "../api/CBDPredict";

const Cbd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [prediction, setPrediction] = useState<CyberbullyingPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (location.state?.text) {
      setText(location.state.text);
    }
  }, [location.state]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleCheck = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await predictCyberbullyingAll(text);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error("Error detecting cyberbullying:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-28 text-white font-poppins">
      <div className="w-full max-w-4xl p-6 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-left">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-300 text-center">
          Cyberbullying Checker
        </h2>

        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-2">Input Text:</h3>
          <textarea
            ref={textareaRef}
            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400 border border-gray-600 resize-none overflow-hidden"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
          />
        </div>

        {error && (
          <div className="mt-2 mb-4 p-3 bg-red-500 text-white rounded-lg text-sm">
            {error}
          </div>
        )}

        <Loader isLoading={isLoading} />

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate("/analysis", {
              state: {
                ...location.state,
                text,
              },
            })}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition"
          >
            Back
          </button>

          <button
            onClick={handleCheck}
            disabled={isLoading}
            className={`px-5 py-2 font-semibold text-white rounded-md transition duration-200 ${
              isLoading ? "bg-red-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Analyzing..." : "Check for Cyberbullying"}
          </button>
        </div>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Prediction:</h3>
            <p
              className={`text-base font-bold ${
                prediction.predicted_class === "not_cyberbullying"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {prediction.predicted_class.replaceAll("_", " ")} (
              {(prediction.confidence * 100).toFixed(2)}% confidence)
            </p>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-1">Category Probabilities:</h4>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                {Object.entries(prediction.probabilities).map(([label, prob]) => (
                  <li key={label}>
                    {label.replaceAll("_", " ")}: {(prob * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cbd;

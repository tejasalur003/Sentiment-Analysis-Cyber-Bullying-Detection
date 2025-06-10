import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  predictCyberbullyingAll,
  CyberbullyingPrediction,
} from "../api/CBDPredict";

const Cbd = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [prediction, setPrediction] = useState<CyberbullyingPrediction | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

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
    setShowDetails(false);

    try {
      const result = await predictCyberbullyingAll(text);
      setPrediction(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      console.error("Error detecting cyberbullying:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-poppins flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl p-8 sm:p-10 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#D9D9F1]">
          Cyberbullying Checker
        </h2>

        <div className="mb-6">
          <textarea
            ref={textareaRef}
            className="w-full min-h-[120px] p-4 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        <Loader isLoading={isLoading} />

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() =>
              navigate("/analysis", {
                state: { ...location.state, text },
              })
            }
            className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-medium rounded-md transition"
          >
            Back
          </button>

          <button
            onClick={handleCheck}
            disabled={isLoading}
            className={`px-6 py-3 font-semibold rounded-md transition duration-200 ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Analyzing..." : "Check for Cyberbullying"}
          </button>
        </div>

        {prediction && (
          <div className="p-6 bg-gray-800 rounded-lg border border-red-600">
            <h3 className="text-xl font-semibold mb-3 text-[#D9D9F1]">
              Prediction:
            </h3>
            <p className="text-base text-[#F0F0F7] mb-4">
              The text is most likely{" "}
              <span
                className={`font-bold ${
                  prediction.predicted_class === "not_cyberbullying"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {prediction.predicted_class.replaceAll("_", " ")}
              </span>{" "}
              with{" "}
              <span className="font-bold">
                {(prediction.confidence * 100).toFixed(2)}% confidence
              </span>
              .
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-red-400 underline hover:text-red-300 transition"
            >
              {showDetails
                ? "Hide Other Categories"
                : "Show All Categories"}
            </button>

            {showDetails && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Other Category Probabilities:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {Object.entries(prediction.probabilities)
                    .filter(([label]) => label !== prediction.predicted_class)
                    .sort(([, a], [, b]) => b - a)
                    .map(([label, prob]) => (
                      <li key={label}>
                        {label.replaceAll("_", " ")}: {(prob * 100).toFixed(2)}%
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cbd;

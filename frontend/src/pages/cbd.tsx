import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { predictCyberbullying } from "../api/CBDPredict"

const Cbd = () => {
  const location = useLocation();
  const [text, setText] = useState<string>("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.text) {
      setText(location.state.text);
    }
  }, [location.state]);

  const handleCheck = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await predictCyberbullying(text); 
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error("Error detecting cyberbullying:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-300">
          Cyberbullying Checker
        </h2>

        <textarea
          className="w-full h-40 p-4 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
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
            onClick={handleCheck}
            disabled={isLoading}
            className={`px-6 py-2 text-white font-semibold rounded-lg transition-all ${
              isLoading ? "bg-red-500" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Analyzing..." : "Check for Cyberbullying"}
          </button>
        </div>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-xl font-semibold mb-2 text-gray-300">Prediction:</h3>
            <p
              className={`font-bold ${
                prediction === "not_cyberbullying" ? "text-green-400" : "text-red-400"
              }`}
            >
              {prediction.replace("_", " ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cbd;

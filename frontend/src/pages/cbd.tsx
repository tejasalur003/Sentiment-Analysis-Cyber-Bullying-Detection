import React, { useState } from "react";

const Cbd = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null); // Reset previous results

    try {
      const response = await fetch("http://localhost:5000/cbd_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction from backend.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error("Error detecting cyberbullying:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          Cyberbullying Checker
        </h2>
        
        <textarea
          className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {error && (
          <div className="mt-4 p-3 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={isLoading}
          className={`mt-5 w-full ${isLoading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-600"} text-white font-semibold py-3 rounded-lg transition-all`}
        >
          {isLoading ? "Analyzing..." : "Check for Cyberbullying"}
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Prediction:</h3>
            <p className={`font-bold ${prediction === "not_cyberbullying" ? "text-green-400" : "text-red-400"}`}>
              {prediction.replace("_", " ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cbd;

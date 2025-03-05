import React, { useState } from "react";

const SentimentAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setSentiment(`Sentiment: ${data.sentiment} (Score: ${data.score.toFixed(4)})`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Sentiment Analyzer</h1>
      <textarea
        className="w-96 h-32 p-3 text-black rounded-md border border-gray-300"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md"
        onClick={analyzeSentiment}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {sentiment && <p className="mt-4 text-lg">{sentiment}</p>}
    </div>
  );
};

export default SentimentAnalyzer;

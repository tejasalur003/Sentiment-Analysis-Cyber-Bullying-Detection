import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ExtractedText: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { content, platform } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  if (!content) {
    return (
      <div className="pt-24 pb-32 px-6 text-center text-red-400 text-xl min-h-screen bg-gray-950 font-poppins">
        No content found. Please extract content again.
      </div>
    );
  }

  const analyzeSentiment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });

      const data = await response.json();
      const score = parseFloat(data.score.toFixed(4));

      navigate("/analysis", {
        state: {
          text: content,
          sentiment: data.sentiment,
          score,
        },
      });
    } catch (err) {
      alert("Failed to analyze sentiment.");
    } finally {
      setIsLoading(false);
    }
  };

  const extractPlainText = (text: string) =>
    text.replace(/@\w+|#[\w-]+|[\u{1F600}-\u{1F64F}]/gu, "").trim();

  const extractUsernames = (text: string) => text.match(/@\w+/g) || [];
  const extractHashtags = (text: string) => text.match(/#[\w-]+/g) || [];
  const extractEmojis = (text: string) =>
    text.match(/[\u{1F600}-\u{1F6FF}]/gu) || [];

  const plainText = extractPlainText(content);
  const usernames = extractUsernames(content);
  const hashtags = extractHashtags(content);
  const emojis = extractEmojis(content);

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen bg-gray-950 text-gray-200 font-poppins">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Original Content */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Platform: {platform}</h2>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Original Extracted Text:</h3>
          <p className="whitespace-pre-wrap text-gray-400 mb-4">{content}</p>

          <button
            onClick={analyzeSentiment}
            disabled={isLoading}
            className={`mt-2 px-5 py-2 font-semibold rounded-lg transition-all ${
              isLoading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400"
            } text-white`}
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>

          {isLoading && (
            <div className="mt-4">
              <Loader isLoading={isLoading} />
            </div>
          )}

          <p className="mt-6 text-gray-500 italic">
            Plain text with no emojis, usernames, or hashtags:
          </p>
          <p className="text-gray-400 mt-2">{plainText}</p>
        </div>

        {/* Right Section - Highlights */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Highlights</h3>

          <div className="mb-4">
            <h4 className="text-gray-400 font-semibold">Usernames:</h4>
            <ul className="text-sm text-orange-400 mt-1">
              {usernames.length ? usernames.map((u, i) => <li key={i}>{u}</li>) : <li>None</li>}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-gray-400 font-semibold">Hashtags:</h4>
            <ul className="text-sm text-orange-400 mt-1">
              {hashtags.length ? hashtags.map((h, i) => <li key={i}>{h}</li>) : <li>None</li>}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-semibold">Emojis:</h4>
            <ul className="text-sm text-orange-400 mt-1">
              {emojis.length ? emojis.map((e, i) => <li key={i}>{e}</li>) : <li>None</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractedText;

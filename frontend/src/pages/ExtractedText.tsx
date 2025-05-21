import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { predictSentiment } from "../api/SentimentPredict";

const ExtractedText: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { content, platform } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  if (!content) {
    return (
      <div className="pt-24 pb-32 px-6 text-center text-red-400 text-xl min-h-screen font-poppins">
        No content found. Please extract content again.
      </div>
    );
  }

  const analyzeSentiment = async () => {
    try {
      setIsLoading(true);
      const { sentiment, score } = await predictSentiment(content);

      navigate("/analysis", {
        state: {
          text: content,
          sentiment,
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
    <div className="pt-24 px-6 min-h-screen text-gray-200 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-3">Platform: {platform}</h2>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Original Extracted Text:</h3>
          <p className="whitespace-pre-wrap text-gray-300 mb-4">{content}</p>

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

          <p className="mt-6 text-gray-400 italic">
            Plain text with no emojis, usernames, or hashtags:
          </p>
          <p className="text-gray-300 mt-2">{plainText}</p>
        </div>

        {/* Sidebar */}
        <div className="bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Highlights</h3>

          <div className="mb-4">
            <h4 className="text-gray-400 font-semibold">Usernames:</h4>
            <ul className="text-sm mt-1">
              {usernames.length
                ? usernames.map((u, i) => (
                    <li key={i} className="text-green-400">{u}</li>
                  ))
                : <li className="text-[#FF4500]">None</li>}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-gray-400 font-semibold">Hashtags:</h4>
            <ul className="text-sm mt-1">
              {hashtags.length
                ? hashtags.map((h, i) => (
                    <li key={i} className="text-green-400">{h}</li>
                  ))
                : <li className="text-[#FF4500]">None</li>}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-semibold">Emojis:</h4>
            <ul className="text-sm mt-1">
              {emojis.length
                ? emojis.map((e, i) => (
                    <li key={i} className="text-green-400">{e}</li>
                  ))
                : <li className="text-[#FF4500]">None</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractedText;

import React, { useState } from "react";
import Loader from "../Loader";

interface LinkSectionProps {
  onAnalyze: (input: string) => Promise<void>;
}

const LinkSection: React.FC<LinkSectionProps> = ({ onAnalyze }) => {
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const detectPlatform = (url: string): string | null => {
    if (url.includes("twitter.com") || url.includes("x.com")) return "Twitter";
    if (url.includes("reddit.com")) return "Reddit";
    return null;
  };

  const handleScrape = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL!");
      return;
    }

    setError(null);
    setContent("");
    setPlatform(detectPlatform(url));
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setContent(data.content || "No content extracted.");
    } catch (error) {
      setError("Failed to fetch content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-300 border border-gray-800 rounded-xl shadow-lg max-w-3xl w-full mx-auto font-poppins">
      {/* Loader */}
      <Loader isLoading={isLoading} />

      <h2 className="text-xl font-semibold mb-3 text-gray-200 tracking-wide">Enter Social Media URL</h2>
      
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link here..."
        className="p-3 text-white bg-gray-800 rounded w-full border border-gray-600 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 tracking-wide"
      />
      
      <button
        onClick={handleScrape}
        className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition duration-200"
      >
        Fetch Content
      </button>

      {error && <p className="mt-2 text-red-400">{error}</p>}

      {content && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          {platform && <h3 className="text-lg font-semibold text-gray-300 mb-2">Platform: {platform}</h3>}
          <h3 className="text-lg font-semibold text-gray-300">Extracted Content:</h3>
          <p className="mt-2 whitespace-pre-wrap text-gray-400">{content}</p>
          <button
            className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition duration-200"
            onClick={() => onAnalyze(content)}
          >
            Analyze
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkSection;

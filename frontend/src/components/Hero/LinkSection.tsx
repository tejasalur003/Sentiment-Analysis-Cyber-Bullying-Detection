import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const LinkSection: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
    setIsLoading(true);

    try {
      const platform = detectPlatform(url);

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
      const content = data.content || "";

      navigate("/extracted-text", {
        state: {
          content,
          platform,
        },
      });
    } catch (error) {
      setError("Failed to fetch content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-[80%] max-w-4xl p-12 bg-gray-900 text-gray-300 border border-gray-800 rounded-xl shadow-lg font-poppins mx-auto">
   
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
    </div>
  );
};

export default LinkSection;

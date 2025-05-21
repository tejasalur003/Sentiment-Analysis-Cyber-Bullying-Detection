import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { postScrape } from "../../api/PostScrape";

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
      const data = await postScrape(url);
      const content = data.content || "";

      navigate("/extracted-text", {
        state: {
          content,
          platform,
        },
      });
    } catch (error) {
      console.error(error);
      setError("Failed to fetch content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-5xl mt-6 p-10 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg font-poppins mx-auto">
      <Loader isLoading={isLoading} />

      <h2 className="text-2xl font-semibold mb-4 text-gray-100 tracking-wide">
        Enter Social Media URL
      </h2>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link here..."
        className="
          w-full p-3 rounded-md 
          bg-gray-800 border border-gray-600 
          shadow-[0_2px_15px_rgba(129,140,248,0.15)]
          placeholder-gray-400 text-white 
          focus:outline-none focus:ring-2 focus:ring-white focus:border-white 
          tracking-wide transition
        "
      />

      <button
        onClick={handleScrape}
        className="
          mt-5 px-6 py-2 bg-orange-600 hover:bg-orange-500
          text-white font-semibold rounded-md transition duration-300 tracking-wide
        "
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Fetch Content"}
      </button>

      {error && <p className="mt-3 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default LinkSection;

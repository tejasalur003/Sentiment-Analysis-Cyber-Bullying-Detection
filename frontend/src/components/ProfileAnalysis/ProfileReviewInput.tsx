import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

interface ProfileReviewInputProps {
  onLinksFetched: (links: string[]) => void;
}

const ProfileReviewInput: React.FC<ProfileReviewInputProps> = ({ onLinksFetched }) => {
  const [url, setUrl] = useState<string>("");
  const [num, setNum] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [localTweetLinks, setLocalTweetLinks] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleProfileReview = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/profile-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, num }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const tweetLinks = data.tweet_links || [];
      setLocalTweetLinks(tweetLinks);
      onLinksFetched(tweetLinks);
    } catch (error) {
      setError("Failed to fetch tweets. Please try again.");
      setLocalTweetLinks([]);
      onLinksFetched([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-5xl my-28 p-8 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg font-poppins mx-auto">
      <Loader isLoading={isLoading} />

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-4/5">
          <label className="block mb-2 text-xl font-semibold text-gray-200 tracking-wide">
            Twitter Profile URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste profile URL here..."
            className="p-3 h-[56px] text-white bg-gray-800 rounded w-full border border-gray-600 placeholder-gray-400 outline-none focus:border-white focus:ring-2 focus:ring-white tracking-wide"
          />
        </div>

        <div className="w-full sm:w-1/5">
          <label className="block mb-2 text-xl font-semibold text-gray-200 tracking-wide">
            No. of Tweets
          </label>
          <select
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="p-3 h-[56px] bg-gray-800 text-white rounded w-full border border-gray-600 focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
          >
            {[1, 2, 3, 4, 5, 10, 15].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleProfileReview}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-md transition duration-300 tracking-wide"
        >
          {isLoading ? "Fetching..." : "Check Tweets"}
        </button>
      </div>

      {error && <p className="mt-3 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default ProfileReviewInput;

import React, { useState } from "react";
import Loader from "../Loader";

interface ProfileReviewInputProps {
  onLinksFetched: (links: string[]) => void;
}

const ProfileReviewInput: React.FC<ProfileReviewInputProps> = ({ onLinksFetched }) => {
  const [url, setUrl] = useState<string>("");
  const [num, setNum] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [localTweetLinks, setLocalTweetLinks] = useState<string[]>([]); // NEW

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
      setLocalTweetLinks(tweetLinks);     // Set local state
      onLinksFetched(tweetLinks);         // Pass to parent
    } catch (error) {
      setError("Failed to fetch tweets. Please try again.");
      setLocalTweetLinks([]);             // Clear local links
      onLinksFetched([]);                 // Clear in parent too
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[80%] max-w-4xl p-12 bg-gray-900 text-gray-300 border border-gray-800 rounded-xl shadow-lg font-poppins mx-auto mt-24 mb-12">
      <Loader isLoading={isLoading} />

      <div className="flex flex-col sm:flex-row gap-4">
        {/* URL Input */}
        <div className="w-full sm:w-4/5">
          <label className="block mb-2 text-xl font-semibold text-gray-200 tracking-wide">
            Twitter Profile URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste profile URL here..."
            className="p-3 h-[56px] text-white bg-gray-800 rounded w-full border border-gray-600 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 tracking-wide"
          />
        </div>

        {/* Number Dropdown */}
        <div className="w-full sm:w-1/5">
          <label className="block mb-2 text-xl font-semibold text-gray-200 tracking-wide">
            No. of Tweets
          </label>
          <select
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="p-3 h-[56px] bg-gray-800 text-white rounded w-full border border-gray-600 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
          >
            {[1, 2, 3, 4, 5, 10, 15].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleProfileReview}
        className="mt-6 px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition duration-200"
      >
        Get Tweets
      </button>

      {error && <p className="mt-2 text-red-400">{error}</p>}

      {/* Display fetched tweet links locally */}
      {/* {localTweetLinks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-200">
            Fetched Tweet Links (From Input):
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {localTweetLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-words"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default ProfileReviewInput;

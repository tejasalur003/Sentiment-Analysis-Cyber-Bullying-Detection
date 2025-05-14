import React, { useState } from "react";
import { predictSentiment } from "../../api/SentimentPredict";
import { postScrape } from "../../api/PostScrape";
import { predictCyberbullying } from "../../api/CBDPredict";
import { predictEmotion } from "../../api/EmotionPredict";

interface ProfileReviewResultsProps {
  tweetLinks: string[];
}

interface TweetAnalysisResult {
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
}

const ProfileReviewResults: React.FC<ProfileReviewResultsProps> = ({ tweetLinks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<(TweetAnalysisResult | null)[]>(Array(tweetLinks.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  if (tweetLinks.length === 0) return null;

  const generateResult = async () => {
    setIsLoading(true);

    for (let i = 0; i < tweetLinks.length; i++) {
      setCurrentIndex(i); // Show progress (i.e. 1/4)

      try {
        const url = tweetLinks[i];
        const data = await postScrape(url);
        const text = data.content || "";

        const { sentiment, score } = await predictSentiment(text);
        const cbd_result = await predictCyberbullying(text);
        const emotionScores = await predictEmotion(text);

        const sortedEmotions = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);
        const [primaryEmotion, primaryScore] = sortedEmotions[0];

        // Update that specific index's result
        setResults(prev => {
          const updated = [...prev];
          updated[i] = {
            sentiment,
            score,
            emotion: primaryEmotion,
            emotionScore: primaryScore,
            cbd: cbd_result,
          };
          return updated;
        });
      } catch (err) {
        console.error(`Failed to analyze tweet ${i + 1}:`, err);
      }
    }

    setCurrentIndex(null);
    setIsLoading(false);
  };

  return (
    <div className="w-[80%] max-w-4xl mx-auto mb-24 p-10 bg-gray-800 text-gray-200 rounded-xl shadow-md font-poppins">
      <h2 className="text-xl font-bold mb-6 text-orange-400">Tweet Analysis Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left border-r border-gray-600">Link</th>
              <th className="px-4 py-3 text-left border-r border-gray-600">Sentiment</th>
              <th className="px-4 py-3 text-left border-r border-gray-600">Emotion</th>
              <th className="px-4 py-3 text-left">Cyberbullying</th>
            </tr>
          </thead>
          <tbody>
            {tweetLinks.map((link, index) => {
              const result = results[index];
              const isAnalyzing = currentIndex === index;

              return (
                <tr key={index} className="hover:bg-gray-700 transition duration-150">
                  <td className="px-4 py-3 border-t border-gray-700 text-blue-400 break-words max-w-[250px]">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link}
                    </a>
                  </td>
                  <td className="px-4 py-3 border-t border-gray-700 text-gray-300">
                    {isAnalyzing
                      ? `Analyzing (${index + 1}/${tweetLinks.length})...`
                      : result
                      ? `${result.sentiment} (${result.score.toFixed(2)})`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-700 text-gray-300">
                    {result ? `${result.emotion} (${result.emotionScore.toFixed(2)}%)` : "—"}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-700 text-gray-300">
                    {result ? result.cbd : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={generateResult}
        disabled={isLoading}
        className="mt-6 px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition duration-200"
      >
        {isLoading
          ? currentIndex !== null
            ? `Analyzing (${currentIndex + 1}/${tweetLinks.length})...`
            : "Analyzing..."
          : "Analyze Tweets"}
      </button>
    </div>
  );
};

export default ProfileReviewResults;

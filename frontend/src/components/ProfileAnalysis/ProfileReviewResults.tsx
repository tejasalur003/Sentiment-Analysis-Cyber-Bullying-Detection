import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { predictSentiment } from "../../api/SentimentPredict";
import { postScrape } from "../../api/PostScrape";
import { predictCyberbullying } from "../../api/CBDPredict";
import { predictEmotion } from "../../api/EmotionPredict";
import Loader2 from "./loader2";

interface ProfileReviewResultsProps {
  tweetLinks: string[];
}

interface TweetAnalysisResult {
  link: string;
  text: string;
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
}

const ProfileReviewResults: React.FC<ProfileReviewResultsProps> = ({ tweetLinks }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<(TweetAnalysisResult | null)[]>(Array(tweetLinks.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const generateResult = async () => {
    setIsLoading(true);
    let remaining = tweetLinks.length;
    setTimeRemaining(remaining * 18);

    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    for (let i = 0; i < tweetLinks.length; i++) {
      setCurrentIndex(i);

      try {
        const url = tweetLinks[i];
        const data = await postScrape(url);
        const text = data.content || "";

        const { sentiment, score } = await predictSentiment(text);
        const cbd_result = await predictCyberbullying(text);
        const emotionScores = await predictEmotion(text);

        const sortedEmotions = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);
        const [primaryEmotion, primaryScore] = sortedEmotions[0];

        setResults(prev => {
          const updated = [...prev];
          updated[i] = {
            link: url,
            text,
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

      remaining--;
      setTimeRemaining(remaining * 18);
    }

    setCurrentIndex(null);
    setIsLoading(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const analyzeResults = () => {
    const validResults = results.filter(r => r !== null) as TweetAnalysisResult[];
    if (validResults.length > 0) {
      navigate("/send-email", { state: { results: validResults } });
    } else {
      alert("No results to analyze. Please analyze tweets first.");
    }
  };

  if (tweetLinks.length === 0) return null;

  return (
    <div className="w-[85%] max-w-5xl mx-auto mb-24 p-8 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg relative">
      {isLoading && <Loader2 timeRemaining={timeRemaining} />}

      <h2 className="text-2xl font-bold mb-6 text-orange-400">Tweet Analysis Table</h2>

      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="min-w-full bg-gray-800 table-auto text-sm">
          <thead className="text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-3 border-b border-gray-600 text-left">Link</th>
              <th className="px-6 py-3 border-b border-gray-600 text-left">Sentiment</th>
              <th className="px-6 py-3 border-b border-gray-600 text-left">Emotion</th>
              <th className="px-6 py-3 border-b border-gray-600 text-left">Cyberbullying</th>
            </tr>
          </thead>
          <tbody>
            {tweetLinks.map((link, index) => {
              const result = results[index];
              const isAnalyzing = currentIndex === index;

              return (
                <tr key={index} className="hover:bg-gray-700 transition-all duration-150">
                  <td className="px-6 py-4 border-t border-gray-700 max-w-[250px] text-blue-400 break-words">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link}
                    </a>
                  </td>
                  <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                    {isAnalyzing
                      ? `Analyzing (${index + 1}/${tweetLinks.length})...`
                      : result
                      ? `${result.sentiment} (${result.score.toFixed(2)})`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                    {isAnalyzing
                      ? "Processing..."
                      : result
                      ? `${result.emotion} (${(result.emotionScore).toFixed(2)}%)`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                    {isAnalyzing ? "Checking..." : result ? result.cbd : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
          onClick={generateResult}
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Start Analysis"}
        </button>

        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all"
          onClick={analyzeResults}
          disabled={isLoading}
        >
          Analyze Results
        </button>
      </div>
    </div>
  );
};

export default ProfileReviewResults;

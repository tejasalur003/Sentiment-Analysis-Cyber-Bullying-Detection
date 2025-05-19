import React from "react";
import { useLocation } from "react-router-dom";
import SendEmail from "./SendMail"; 

interface TweetAnalysisResult {
  link: string;
  text: string;
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
}

interface ViolationDetail {
  link: string;
  violations: {
    parameter: "Sentiment" | "Emotion" | "Cyberbullying";
    value: string;
  }[];
}

const MailAnalysis: React.FC = () => {
  const location = useLocation();
  const { results } = location.state as { results: TweetAnalysisResult[] };

  const getViolations = (result: TweetAnalysisResult): ViolationDetail | null => {
    const negativeSentiments = ["Very Negative", "Slightly Negative"];
    const concerningEmotions = ["Anger", "Fear", "Sadness"];

    const violations: {
      parameter: "Sentiment" | "Emotion" | "Cyberbullying";
      value: string;
    }[] = [];

    if (negativeSentiments.includes(result.sentiment)) {
      violations.push({ parameter: "Sentiment", value: result.sentiment });
    }
    if (concerningEmotions.includes(result.emotion)) {
      violations.push({ parameter: "Emotion", value: result.emotion });
    }
    if (result.cbd !== "not_cyberbullying") {
      violations.push({ parameter: "Cyberbullying", value: result.cbd });
    }

    return violations.length > 0 ? { link: result.link, violations } : null;
  };

  const violationDetails: ViolationDetail[] = results
    .map(getViolations)
    .filter((v): v is ViolationDetail => v !== null);

  const isViolation = violationDetails.length > 0;

  // Generate draft message string based on violationDetails
  const generateDraftMessage = () => {
    if (!isViolation) return "";

    let draft = `Dear User,\n\nWe have detected the following violations in your recent posts:\n\n`;

    violationDetails.forEach((detail, idx) => {
      draft += `Post Link: ${detail.link}\n`;
      detail.violations.forEach((violation) => {
        draft += ` - ${violation.parameter}: ${violation.value}\n`;
      });
      draft += "\n";
    });

    draft +=
      "Please review your posts to comply with our community guidelines.\nThank you for your cooperation.\n\nBest regards,\nCommunity Team";

    return draft;
  };

  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-orange-400">Email Data Summary</h2>

      {results.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {results.map((res, index) => (
              <li key={index} className="bg-gray-700 p-4 rounded-lg">
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={res.link} className="text-blue-400 underline">
                    {res.link}
                  </a>
                </p>
                <p>
                  <strong>Sentiment:</strong> {res.sentiment} ({res.score.toFixed(2)})
                </p>
                <p>
                  <strong>Emotion:</strong> {res.emotion} ({res.emotionScore.toFixed(2)}%)
                </p>
                <p>
                  <strong>Cyberbullying:</strong> {res.cbd}
                </p>
                <p>
                  <strong>Text:</strong> {res.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Community Guidelines Review</h3>
            {isViolation ? (
              <SendEmail
                defaultEmail="username@gmail.com"
                defaultMessage={generateDraftMessage()}
              />
            ) : (
              <div className="text-green-400">
                <p className="font-medium mb-3">
                  ✅ All tweets comply with our community guidelines. No action is
                  required.
                </p>
                <p className="text-sm text-green-300">
                  Our analysis confirms that your online interactions are respectful,
                  appropriate, and aligned with community expectations. You have not
                  violated any social media norms. Thank you for contributing positively
                  to the platform and maintaining a safe digital environment for all
                  users.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MailAnalysis;

"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SendEmail from "./SendMail";
import ViolationDraft from "./ViolationDraft";
import WarningDraft from "./WarningDraft";
import SafeDraft from "./SafeDraft";
import { renderToStaticMarkup } from "react-dom/server";
import SummaryCard from "./SummaryCard";

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

const violatingSentiments = ["Very Negative", "Slightly Negative"];
const violatingEmotions = ["Anger", "Fear", "Sadness"];
const violatingCBD = ["religion", "age", "ethnicity", "gender"];

const MailAnalysis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state as { results: TweetAnalysisResult[] };

  const getViolations = (result: TweetAnalysisResult): ViolationDetail | null => {
    const violations: ViolationDetail["violations"] = [];

    if (violatingSentiments.includes(result.sentiment)) {
      violations.push({ parameter: "Sentiment", value: result.sentiment });
    }

    if (violatingEmotions.includes(result.emotion)) {
      violations.push({ parameter: "Emotion", value: result.emotion });
    }

    if (violatingCBD.includes(result.cbd)) {
      violations.push({ parameter: "Cyberbullying", value: result.cbd });
    }

    return violations.length > 0 ? { link: result.link, violations } : null;
  };

  const violationDetails: ViolationDetail[] = [];

  results.forEach((result) => {
    const detail = getViolations(result);
    if (detail) {
      violationDetails.push(detail);
    }
  });

  // Determine final classification:
  let emailMessage = "";

  if (violationDetails.length === 0) {
    // No tweets in violation
    emailMessage = renderToStaticMarkup(<SafeDraft />);
  } else if (violationDetails.length === results.length) {
    // All tweets are in violation
    emailMessage = renderToStaticMarkup(
      <ViolationDraft violations={violationDetails} />
    );
  } else {
    // Some tweets are in violation
    emailMessage = renderToStaticMarkup(
      <WarningDraft violations={violationDetails} />
    );
  }

  const handleChatbotStart = () => {
    navigate("/mental-health-support", {
      state: { results },
    });
  };

  return (
  <div className="p-28 text-white min-h-screen">
    {results.length === 0 ? (
      <p>No data found.</p>
    ) : (
      <>
        <h2 className="text-2xl font-bold mb-6 text-white">Summary</h2>

        <ul className="space-y-4 mb-8">
          {results.map((res, index) => (
            <SummaryCard
              key={index}
              link={res.link}
              sentiment={res.sentiment}
              score={res.score}
              emotion={res.emotion}
              emotionScore={res.emotionScore}
              cbd={res.cbd}
              text={res.text}
            />
          ))}
        </ul>

        <SendEmail
          defaultEmail="username@gmail.com"
          defaultMessage={emailMessage}
        />

        <div className="mt-30 flex justify-begin ">
          <button
            onClick={handleChatbotStart}
            className="bg-blue-600 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            Mental-Health Support
          </button>
        </div>
      </>
    )}
  </div>
);

};

export default MailAnalysis;

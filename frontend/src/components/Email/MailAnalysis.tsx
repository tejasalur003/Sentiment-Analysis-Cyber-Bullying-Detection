'use client';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SendEmail from './SendMail';
import ViolationDraft from './ViolationDraft';
import WarningDraft from './WarningDraft';
import SafeDraft from './SafeDraft';
import { renderToStaticMarkup } from 'react-dom/server';

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
    parameter: 'Sentiment' | 'Emotion' | 'Cyberbullying';
    value: string;
  }[];
}

const hardViolations = {
  sentiment: ['Very Negative'],
  emotion: ['Anger', 'Fear'],
  cbd: ['cyberbullying', 'hate', 'insult', 'threat'],
};

const mildViolations = {
  sentiment: ['Slightly Negative'],
  emotion: ['Sadness'],
  cbd: ['not_cyberbullying'],
};

const MailAnalysis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state as { results: TweetAnalysisResult[] };

  const getViolationType = (
    result: TweetAnalysisResult
  ): { type: 'hard' | 'mild' | null; detail: ViolationDetail | null } => {
    const violations: ViolationDetail['violations'] = [];
    let type: 'hard' | 'mild' | null = null;

    if (hardViolations.sentiment.includes(result.sentiment)) {
      violations.push({ parameter: 'Sentiment', value: result.sentiment });
      type = 'hard';
    } else if (mildViolations.sentiment.includes(result.sentiment)) {
      violations.push({ parameter: 'Sentiment', value: result.sentiment });
      type = type === 'hard' ? 'hard' : 'mild';
    }

    if (hardViolations.emotion.includes(result.emotion)) {
      violations.push({ parameter: 'Emotion', value: result.emotion });
      type = 'hard';
    } else if (mildViolations.emotion.includes(result.emotion)) {
      violations.push({ parameter: 'Emotion', value: result.emotion });
      type = type === 'hard' ? 'hard' : 'mild';
    }

    if (hardViolations.cbd.includes(result.cbd)) {
      violations.push({ parameter: 'Cyberbullying', value: result.cbd });
      type = 'hard';
    }

    return violations.length
      ? { type, detail: { link: result.link, violations } }
      : { type: null, detail: null };
  };

  const hardViolationsList: ViolationDetail[] = [];
  const mildViolationsList: ViolationDetail[] = [];

  results.forEach((result) => {
    const { type, detail } = getViolationType(result);
    if (detail) {
      if (type === 'hard') hardViolationsList.push(detail);
      else if (type === 'mild') mildViolationsList.push(detail);
    }
  });

  const getEmailMessage = (): string => {
    if (hardViolationsList.length > 0) {
      return renderToStaticMarkup(<ViolationDraft violations={hardViolationsList} />);
    } else if (mildViolationsList.length > 0) {
      return renderToStaticMarkup(<WarningDraft violations={mildViolationsList} />);
    } else {
      return renderToStaticMarkup(<SafeDraft />);
    }
  };

  const handleChatbotStart = () => {
    navigate('/mental-health-support', {
      state: { results }
    });
  };

  return (
    <div className="p-28 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white">Summary</h2>

      {results.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {results.map((res, index) => (
              <li key={index} className="p-6 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg">
                <p>
                  <strong>Link:</strong>{' '}
                  <a href={res.link} className="text-blue-400 underline hover:text-gray-200 transition">
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

          <SendEmail
            defaultEmail="username@gmail.com"
            defaultMessage={getEmailMessage()}
          />

          <div className="mt-10">
            <button
              onClick={handleChatbotStart}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              Mental-Health Chatbot
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MailAnalysis;

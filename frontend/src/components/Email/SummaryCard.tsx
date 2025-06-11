import React from "react";

interface SummaryCardProps {
  link: string;
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
  text: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  link,
  sentiment,
  score,
  emotion,
  emotionScore,
  cbd,
  text,
}) => {
  return (
    <li className="p-6 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg">
      <p>
        <strong>Link:</strong>{" "}
        <a
          href={link}
          className="text-blue-400 underline hover:text-gray-200 transition"
        >
          {link}
        </a>
      </p>
      <p>
        <strong>Sentiment:</strong> {sentiment} ({score.toFixed(2)})
      </p>
      <p>
        <strong>Emotion:</strong> {emotion} ({emotionScore.toFixed(2)}%)
      </p>
      <p>
        <strong>Cyberbullying:</strong> {cbd}
      </p>
      <p>
        <strong>Text:</strong> {text}
      </p>
    </li>
  );
};

export default SummaryCard;

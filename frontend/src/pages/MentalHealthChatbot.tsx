import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MessageBubble from '../components/Chatbot/MessageBubble';
import questions, { MentalHealthQuestion } from "../components/Chatbot/questions/QuestionBank";
import AssessmentReport from '../components/Chatbot/AssesmentReprot';

interface TweetAnalysisResult {
  link: string;
  text: string;
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
}

const MentalHealthChatbot: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as { results?: TweetAnalysisResult[] };
  const results: TweetAnalysisResult[] = locationState?.results || [];

  const [assessmentReady, setAssessmentReady] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chatFinished, setChatFinished] = useState(false);
  const [scores, setScores] = useState({
    depression: 0,
    anxiety: 0,
    harassment: 0,
    frustration: 0,
  });

  const chatRef = useRef<HTMLDivElement>(null);

  const optionScores = {
    'Yes': 2,
    'Probably': 1,
    'Maybe': 0,
    'Probably Not': -1,
    'No': -2,
  };

  const availableOptions = Object.keys(optionScores);

  useEffect(() => {
    initializeScores();
    const greeting = results.length
      ? "Based on your recent social media activity, we'd like to ask you a few questions to understand your mental health better."
      : "Hi there! Let's go through a few quick questions to understand how you're feeling today.";
    
    // Initialize with greeting only once
    setMessages([{ role: 'bot', text: greeting }]);

    // Ask first question immediately without timeout
    askNextQuestion(0);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const initializeScores = () => {
    let initialScores = { depression: 0, anxiety: 0, harassment: 0, frustration: 0 };

    results.forEach((res) => {
      const { sentiment, emotion, cbd } = res;

      if (sentiment === 'Extremely Negative') initialScores.depression += 2;
      else if (sentiment === 'Slightly Negative') initialScores.frustration += 1;

      if (emotion === 'Sadness') initialScores.depression += 1;
      if (emotion === 'Fear') initialScores.anxiety += 2;
      if (emotion === 'Anger') initialScores.frustration += 1;

      if (cbd !== 'not_cyberbullying') initialScores.harassment += 2;
    });

    setScores(initialScores);
  };

  const askNextQuestion = (index: number) => {
    // Only ask if we haven't reached the end
    if (index < questions.length) {
      const q = questions[index];
      setMessages((prev) => [...prev, { role: 'bot', text: q.question }]);
    }
  };

  const handleResponse = (response: string) => {
    const currentQ = questions[questionIndex];
    const score = optionScores[response as keyof typeof optionScores];
    const weight = currentQ.weight ?? 1;

    setScores((prev) => ({
      ...prev,
      [currentQ.category]: prev[currentQ.category as keyof typeof prev] + score * weight,
    }));

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: response },
    ]);

    const nextIndex = questionIndex + 1;

    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      setTimeout(() => askNextQuestion(nextIndex), 800);
    } else {
      setChatFinished(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: "Thank you for your responses. We're analyzing them to generate a detailed assessment..." },
        ]);
        setTimeout(() => setAssessmentReady(true), 1500);
      }, 1000);
    }
  };

  return (
    <div className="w-[90%] max-w-5xl mx-auto my-24 p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg font-poppins">
      <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
        <span className="mr-2">🧠</span> Mental Health Assessment
      </h2>

      <div
        ref={chatRef}
        className="w-full h-[400px] overflow-y-auto p-4 mb-4 bg-gray-800 rounded-lg text-white scrollbar-thin scrollbar-thumb-gray-600"
      >
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} message={msg.text} />
          ))}
        </div>
      </div>

      {!chatFinished && messages.length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {availableOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleResponse(option)}
              className="px-2 py-2 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-md transition 
                         text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {assessmentReady && (
        <div className="mt-6 animate-fadeIn">
          <AssessmentReport scores={scores} />
        </div>
      )}
    </div>
  );
};

export default MentalHealthChatbot;
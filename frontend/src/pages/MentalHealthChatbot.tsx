import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MessageBubble from '../components/Chatbot/MessageBubble';
import UserInput from '../components/Chatbot/UserInput';

import depressionQuestions from '../components/Chatbot/questions/depressionQuestions';
import harassmentQuestions from '../components/Chatbot/questions/harassmentQuestions';
import anxietyQuestions from '../components/Chatbot/questions/anxietyQuestions';
import frustrationQuestions from '../components/Chatbot/questions/frustrationQuestions';

interface TweetAnalysisResult {
  link: string;
  text: string;
  sentiment: string;
  score: number;
  emotion: string;
  emotionScore: number;
  cbd: string;
}

type Category = 'depression' | 'harassment' | 'anxiety' | 'frustration';

const defaultResult: TweetAnalysisResult[] = [
  {
    link: '',
    text: 'This is a sample neutral tweet.',
    sentiment: 'Neutral',
    score: 0.5,
    emotion: 'Joy',
    emotionScore: 0.5,
    cbd: 'not_cyberbullying',
  },
];

const MentalHealthChatbot: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as { results?: TweetAnalysisResult[] };
  const results: TweetAnalysisResult[] = locationState?.results || defaultResult;

  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [chatFinished, setChatFinished] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const categoryMap: { [key in Category]: string[] } = {
    depression: depressionQuestions,
    harassment: harassmentQuestions,
    anxiety: anxietyQuestions,
    frustration: frustrationQuestions,
  };

  useEffect(() => {
    detectCategories();
  }, []);

  useEffect(() => {
    if (activeCategories.length > 0 && messages.length === 0) {
      const first = categoryMap[activeCategories[categoryIndex]][questionIndex];
      addBotMessage(first);
    }
  }, [activeCategories]);

  // Scroll only the chat container when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const detectCategories = () => {
    const categories: Category[] = [];

    results.forEach((res) => {
      const { sentiment, emotion, cbd } = res;

      if (sentiment === 'Extremely Negative' || emotion === 'Sadness') {
        if (!categories.includes('depression')) categories.push('depression');
      }
      if (emotion === 'Fear' || cbd !== 'not_cyberbullying') {
        if (!categories.includes('harassment')) categories.push('harassment');
      }
      if (emotion === 'Fear' || sentiment === 'Slightly Negative') {
        if (!categories.includes('anxiety')) categories.push('anxiety');
      }
      if (sentiment === 'Slightly Negative') {
        if (!categories.includes('frustration')) categories.push('frustration');
      }
    });

    if (categories.length === 0) {
      categories.push('frustration');
    }

    setActiveCategories(categories);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'bot', text }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setResponses((prev) => [...prev, userText]);
    setInput('');

    if (userText.toLowerCase().includes('suicidal') || userText.toLowerCase().includes('self-harm')) {
      addBotMessage('If you’re in danger or feeling suicidal, please contact 988 (Suicide & Crisis Lifeline) immediately.');
    }

    const currentCat = activeCategories[categoryIndex];
    const currentQ = categoryMap[currentCat];

    if (questionIndex + 1 < currentQ.length) {
      setTimeout(() => {
        addBotMessage(currentQ[questionIndex + 1]);
        setQuestionIndex((prev) => prev + 1);
      }, 800);
    } else if (categoryIndex + 1 < activeCategories.length) {
      setTimeout(() => {
        setCategoryIndex((prev) => prev + 1);
        setQuestionIndex(0);
        addBotMessage(categoryMap[activeCategories[categoryIndex + 1]][0]);
      }, 800);
    } else {
      setTimeout(() => {
        addBotMessage('Thank you for sharing. Based on your responses and social media input, we recommend seeking professional support.');
        addBotMessage('Helpful resources:\n- Suicide Helpline: 988\n- MentalHealth.gov\n- NAMI.org');
        setChatFinished(true);
      }, 1000);
    }
  };

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-24 p-6 md:p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-md font-poppins">
  <h2 className="text-2xl font-semibold mb-6 text-white">
    🧠 Mental Health Chatbot
  </h2>

  {/* Chat Messages Container */}
  <div
    ref={chatContainerRef}
    className="w-full max-h-[400px] min-h-[200px] overflow-y-auto p-4 rounded-md text-white scrollbar-thin scrollbar-thumb-gray-600"
  >
    {messages.map((msg, idx) => (
      <MessageBubble key={idx} role={msg.role} message={msg.text} />
    ))}
  </div>

  {/* Input box */}
  {!chatFinished && (
      <UserInput value={input} onChange={setInput} onSend={handleSend} />
  )}
</div>

);

};

export default MentalHealthChatbot;

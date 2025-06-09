import React, { useEffect, useState } from 'react';
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

  const categoryMap: { [key in Category]: string[] } = {
    depression: depressionQuestions,
    harassment: harassmentQuestions,
    anxiety: anxietyQuestions,
    frustration: frustrationQuestions,
  };

  useEffect(() => {
    console.log('Received results in chatbot:', results);
    detectCategories();
  }, []);

  useEffect(() => {
    if (activeCategories.length > 0 && messages.length === 0) {
      const first = categoryMap[activeCategories[categoryIndex]][questionIndex];
      addBotMessage(first);
    }
  }, [activeCategories]);

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

    // If no results triggered anything, use neutral context
    if (categories.length === 0) {
      categories.push('frustration'); // Neutral fallback
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

    // Check for critical signs
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
        addBotMessage('Thank you for sharing. Based on your responses and any social media signals, we recommend seeking support if needed.');
        addBotMessage('Helpful resources:\n- Suicide Helpline: 988\n- MentalHealth.gov\n- NAMI.org');
        setChatFinished(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Mental Health Chatbot</h1>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} message={msg.text} />
        ))}
      </div>
      {!chatFinished && <UserInput value={input} onChange={setInput} onSend={handleSend} />}
    </div>
  );
};

export default MentalHealthChatbot;

// MessageBubble.tsx
import React from 'react';

interface Props {
  message: string;
  role: 'bot' | 'user';
}

const MessageBubble: React.FC<Props> = ({ message, role }) => (
  <div className={`mb-4 ${role === 'bot' ? 'text-left' : 'text-right'}`}>
    <div
      className={`inline-block px-4 py-3 rounded-lg max-w-[80%] text-sm sm:text-base tracking-normal leading-relaxed
        ${role === 'bot'
          ? 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'
          : 'bg-orange-600 text-white rounded-br-none'
        }`}
    >
      {message}
    </div>
  </div>
);

export default MessageBubble;
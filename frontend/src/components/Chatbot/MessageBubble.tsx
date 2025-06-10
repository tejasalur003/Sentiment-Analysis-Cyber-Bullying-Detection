import React from 'react';

interface Props {
  message: string;
  role: 'bot' | 'user';
}

const MessageBubble: React.FC<Props> = ({ message, role }) => (
  <div className={`mb-3 ${role === 'bot' ? 'text-left' : 'text-right'}`}>
    <div
      className={`inline-block px-4 py-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg text-sm sm:text-base tracking-wide leading-relaxed break-words
        ${role === 'bot'
          ? 'bg-gray-700 text-white rounded-bl-none'
          : 'bg-orange-600 text-white rounded-br-none'
        }`}
    >
      {message}
    </div>
  </div>
);

export default MessageBubble;

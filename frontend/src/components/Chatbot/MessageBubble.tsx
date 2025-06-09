import React from 'react';

interface Props {
  message: string;
  role: 'bot' | 'user';
}

const MessageBubble: React.FC<Props> = ({ message, role }) => (
  <div className={`mb-2 ${role === 'bot' ? 'text-left' : 'text-right'}`}>
    <div className={`inline-block px-4 py-2 rounded-lg ${role === 'bot' ? 'bg-blue-500' : 'bg-green-500'}`}>
      {message}
    </div>
  </div>
);

export default MessageBubble;

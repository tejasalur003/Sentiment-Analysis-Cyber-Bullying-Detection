// UserInput.tsx
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const UserInput: React.FC<Props> = ({ value, onChange, onSend }) => (
  <div className="flex items-center gap-2 mt-4">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your response..."
      className="flex-1 p-3 h-12 text-white bg-gray-800 rounded-lg border border-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
      onKeyPress={(e) => e.key === 'Enter' && onSend()}
    />
    <button
      onClick={onSend}
      className="px-4 py-3 h-12 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
);

export default UserInput;
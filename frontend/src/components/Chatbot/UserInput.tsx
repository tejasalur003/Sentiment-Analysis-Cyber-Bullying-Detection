import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const UserInput: React.FC<Props> = ({ value, onChange, onSend }) => (
  <div className="flex items-center gap-3">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your response..."
      className="flex-1 p-3 h-[48px] text-white bg-gray-800 rounded-md border border-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
    />
    <button
      onClick={onSend}
      className="px-5 py-2 h-[48px] bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-md transition duration-300"
    >
      Send
    </button>
  </div>
);

export default UserInput;

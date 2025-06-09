import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const UserInput: React.FC<Props> = ({ value, onChange, onSend }) => (
  <div className="mt-4 flex items-center gap-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 p-2 rounded bg-gray-800 text-white"
      placeholder="Type your response..."
    />
    <button onClick={onSend} className="bg-orange-600 px-4 py-2 rounded text-white">Send</button>
  </div>
);

export default UserInput;

import React from "react";

interface Loader2Props {
  timeRemaining: number;
}

const Loader2: React.FC<Loader2Props> = ({ timeRemaining }) => {
  const isCountdown = timeRemaining > 0;
  const displayText = isCountdown ? `${timeRemaining}s` : "Just a moment...";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="relative w-36 h-36">
        {/* Spinning border */}
        <div className="absolute inset-0 border-8 border-t-transparent border-orange-400 rounded-full animate-spin" />

        {/* Stationary countdown text */}
        <div className={`absolute inset-0 flex items-center justify-center text-white font-semibold ${
          isCountdown ? 'text-xl' : 'text-sm text-center px-2'
        }`}>
          {displayText}
        </div>
      </div>
    </div>
  );
};

export default Loader2;

import React from "react";

interface PointerProps {
  position: number; // Position from 0 to 1 (default 0.5)
}

const Pointer: React.FC<PointerProps> = ({ position }) => {
  return (
    <div
      className="absolute top-0 left-0 z-50 transition-all duration-500 transform -translate-x-1/2"
      style={{ left: `${position * 100}%` }}
    >
      {/* Downward Triangle */}
      <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-transparent border-t-white"></div>
    </div>
  );
};

export default Pointer;

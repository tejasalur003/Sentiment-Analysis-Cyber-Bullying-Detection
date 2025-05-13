import React from "react";
import LinkSection from "./LinkSection";
import TextSection from "./TextSection";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center gap-12 p-6 min-h-screen pt-24 bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] text-gray-100">
      
      {/* Link Input Section */}
      <LinkSection />

      {/* Divider with "OR" */}
      <div className="relative flex items-center w-[80%] max-w-4xl">
        <div className="flex-grow border-t border-blue-900"></div>
        <span className="px-6 py-1 text-white text-lg font-bold bg-white/20 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.3)] rounded-full">
          OR
        </span>
        <div className="flex-grow border-t border-blue-900"></div>
      </div>

      {/* Text Input Section */}
      <TextSection />

    </div>
  );
};

export default Hero;

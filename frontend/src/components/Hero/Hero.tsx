import React from "react";
import LinkSection from "./LinkSection";
import TextSection from "./TextSection";

const Hero = () => {
  
  return (
    <div className="w-full flex flex-col items-center gap-12 p-6 min-h-screen pt-24">
      {/* <div className="w-full flex flex-col items-center gap-12 p-6 min-h-screen pt-24 bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] text-gray-100"> PREVIOUS PLAN COLOR GRADIENT BG   */}
      
      {/* Link Input Section */}
      <LinkSection />

      {/* Divider with "OR" */}
<div className="relative flex items-center w-[90%] max-w-5xl mx-auto my-8">
  <div className="flex-grow border-t-3 border-indigo-700 opacity-50" />
  <span
    className="
      px-6 py-1 text-white text-lg font-bold
      bg-white/10 backdrop-blur-sm
      shadow-[0_0_8px_rgba(255,255,255,0.15)]
      rounded-full mx-4 select-none
    "
  >
    OR
  </span>
  <div className="flex-grow border-t-3 border-indigo-700 opacity-50" />
</div>




      {/* Text Input Section */}
      <TextSection />

    </div>
  );
};

export default Hero;

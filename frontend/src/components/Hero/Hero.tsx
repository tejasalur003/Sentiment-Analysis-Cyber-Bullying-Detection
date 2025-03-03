import React from "react";
import TextSection from "./TextSection";
import LinkSection from "./LinkSection";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 p-6 min-h-screen pt-24">
      {/* Link Section */}
      <LinkSection />

      {/* Divider with "OR" */}
      <div className="relative flex items-center w-full max-w-3xl">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 bg-white text-gray-500 text-lg font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Text Section */}
      <TextSection />
    </div>
  );
};

export default Hero;

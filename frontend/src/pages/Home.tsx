import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">
        Welcome to the Home Page
      </h1>
      <p className="text-lg text-gray-300 max-w-lg text-center">
        This is a modern-styled home page built with Tailwind CSS.
      </p>
      <button className="mt-6 px-6 py-2 bg-orange-500 text-white text-lg rounded-lg hover:bg-orange-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const TextSection: React.FC = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (!text.trim()) {
      setError("Text cannot be empty. Please enter some content.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const platform = "-";
      const content = text;

      navigate("/extracted-text", {
        state: {
          content,
          platform,
        },
      });
    } catch (error) {
      setError("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-5xl mt-6 p-10 bg-black/60 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg font-poppins mx-auto">
      <Loader isLoading={isLoading} />

      <h2 className="text-2xl font-semibold mb-4 text-gray-100 tracking-wide">
        Enter Text for Analysis
      </h2>

      <textarea
        className="
    w-full h-48 md:h-64 p-3 rounded-md 
    bg-gray-800 border border-gray-600 
    shadow-[0_2px_15px_rgba(129,140,248,0.15)]
    placeholder-gray-400 text-white 
    focus:outline-none focus:ring-2 focus:ring-white focus:border-white 
    tracking-wide transition
  "
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="
          mt-5 px-6 py-2 bg-green-600 hover:bg-green-500
          text-white font-semibold rounded-md transition duration-300 tracking-wide
        "
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="mt-3 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default TextSection;

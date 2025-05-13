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
    <div className="w-[80%] max-w-4xl p-12 bg-gray-900 text-gray-300 border border-gray-800 rounded-xl shadow-lg font-poppins mx-auto">    
      <Loader isLoading={isLoading} />

      <h2 className="text-xl font-semibold mb-3 text-gray-200 tracking-wide">Enter Text for Analysis</h2>

      <textarea
        className="w-full h-48 md:h-64 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 tracking-wide"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-5 py-2 bg-green-500 text-white font-medium text-lg rounded-lg hover:bg-green-400 transition duration-200 tracking-wide"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  );
};

export default TextSection;

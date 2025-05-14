// import React, { useState } from "react";

// const SentimentAnalyzer: React.FC = () => {
//   const [text, setText] = useState("");
//   const [sentiment, setSentiment] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const analyzeSentiment = async () => {
//     if (!text.trim()) {
//       alert("Please enter some text!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       const data = await response.json();
//       if (data.error) {
//         alert(data.error);
//       } else {
//         setSentiment(`Sentiment: ${data.sentiment} (Score: ${data.score.toFixed(4)})`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to connect to backend.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6 py-10">
//       <h1 className="text-3xl font-bold text-red-600 mb-6">Sentiment Analyzer</h1>

//       <textarea
//         className="w-full max-w-lg h-36 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//         placeholder="Enter text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <button
//         className="mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300"
//         onClick={analyzeSentiment}
//         disabled={loading}
//       >
//         {loading ? "Analyzing..." : "Analyze Sentiment"}
//       </button>

//       {sentiment && (
//         <p className="mt-4 text-lg font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md">
//           {sentiment}
//         </p>
//       )}
//     </div>
//   );
// };

// export default SentimentAnalyzer;

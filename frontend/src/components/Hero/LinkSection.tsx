// OFFICAL API TWIITER IMPLEMENTATION

// import React, { useState } from "react";

// const LinkSection: React.FC = () => {
//   const [link, setLink] = useState("");
//   const [extractedText, setExtractedText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const analyzeLink = async () => {
//     if (!link) return;

//     setIsLoading(true);
//     setExtractedText(""); // Clear previous results

//     try {
//       const response = await fetch("http://localhost:5000/scrape", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url: link }),
//       });

//       const data = await response.json();
//       setExtractedText(data.text || "No text extracted.");
//     } catch (error) {
//       setExtractedText("Error fetching text.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="w-full flex flex-col items-center gap-4 p-6">
//       <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-4">
//         <input
//           type="text"
//           className="w-full p-3 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500"
//           placeholder="Enter link..."
//           value={link}
//           onChange={(e) => setLink(e.target.value)}
//         />
//       </div>

//       <button
//         className="px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all"
//         onClick={analyzeLink}
//         disabled={isLoading}
//       >
//         {isLoading ? "Analyzing..." : "Analyze"}
//       </button>

//       {extractedText && (
//         <div className="w-full md:w-3/4 bg-gray-100 p-4 rounded-xl mt-4">
//           <h3 className="font-semibold text-lg">Extracted Text:</h3>
//           <p className="mt-2">{extractedText}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LinkSection;



import React, { useState } from "react";

const LinkSection: React.FC = () => {
  const [link, setLink] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!link.trim()) return;
    setIsLoading(true);
    setExtractedText("");

    try {
      const response = await fetch("http://localhost:5000/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link }),
      });

      const data = await response.json();
      if (data.extracted_text) {
        setExtractedText(data.extracted_text);
      } else {
        setExtractedText("Error: Unable to extract text.");
      }
    } catch (error) {
      setExtractedText("Error fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 p-6">
      <div className="w-full md:w-3/4 border-2 border-green-600 rounded-xl p-4">
        <input
          type="text"
          className="w-full p-3 border-none rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Twitter link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <button
        className="px-6 py-3 w-auto bg-green-600 text-white font-semibold text-lg rounded-xl hover:bg-green-700 transition-all"
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>

      {extractedText && (
        <div className="w-full md:w-3/4 p-4 mt-4 border-2 border-green-500 rounded-xl bg-gray-100">
          <h2 className="text-lg font-bold">Extracted Text:</h2>
          <p className="mt-2">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default LinkSection;

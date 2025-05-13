import React from "react";

interface ProfileReviewResultsProps {
  tweetLinks: string[];
}

const ProfileReviewResults: React.FC<ProfileReviewResultsProps> = ({ tweetLinks }) => {
  if (tweetLinks.length === 0) return null;

  return (
    <div className="w-[80%] max-w-4xl mx-auto mb-24 p-10 bg-gray-800 text-gray-200 rounded-xl shadow-md font-poppins">
      <h2 className="text-xl font-bold mb-6 text-orange-400">Tweet Analysis Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left border-r border-gray-600">Link</th>
              <th className="px-4 py-3 text-left border-r border-gray-600">Sentiment</th>
              <th className="px-4 py-3 text-left border-r border-gray-600">Emotion</th>
              <th className="px-4 py-3 text-left">Cyberbullying</th>
            </tr>
          </thead>
          <tbody>
            {tweetLinks.map((link, index) => (
              <tr key={index} className="hover:bg-gray-700 transition duration-150">
                <td className="px-4 py-3 border-t border-gray-700 text-blue-400 break-words max-w-[250px]">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {link}
                  </a>
                </td>
                <td className="px-4 py-3 border-t border-gray-700 text-gray-300">—</td>
                <td className="px-4 py-3 border-t border-gray-700 text-gray-300">—</td>
                <td className="px-4 py-3 border-t border-gray-700 text-gray-300">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => console.log("Analyze:", tweetLinks)}
        className="mt-6 px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition duration-200"
      >
        Analyze Tweets
      </button>
    </div>
  );
};

export default ProfileReviewResults;

import React from 'react';

const AssessmentDisclaimer = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
      <h4 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
        <span className="mr-2">ℹ️</span> Important Disclaimer
      </h4>
      <div className="space-y-2">
        <p>
          This digital wellbeing assessment is not a substitute for professional mental health advice. 
          The results are based on your self-reported experiences with technology and social media.
        </p>
        <p>
          For concerns about digital addiction, online harassment, or technology-related mental health impacts, 
          consider consulting a specialist in digital wellbeing or cyberpsychology.
        </p>
        <p className="pt-2 font-medium">
          If you're in crisis, please contact your local emergency services or crisis hotline immediately.
        </p>
      </div>
    </div>
  );
};

export default AssessmentDisclaimer;
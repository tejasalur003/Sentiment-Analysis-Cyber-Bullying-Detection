import React from 'react';

const GlobalResources = () => {
  const globalResources = [
    {
      name: "Crisis Text Line",
      description: "Free 24/7 support via text",
      url: "https://www.crisistextline.org",
      countries: "Text HOME to 741741",
      languages: "English, Spanish"
    },
    {
      name: "Befrienders Worldwide",
      description: "Emotional support worldwide",
      url: "https://www.befrienders.org",
      countries: "Local numbers available",
      languages: "Various"
    },
    {
      name: "Cyberbullying Research Center",
      description: "Resources for online harassment",
      url: "https://cyberbullying.org",
      countries: "Global",
      languages: "English"
    },
    {
      name: "Digital Wellness Institute",
      description: "Tools for healthy tech use",
      url: "https://digitalwellnessinstitute.com",
      countries: "Global",
      languages: "English"
    }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h4 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
        <span className="mr-2">🌍</span> Global Support Resources
      </h4>
      <p className="mb-4">
        These organizations specialize in digital wellbeing and online mental health support:
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {globalResources.map((resource, index) => (
          <div key={index} className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition">
            <h5 className="font-medium text-orange-300">{resource.name}</h5>
            <p className="text-sm mb-1">{resource.description}</p>
            <div className="text-xs text-gray-400 mb-1 space-y-1">
              <div>Available in: {resource.languages}</div>
              <div>Access: {resource.countries}</div>
            </div>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 text-sm underline inline-flex items-center"
            >
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalResources;
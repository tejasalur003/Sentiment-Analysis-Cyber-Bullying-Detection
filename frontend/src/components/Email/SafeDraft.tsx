import React from "react";

const SafeDraft: React.FC = () => {
  const draft = `
Dear User,

We have analyzed your recent posts and are pleased to inform you that they fully comply with our community guidelines. No violations or concerns were detected.

Thank you for contributing positively to our platform and helping us maintain a respectful and safe digital space.

Sincerely,  
SentimentAI Team
`.trim();

  return (
    <>
      {draft}
    </>
  );
};

export default SafeDraft;

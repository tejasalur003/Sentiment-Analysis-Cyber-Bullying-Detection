import React from "react";

interface ViolationDetail {
  link: string;
  violations: {
    parameter: "Sentiment" | "Emotion" | "Cyberbullying";
    value: string;
  }[];
}

interface ViolationDraftProps {
  violations: ViolationDetail[];
}

const ViolationDraft: React.FC<ViolationDraftProps> = ({ violations }) => {
  const formattedViolations = violations
    .map(
      (v, index) =>
        `Tweet ${index + 1}:\nLink: ${v.link}\n` +
        v.violations.map(vi => `- ${vi.parameter} Violation: ${vi.value}`).join("\n")
    )
    .join("\n\n");

  const draft = `
Dear User,

We have reviewed recent activities linked to your account and detected content that violates our platform's community guidelines. Below are the details of the detected violations:

${formattedViolations}

It is crucial to maintain respectful interactions, avoid offensive or aggressive language, and steer clear of any form of harassment. Repeated violations may lead to temporary or permanent restrictions on your account.

We urge you to revisit our Community Guidelines and make the necessary adjustments to your online behavior. Promoting a safe and respectful space for all users is our top priority.

Thank you for your attention.

Sincerely,  
Community Trust Team
  `.trim();

  return (
    <pre className="bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap border border-red-500">
      {draft}
    </pre>
  );
};

export default ViolationDraft;

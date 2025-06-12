import React from "react";

interface ViolationDetail {
  link: string;
  violations: {
    parameter: "Sentiment" | "Emotion" | "Cyberbullying";
    value: string;
  }[];
}

interface WarningDraftProps {
  violations: ViolationDetail[];
}

const WarningDraft: React.FC<WarningDraftProps> = ({ violations }) => {
  const formatted = violations
    .map(
      (v, index) =>
        `Post ${index + 1}:\nLink: ${v.link}\n` +
        v.violations.map(vi => `- Warning for ${vi.parameter}: ${vi.value}`).join("\n")
    )
    .join("\n\n");

  const draft = `
Dear User,

We have reviewed recent content from your account and found some posts that raise minor concerns. While these do not constitute direct violations of our community guidelines, we recommend you reconsider the tone and content of the following posts:

${formatted}

Please aim to communicate respectfully and avoid content that may be perceived as inappropriate. We appreciate your effort in maintaining a safe and inclusive environment.

Best regards,  
SentimentAI Team
`.trim();

  return (
    <>
    {draft}
    </>
  );
};

export default WarningDraft;

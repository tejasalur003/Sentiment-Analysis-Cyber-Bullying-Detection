// AssessmentReport.tsx
import React from 'react';
import GlobalResources from './GlobalResources';
import AssessmentDisclaimer from './Disclaimer';

interface Props {
  scores: {
    depression: number;
    anxiety: number;
    harassment: number;
    frustration: number;
  };
}

const getSeverityLevel = (score: number) => {
  if (score >= 5) return 'high';
  if (score >= 3) return 'moderate';
  if (score >= 1) return 'mild';
  return 'minimal';
};

const getDigitalWellnessRecommendations = (level: string, category: string) => {
  const baseRecommendations = [
    "Set daily screen time limits using your device's built-in tools",
    "Implement a 'no devices' rule 1 hour before bedtime",
    "Schedule regular digital detox periods (e.g., weekends without social media)",
    "Turn off non-essential notifications to reduce constant interruptions"
  ];

  const categorySpecific = {
    depression: [
      "Curate your social feeds to avoid negative comparison traps",
      "Replace passive scrolling with purposeful online activities"
    ],
    anxiety: [
      "Limit exposure to anxiety-triggering content/news cycles",
      "Use app blockers during high-anxiety periods"
    ],
    harassment: [
      "Review and tighten privacy settings on all platforms",
      "Consider temporary platform deactivation if harassment is severe"
    ],
    frustration: [
      "Avoid engaging in online arguments/debates when frustrated",
      "Use website blockers for known frustration triggers"
    ]
  };

  let recommendations = [...baseRecommendations];
  
  if (level === 'moderate' || level === 'high') {
    recommendations = [
      ...recommendations,
      ...categorySpecific[category as keyof typeof categorySpecific],
      "Consider using digital wellbeing apps (e.g., Freedom, Forest)"
    ];
  }

  if (level === 'high') {
    recommendations.push("Seek professional help for digital addiction if needed");
  }

  return recommendations;
};

const AssessmentReport: React.FC<Props> = ({ scores }) => {
  const depressionLevel = getSeverityLevel(scores.depression);
  const anxietyLevel = getSeverityLevel(scores.anxiety);
  const harassmentLevel = getSeverityLevel(scores.harassment);
  const frustrationLevel = getSeverityLevel(scores.frustration);

  return (
    <div className="mt-6 text-white space-y-6 animate-fadeIn">
      <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-orange-500">
        <h3 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
          <span className="mr-2">📊</span> Digital Wellbeing Assessment
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <AssessmentCategory 
              level={depressionLevel}
              category="depression"
              title="Depression"
              description={
                depressionLevel === 'high' 
                  ? "Your digital habits may be exacerbating depressive symptoms." 
                  : depressionLevel === 'moderate' 
                  ? "Your online behaviors show signs of contributing to low mood." 
                  : depressionLevel === 'mild' 
                  ? "Some digital patterns may be affecting your mood." 
                  : "Your digital habits don't appear to be negatively impacting your mood."
              }
            />

            <AssessmentCategory 
              level={anxietyLevel}
              category="anxiety"
              title="Anxiety"
              description={
                anxietyLevel === 'high' 
                  ? "Your digital usage patterns may be significantly increasing anxiety." 
                  : anxietyLevel === 'moderate' 
                  ? "Your online activities show signs of contributing to anxiety." 
                  : anxietyLevel === 'mild' 
                  ? "Some digital behaviors may be creating mild anxiety." 
                  : "Your digital habits don't appear to be causing anxiety."
              }
            />
          </div>

          <div className="space-y-4">
            <AssessmentCategory 
              level={harassmentLevel}
              category="harassment"
              title="Harassment"
              description={
                harassmentLevel === 'high' 
                  ? "You're experiencing significant online harassment that requires action." 
                  : harassmentLevel === 'moderate' 
                  ? "Your online experiences include concerning harassment elements." 
                  : harassmentLevel === 'mild' 
                  ? "Some harassment-related concerns are present in your digital life." 
                  : "No significant digital harassment concerns were indicated."
              }
            />

            <AssessmentCategory 
              level={frustrationLevel}
              category="frustration"
              title="Frustration"
              description={
                frustrationLevel === 'high' 
                  ? "Your digital interactions are creating high frustration levels." 
                  : frustrationLevel === 'moderate' 
                  ? "Online activities are contributing to notable frustration." 
                  : frustrationLevel === 'mild' 
                  ? "Some digital experiences are causing mild frustration." 
                  : "Your digital interactions aren't causing significant frustration."
              }
            />
          </div>
        </div>
      </div>

      <GlobalResources />
      <AssessmentDisclaimer />
    </div>
  );
};

interface AssessmentCategoryProps {
  level: string;
  category: string;
  title: string;
  description: string;
}

const AssessmentCategory: React.FC<AssessmentCategoryProps> = ({ 
  level, 
  category, 
  title, 
  description 
}) => {
  const bgColorClass = level === 'high' 
    ? 'bg-red-900/30' 
    : level === 'moderate' 
    ? 'bg-orange-900/30' 
    : 'bg-gray-700/30';

  return (
    <div className={`p-4 rounded-lg ${bgColorClass}`}>
      <h4 className="font-medium text-lg mb-2">
        {title}: <span className="uppercase">{level}</span>
      </h4>
      <p className="mb-3">{description}</p>
      {level !== 'minimal' && (
        <div className="mt-3">
          <h5 className="font-medium mb-1">Digital Wellness Tips:</h5>
          <ul className="list-disc pl-5 space-y-1">
            {getDigitalWellnessRecommendations(level, category).map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssessmentReport;
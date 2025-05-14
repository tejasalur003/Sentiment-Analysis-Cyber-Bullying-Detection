
export interface EmotionScores {
  [emotion: string]: number;
}

export const predictEmotion = async (text: string): Promise<EmotionScores> => {
  const response = await fetch("http://localhost:5000/predict-emotion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch emotion analysis from backend.");
  }

  const data = await response.json();
  return data;
};

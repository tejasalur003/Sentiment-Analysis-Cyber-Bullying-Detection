
export interface SentimentResponse {
  sentiment: string;
  score: number;
}

export const predictSentiment = async (text: string): Promise<SentimentResponse> => {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Sentiment analysis failed");
  }

  const data = await response.json();

  return {
    sentiment: data.sentiment,
    score: parseFloat(data.score.toFixed(4)),
  };
};

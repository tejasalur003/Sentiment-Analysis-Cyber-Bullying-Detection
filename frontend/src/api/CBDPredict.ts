
export const predictCyberbullying = async (text: string): Promise<string> => {
  const response = await fetch("http://localhost:5000/cbd_predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction from backend.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.prediction;
};

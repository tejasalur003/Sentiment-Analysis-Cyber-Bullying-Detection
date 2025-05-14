
export interface PostScrapeResponse {
  content: string;
}

export const postScrape = async (url: string): Promise<PostScrapeResponse> => {
  const response = await fetch("http://localhost:5000/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

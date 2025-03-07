
# OFFICAL TWIITER API IMPLEMENTATION - 1 TWEET PER 15MINS

# import requests
# from bs4 import BeautifulSoup

# def extract_text(url):
#     """Extracts text from a given webpage."""
#     try:
#         headers = {"User-Agent": "Mozilla/5.0"}
#         response = requests.get(url, headers=headers)
        
#         if response.status_code != 200:
#             return f"Failed to fetch the page: {response.status_code}"

#         soup = BeautifulSoup(response.text, "html.parser")

#         # Extract relevant text (Twitter needs authentication, but works for blogs, news, etc.)
#         text_content = " ".join([p.get_text() for p in soup.find_all("p")])
        
#         return text_content if text_content else "No readable text found on page."
    
#     except Exception as e:
#         return str(e)


# UNOFFICAL IMPLEMENTATION

# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager

# def extract_tweet_text(tweet_url):
#     """Extracts text from a Twitter (X) post."""
    
#     options = webdriver.ChromeOptions()
#     options.add_argument("--headless")  # Run in background
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")
#     options.add_argument("--disable-dev-shm-usage")

#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
#     driver.get(tweet_url)

#     driver.implicitly_wait(10)  # Wait for elements to load

#     try:
#         # Extract tweet text
#         tweet_text = driver.find_element(By.CSS_SELECTOR, "div[data-testid='tweetText']").text
#     except Exception as e:
#         tweet_text = f"Error extracting tweet: {e}"

#     driver.quit()
#     return tweet_text


import re
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def identify_platform(url):
    """Identify the social media platform from the URL."""
    if "twitter.com" in url or "x.com" in url:
        return "twitter"
    elif "reddit.com" in url:
        return "reddit"
    else:
        return "unknown"

def extract_twitter_text(tweet_url):
    """Extract text from a Twitter (X) post using Selenium."""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(tweet_url)

    driver.implicitly_wait(10)

    try:
        tweet_text = driver.find_element(By.CSS_SELECTOR, "div[data-testid='tweetText']").text
    except Exception as e:
        tweet_text = f"Error extracting tweet: {e}"

    driver.quit()
    return tweet_text

def extract_reddit_text(reddit_url):
    """Extract the main text from a Reddit post using Reddit API."""
    if not reddit_url.endswith(".json"):
        reddit_url = reddit_url.rstrip("/") + ".json"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(reddit_url, headers=headers)

        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        reddit_data = response.json()
        post_data = reddit_data[0]["data"]["children"][0]["data"]

        title = post_data.get("title", "Title not found.")
        content = post_data.get("selftext", "No post content available.")

        return f"Title: {title}\n\nContent: {content}"

    except Exception as e:
        return f"Error extracting Reddit post: {e}"

def scrape_content(url):
    """Determine the platform and apply the correct scraper."""
    platform = identify_platform(url)

    if platform == "twitter":
        return extract_twitter_text(url)
    elif platform == "reddit":
        return extract_reddit_text(url)
    else:
        return "Unsupported platform."

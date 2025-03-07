
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

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def extract_tweet_text(tweet_url):
    """Extracts text from a Twitter (X) post."""
    
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run in background
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(tweet_url)

    driver.implicitly_wait(10)  # Wait for elements to load

    try:
        # Extract tweet text
        tweet_text = driver.find_element(By.CSS_SELECTOR, "div[data-testid='tweetText']").text
    except Exception as e:
        tweet_text = f"Error extracting tweet: {e}"

    driver.quit()
    return tweet_text

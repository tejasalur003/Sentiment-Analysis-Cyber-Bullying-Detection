from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import requests

def get_latest_tweets(user_url: str, num: int) -> list:
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(user_url)

        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '//article[@data-testid="tweet"]'))
        )

        driver.execute_script("window.scrollTo(0, 500)")
        time.sleep(2)

        tweets = driver.find_elements(By.XPATH, '//article[@data-testid="tweet"]')
        tweet_links = []

        for tweet in tweets[:num]:
            try:
                links = tweet.find_elements(By.XPATH, './/a[contains(@href, "/status/")]')
                if links:
                    tweet_link = links[0].get_attribute('href')
                    if tweet_link not in tweet_links:
                        tweet_links.append(tweet_link)
            except Exception as e:
                print(f"Error extracting tweet link: {e}")
                continue

        return tweet_links[:num]

    except Exception as e:
        print(f"Error occurred: {e}")
        return []

    finally:
        driver.quit()


import requests

def extract_latest_reddit_posts(user_url, post_limit=3):
    if not user_url.endswith(".json"):
        user_url = user_url.rstrip("/") + ".json"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(user_url, headers=headers)
        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        user_data = response.json()
        posts = user_data["data"]["children"]

        if not posts:
            return "No posts found for this user."

        extracted_posts = []
        for post in posts[:post_limit]:
            data = post["data"]
            selftext = data.get("selftext", "").strip()
            permalink = data.get("permalink", "")
            full_link = f"https://www.reddit.com{permalink}" if permalink else None
            content = selftext if selftext else None

            if full_link or content:
                extracted_posts.append({
                    "link": full_link,
                    "text": content
                })

        return extracted_posts

    except Exception as e:
        return f"Error extracting user posts: {e}"



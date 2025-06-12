from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage

from Models.model import predict_sentiment
# from WebScraper.scraper import extract_text  # OFFICIAL IMPLEMENTAION
# from WebScraper.scraper import extract_tweet_text
from WebScraper.scraper import scrape_content
from Models.cbd_predict import predict_cyberbullying
from Models.cbd_predict import predict_cyberbullying_all
from Models.emotion_predict import predict_emotion_detailed
from WebScraper.profile_scrapper import get_latest_tweets, extract_latest_reddit_posts

app = Flask(__name__)
CORS(app)  # Allow frontend requests

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for predicting sentiment."""
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = predict_sentiment(text)
    return jsonify(result)

# @app.route('/scrape', methods=['POST'])
# def scrape():
#     """API endpoint for web scraping text from a given URL."""
#     data = request.get_json()
#     url = data.get("url", "")

#     if not url:
#         return jsonify({"error": "No URL provided"}), 400

#     extracted_text = extract_text(url)
#     return jsonify({"text": extracted_text})



# @app.route('/scrape', methods=['POST'])
# def scrape():
#     """API endpoint for extracting text from Twitter."""
#     data = request.get_json()
#     url = data.get("url", "")

#     if not url:
#         return jsonify({"error": "No URL provided"}), 400

#     extracted_text = extract_tweet_text(url)
#     return jsonify({"extracted_text": extracted_text})

@app.route('/scrape', methods=['POST'])
def scrape():
    """API endpoint to scrape social media post content."""
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    content = scrape_content(url)
    return jsonify({"content": content})

@app.route('/cbd_predict', methods=['POST'])
def cbd_predict():
    try:
        data = request.get_json()
        text = data.get("text", "")
        
        if not text:
            return jsonify({"error": "No input text provided"}), 400
        
        prediction = predict_cyberbullying(text)
        
        return jsonify({"prediction": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/cbd_predict_all', methods=['POST'])
def cbd_predict_all():
    try:
        data = request.get_json()
        text = data.get("text", "")
        
        if not text:
            return jsonify({"error": "No input text provided"}), 400
        
        prediction = predict_cyberbullying_all(text)
        
        return jsonify({"prediction": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/predict-emotion', methods=['POST'])
def predict_emotion():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error": "Missing 'text' in request"}), 400

    text = data['text']
    scores = predict_emotion_detailed(text)

    return jsonify(scores)

@app.route('/profile-review', methods=['POST'])
def profile_review():
    data = request.get_json()
    user_url = data.get('url')
    num = data.get('num', 3)

    if not user_url or not isinstance(num, int):
        return jsonify({"error": "Missing or invalid 'url' or 'num' parameters"}), 400

    try:
        user_url = user_url.strip().lower()

        if "twitter.com" in user_url or "x.com" in user_url:
            tweets = get_latest_tweets(user_url, num)
            return jsonify({
                "platform": "twitter",
                "tweet_links": tweets
            })

        elif "reddit.com" in user_url:
            posts = extract_latest_reddit_posts(user_url, num)

            if isinstance(posts, str):  # If error or no posts message was returned as a string
                return jsonify({
                    "platform": "reddit",
                    "error": posts
                }), 400

            return jsonify({
                "platform": "reddit",
                "posts": posts  # List of {"link": ..., "text": ...}
            })

        else:
            return jsonify({
                "error": "Unsupported platform. Provide a valid Reddit or Twitter/X URL."
            }), 400

    except Exception as e:
        return jsonify({
            "error": f"Error processing profile: {str(e)}"
        }), 500



SENDER_EMAIL = os.getenv("EMAIL_USER")
SENDER_PASSWORD = os.getenv("EMAIL_PASS")

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    receiver_email = data.get('receiver_email')
    message_body = data.get('message')

    if not receiver_email or not message_body:
        return jsonify({"error": "Missing email or message"}), 400

    try:
        msg = EmailMessage()
        msg['Subject'] = "Message from React App"
        msg['From'] = SENDER_EMAIL
        msg['To'] = receiver_email
        msg.set_content(message_body)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
            smtp.send_message(msg)

        return jsonify({"success": True}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)

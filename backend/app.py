from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from model import predict_sentiment
# from WebScraper.scraper import extract_text  # OFFICIAL IMPLEMENTAION
from WebScraper.scraper import extract_tweet_text

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



@app.route('/scrape', methods=['POST'])
def scrape():
    """API endpoint for extracting text from Twitter."""
    data = request.get_json()
    url = data.get("url", "")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    extracted_text = extract_tweet_text(url)
    return jsonify({"extracted_text": extracted_text})


if __name__ == '__main__':
    app.run(debug=True, port=5000)

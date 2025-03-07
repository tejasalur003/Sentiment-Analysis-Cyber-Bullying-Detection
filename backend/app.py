from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from model import predict_sentiment

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for predicting sentiment."""
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = predict_sentiment(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

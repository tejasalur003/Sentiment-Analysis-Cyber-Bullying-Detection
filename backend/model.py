import numpy as np
import string
import re
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import os

# Define the base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the trained model
MODEL_PATH = os.path.join(BASE_DIR, "sentiment_model.h5")
TOKENIZER_PATH = os.path.join(BASE_DIR, "tokenizer.pkl")

model = load_model(MODEL_PATH)

# Load the tokenizer
with open(TOKENIZER_PATH, "rb") as f:
    tokenizer = pickle.load(f)

# Preprocessing function
translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))
clean = re.compile(r'<[^>]+>')

def clean_text(text):
    """Clean and preprocess the input text."""
    text = text.lower().replace('\n', '')
    text = clean.sub('', text)
    text = text.translate(translator)
    return text

def predict_sentiment(review):
    """Predict sentiment of the given review text."""
    max_words = 100  # Must match the max_words used during training

    review_clean = clean_text(review)
    review_seq = tokenizer.texts_to_sequences([review_clean])
    review_pad = pad_sequences(review_seq, maxlen=max_words, padding='post')

    prediction = model.predict(review_pad)[0][0]  # Get probability score

    # Define sentiment categories based on score
    if prediction < 0.2:
        sentiment = "Extremely Negative"
    elif 0.2 <= prediction < 0.4:
        sentiment = "Slightly Negative"
    elif 0.4 <= prediction < 0.6:
        sentiment = "Neutral"
    elif 0.6 <= prediction < 0.8:
        sentiment = "Slightly Positive"
    else:
        sentiment = "Very Positive"

    return {"sentiment": sentiment, "score": float(prediction)}


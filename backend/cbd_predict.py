import tensorflow as tf
import numpy as np
import re
import nltk
import json
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load trained model and tokenizer
model = tf.keras.models.load_model('cyberbullying-multiclass.h5')

with open("tokenizer.json", "r") as file:
    tokenizer_json = file.read()
tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(tokenizer_json)

label_mapping = np.load("label_mapping.npy", allow_pickle=True).item()  # Load label encoding

# Ensure NLTK stopwords are downloaded
nltk.download('stopwords')

#Define text preprocessing function
def preprocess_text(text):
    stopwords = set(nltk.corpus.stopwords.words('english')) | set(chr(i) for i in range(97, 123))
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'http\S+', '', text)  # Remove URLs
    text = re.sub(r"\s+", " ", text)  # Remove extra spaces
    text = re.sub(r"\n", "", text)  # Remove newlines
    text = re.sub(r"[^a-z ]", "", text)  # Remove non-alphabetic characters
    text = ' '.join([word for word in text.split() if word not in stopwords])  # Remove stopwords
    return text

# Define prediction function
def predict_cyberbullying(text):
    preprocessed_text = preprocess_text(text)
    sequence = tokenizer.texts_to_sequences([preprocessed_text])
    padded_sequence = pad_sequences(sequence, maxlen=100, padding='post', truncating='post')

    predictions = model.predict(padded_sequence)[0]  # Get probabilities
    predicted_class = np.argmax(predictions)  # Get highest probability class
    predicted_category = label_mapping[predicted_class]  # Get category name

    return predicted_category


# def preprocess_text(text):
#     stopwords = set(nltk.corpus.stopwords.words("english")) | set(chr(i) for i in range(97, 123))
#     text = text.lower()  # Convert to lowercase
#     text = re.sub(r"http\S+", "", text)  # Remove URLs
#     text = re.sub(r"\s+", " ", text)  # Remove extra spaces
#     text = re.sub(r"\n", "", text)  # Remove newlines
#     text = re.sub(r"[^a-z ]", "", text)  # Remove non-alphabetic characters
#     text = " ".join([word for word in text.split() if word not in stopwords])  # Remove stopwords
#     return text

# Define prediction function
# def predict_cyberbullying(text):
#     preprocessed_text = preprocess_text(text)
#     sequence = tokenizer.texts_to_sequences([preprocessed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=100, padding="post", truncating="post")

#     predictions = model.predict(padded_sequence)[0]  # Get probabilities
#     predicted_class_index = np.argmax(predictions)  # Get highest probability class
#     predicted_category = label_mapping[predicted_class_index]  # Get category name
#     confidence_score = float(predictions[predicted_class_index])  # Confidence of prediction

#     # Convert probabilities into a dictionary
#     category_probabilities = {label_mapping[i]: float(predictions[i]) for i in range(len(predictions))}

#     return {
#         "text": text,
#         "predicted_class": predicted_category,
#         "confidence": confidence_score,
#         "probabilities": category_probabilities,
#     }
import numpy as np
import string
import re
import pandas as pd
import os
import pickle
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, Conv1D, MaxPool1D, Dropout, Flatten, Dense
from tensorflow.keras.optimizers import Adam

# Load Dataset
data = pd.read_csv('imdb.csv')
df = data.copy()
df.sentiment = df.sentiment.map({'negative': 0, 'positive': 1})

# Extract text and labels
text = df.review.tolist()
label = df.sentiment.tolist()

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(text, label, test_size=0.2, random_state=1)

# Text Preprocessing
translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))
clean = re.compile(r'<[^>]+>')

def clean_text(text_list):
    cleaned_texts = []
    for text in text_list:
        tmp_text = text.lower().replace('\n', '')
        tmp_text = clean.sub('', tmp_text)
        tmp_text = tmp_text.translate(translator)
        cleaned_texts.append(tmp_text)
    return cleaned_texts

X_train_clean = clean_text(X_train)
X_test_clean = clean_text(X_test)

# Tokenization
top_words = 40000  # Set vocabulary size
tokenizer = Tokenizer(num_words=top_words)
tokenizer.fit_on_texts(X_train_clean)

X_train = tokenizer.texts_to_sequences(X_train_clean)
X_test = tokenizer.texts_to_sequences(X_test_clean)

# Padding sequences
max_words = 100
X_train = pad_sequences(X_train, maxlen=max_words, padding='post')
X_test = pad_sequences(X_test, maxlen=max_words, padding='post')

# Convert labels to NumPy arrays
y_train = np.array(y_train, dtype=np.float32)
y_test = np.array(y_test, dtype=np.float32)

# Convert inputs to int32
X_train = X_train.astype(np.int32)
X_test = X_test.astype(np.int32)

# Model Definition
model = Sequential([
    Embedding(input_dim=top_words, output_dim=32, input_length=max_words),
    Conv1D(256, 3, activation='relu', padding='same'),
    MaxPool1D(2),
    Dropout(0.2),
    Conv1D(128, 3, activation='relu', padding='same'),
    MaxPool1D(2),
    Dropout(0.2),
    Flatten(),
    Dense(250, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile & Train
model.compile(loss='binary_crossentropy', optimizer=Adam(), metrics=['accuracy'])
model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=5, batch_size=128, verbose=2)

# Save Model and Tokenizer
model.save("sentiment_model.h5")  # Save trained model
with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)  # Save tokenizer

print("Model and Tokenizer Saved Successfully!")

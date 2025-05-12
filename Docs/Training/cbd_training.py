import pandas as pd
import numpy as np
import tensorflow as tf
import re
import nltk
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Download required NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords

# Load dataset
df = pd.read_csv("cyberbullying_tweets.csv")

# Drop records where cyberbullying_type is "other_cyberbullying"
df = df[df.cyberbullying_type != "other_cyberbullying"]

# Get unique labels and encode them
label_encoder = LabelEncoder()
df["cyberbullying_type"] = label_encoder.fit_transform(df["cyberbullying_type"])
num_classes = len(label_encoder.classes_)  # Number of unique classes

# Save label encoding mapping for future use
label_mapping = {index: label for index, label in enumerate(label_encoder.classes_)}
np.save("label_mapping.npy", label_mapping)

# Preprocess text data
stopwords_set = set(stopwords.words('english')) | set(chr(i) for i in range(97, 123))

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)  # Remove URLs
    text = re.sub(r"\s+", " ", text)  # Remove extra spaces
    text = re.sub(r"\n", "", text)  # Remove newlines
    text = re.sub(r"[^A-Za-z ]", "", text)  # Remove non-alphabetic characters
    text = ' '.join([word for word in text.split() if word not in stopwords_set])  # Remove stopwords
    return text

df["clean_text"] = df["tweet_text"].apply(preprocess_text)

# Convert text and labels into NumPy arrays
x = df["clean_text"].values.astype(str)
y = df["cyberbullying_type"].values

# Split data
x_train, x_temp, y_train, y_temp = train_test_split(x, y, test_size=0.4, stratify=y)
x_val, x_test, y_val, y_test = train_test_split(x_temp, y_temp, test_size=0.25, stratify=y_temp)

# Tokenize and pad sequences
tokenizer = Tokenizer(num_words=2000, oov_token="<OOV>")
tokenizer.fit_on_texts(x)
word_index = tokenizer.word_index

x_train = pad_sequences(tokenizer.texts_to_sequences(x_train), maxlen=100, padding='post', truncating='post')
x_val = pad_sequences(tokenizer.texts_to_sequences(x_val), maxlen=100, padding='post', truncating='post')
x_test = pad_sequences(tokenizer.texts_to_sequences(x_test), maxlen=100, padding='post', truncating='post')

# Convert labels to categorical (one-hot encoding)
y_train = tf.keras.utils.to_categorical(y_train, num_classes)
y_val = tf.keras.utils.to_categorical(y_val, num_classes)
y_test = tf.keras.utils.to_categorical(y_test, num_classes)

# Define LSTM model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(2000, 64),  # Embedding layer
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64, dropout=0.2, recurrent_dropout=0.2)),  # LSTM layer
    tf.keras.layers.Dropout(rate=0.2),  # Dropout layer
    tf.keras.layers.Dense(64, activation='swish'),  # Fully connected layer
    tf.keras.layers.Dense(num_classes, activation='softmax')  # Multi-class output layer
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train model
early_stopping_monitor = EarlyStopping(patience=2)
history = model.fit(x_train, y_train, epochs=10, validation_data=(x_val, y_val), callbacks=[early_stopping_monitor])

# Save model and tokenizer
model.save('cyberbullying-multiclass.h5')
import json
with open("tokenizer.json", "w") as file:
    file.write(tokenizer.to_json())

# Evaluate model
# from sklearn.metrics import classification_report, confusion_matrix
# import seaborn as sns
# import matplotlib.pyplot as plt

# y_test_labels = np.argmax(y_test, axis=1)
# y_pred = np.argmax(model.predict(x_test), axis=1)

# # Classification Report
# print("Classification Report:\n", classification_report(y_test_labels, y_pred, target_names=label_encoder.classes_))

# # Confusion Matrix
# cm = confusion_matrix(y_test_labels, y_pred)

# plt.figure(figsize=(8, 6))
# sns.heatmap(cm, annot=True, fmt='d', cmap='Oranges', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
# plt.xlabel("Predicted")
# plt.ylabel("Actual")
# plt.title("Confusion Matrix")
# plt.show()

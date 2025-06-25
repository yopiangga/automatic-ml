# flask api for serving the model
from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model  
import pandas as pd
import datetime

app = Flask(__name__)
# Load the pre-trained model
model = load_model("models/lstm_model.h5")
# Load the scaler
scaler = pd.read_csv("data/emas_scaled.csv", index_col=0)
# Define the time step
time_step = 60

def preprocess_input(data):
    """
    Preprocess the input data for prediction.
    """
    # Convert the input data to a DataFrame
    df = pd.DataFrame(data, columns=['buy'])
    # Convert 'date' to datetime and set as index
    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace=True)
    # Sort by date
    df = df.sort_index()
    # Scale the data
    scaled_data = scaler.transform(df)
    return scaled_data

def create_dataset(dataset, time_step=time_step):
    """
    Create dataset for LSTM model.
    """
    X, y = [], []
    for i in range(time_step, len(dataset)):
        X.append(dataset[i - time_step:i, 0])
        y.append(dataset[i, 0])
    return np.array(X), np.array(y)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict the next value based on the input data.
    """
    try:
        # Get the input data from the request
        input_data = request.json['data']
        # Preprocess the input data
        scaled_data = preprocess_input(input_data)
        # Create dataset for prediction
        X, _ = create_dataset(scaled_data, time_step)
        X = X.reshape((X.shape[0], X.shape[1], 1))
        # Make prediction
        prediction = model.predict(X)
        # Inverse transform the prediction to get the actual value
        predicted_value = scaler.inverse_transform(prediction)
        return jsonify({'prediction': predicted_value.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/') 
def index():
    """
    Index route to check if the API is running.
    """
    return jsonify({'message': 'LSTM Model API is running!'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
# Note: In production, set debug=False and use a production-ready server like Gunicorn or uWSGI.
# Also, ensure to handle CORS if the API will be accessed from a different domain.
# You can use Flask-CORS for that:
# from flask_cors import CORS
# CORS(app)
# This will allow cross-origin requests to your API.    
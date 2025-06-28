import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

import sys
sys.path.append("..")
from config.general import time_step, future_step

class Predictor:
    def __init__(self, current_date):
        self.current_date = current_date
        self.model = load_model(f"models/{current_date}/model.h5")
        self.scaler = MinMaxScaler(feature_range=(0, 1))

    def load_data(self):
        df_emas = pd.read_csv(f"data/{self.current_date}/emas.csv")
        df_emas = df_emas[["buy", "updated_at"]]
        df_emas.rename(columns={'updated_at': 'date'}, inplace=True)
        df_emas["date"] = pd.to_datetime(df_emas["date"]).dt.date
        df_emas.set_index('date', inplace=True)
        data = df_emas.sort_values(by='date')
        return data

    def predict(self, data):
        # Scale the data
        scaled_data = self.scaler.fit_transform(data)
        temp_scaled_data = scaled_data.copy()
        predicted_prices = []

        for i in range(0, future_step):
            x = temp_scaled_data[-time_step:].reshape(1, time_step, 1)
            predicted_price = self.model.predict(x)[0][0]
            temp_scaled_data = np.append(temp_scaled_data, [[predicted_price]], axis=0)
            predicted_prices.append(predicted_price)

        # Convert predictions back to original scale
        predicted_prices = np.array(predicted_prices).reshape(-1, 1)
        predicted_prices = self.scaler.inverse_transform(predicted_prices)
        predicted_prices = predicted_prices.flatten()
        return predicted_prices
    
    def save_predictions(self, predictions, data):
        df_predictions = pd.DataFrame(predictions, columns=['Predicted Price'])
        df_predictions['Date'] = pd.date_range(start=data.index[-1] + pd.Timedelta(days=1), periods=future_step)
        df_predictions.to_csv(f"data/{self.current_date}/predicted_prices.csv", index=False)
        return df_predictions
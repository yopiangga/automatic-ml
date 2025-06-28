
import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

import sys
sys.path.append("..")
from config.general import time_step, len_train_pct

class TrainModel:
    def __init__(self, current_date=""):
        self.current_date = current_date
        self.x_file = f"data/{current_date}/X.npy"
        self.y_file = f"data/{current_date}/y.npy"

    def load_data(self):
        X = np.load(self.x_file)
        y = np.load(self.y_file)
        return X, y

    def split_data(self, X, y):
        split = int(len(X) * len_train_pct)
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]
        return X_train, X_test, y_train, y_test

    def train(self, X_train, y_train, X_test, y_test, epochs=20, batch_size=32):
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(time_step, 1)),
            Dropout(0.2),
            LSTM(50),
            Dropout(0.2),
            Dense(1)
        ])

        model.compile(optimizer='adam', loss='mean_squared_error')
        model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, verbose=1)

        loss = model.evaluate(X_test, y_test, verbose=1)
        print(f"Test Loss: {loss}")

        model.save(f"models/{self.current_date}/model.h5")
        return model

import numpy as np
import pandas as pd
import sys
sys.path.append("..")
from config.general import time_step

def create_dataset(dataset, time_step=time_step):
    X, y = [], []
    for i in range(time_step, len(dataset)):
        X.append(dataset[i - time_step:i, 0])
        y.append(dataset[i, 0])
    return np.array(X), np.array(y)

class FeatureEngineering:
    def __init__(self, emas_file="data/emas_scaled.csv"):
        self.emas_file = emas_file

    def load_data(self):
        df_emas = pd.read_csv(self.emas_file, index_col=0)
        return df_emas
    
    def create_features(self, df):
        df = df.values
        X, y = create_dataset(df, time_step)
        X = X.reshape((X.shape[0], X.shape[1], 1))
        return X, y
    
    def save_features(self, X, y, current_date="data"):
        np.save(f"data/{current_date}/X.npy", X)
        np.save(f"data/{current_date}/y.npy", y)
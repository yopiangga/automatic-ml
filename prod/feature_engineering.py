import numpy as np
import pandas as pd

scaled_data = pd.read_csv("data/emas_scaled.csv", index_col=0)
time_step = 60

def create_dataset(dataset, time_step=time_step):
    X, y = [], []
    for i in range(time_step, len(dataset)):
        X.append(dataset[i - time_step:i, 0])
        y.append(dataset[i, 0])
    return np.array(X), np.array(y)

X, y = create_dataset(scaled_data, time_step)
X = X.reshape((X.shape[0], X.shape[1], 1))

# Save the processed data for model training
np.save("data/X.npy", X)
np.save("data/y.npy", y)    
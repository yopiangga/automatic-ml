import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import datetime
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

import sys
sys.path.append("..")

class Evaluate:
    def __init__(self, current_date, last_time):
        self.current_date = current_date
        self.last_time = last_time
    
    def load_data(self):
        df_emas = pd.read_csv(f"data/{self.current_date}/emas.csv")
        df_emas = df_emas[["buy", "updated_at"]]
        df_emas.rename(columns={'updated_at': 'date'}, inplace=True)

        df_emas["date"] = df_emas["date"].apply(lambda x: datetime.datetime.strptime(x[:10], "%Y-%m-%d"))

        data = df_emas.sort_values(by='date', ascending=True)
        actual = data[-7:]
        actual["date"] = actual["date"].astype("str")

        predict = pd.read_csv(f"data/{self.last_time}/predicted_prices.csv")
        predict = predict.rename(columns={"Predicted Price": "predict"})

        return actual, predict

    def compare(self, actual, predict):
        combine = pd.merge(actual, predict, left_on='date', right_on='Date', how='inner')
        combine = combine[["date", "buy", "predict"]]
        combine["error"] = abs(combine["buy"] - combine["predict"])

        combine.to_csv(f"data/{self.last_time}/evaluate_prices.csv")

        mae = mean_absolute_error(combine["buy"], combine["predict"])
        mse = mean_squared_error(combine["buy"], combine["predict"])
        r2 = r2_score(combine["buy"], combine["predict"])

        evaluate = pd.DataFrame()
        evaluate["mae"] = [mae]
        evaluate["mse"] = [mse]
        evaluate["r2"] = [r2]

        evaluate.to_csv(f"data/{self.last_time}/evaluate.csv", index=False)



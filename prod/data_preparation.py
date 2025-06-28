import pandas as pd
import datetime
from sklearn.preprocessing import MinMaxScaler

class DataPreparer:
    def __init__(self, emas_file="data/emas.csv"):
        self.emas_file = emas_file

    def load_data(self):
        df_emas = pd.read_csv(self.emas_file)
        df_emas = df_emas[["buy", "updated_at"]]
        df_emas.rename(columns={'updated_at': 'date'}, inplace=True)
        return df_emas

    def preprocess_data(self, df):
        df["date"] = df["date"].apply(lambda x: datetime.datetime.strptime(x[:10], "%Y-%m-%d"))
        df = df.set_index('date')
        df = df.sort_values(by='date')

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(df)
        scaled_df = pd.DataFrame(scaled_data, columns=df.columns, index=df.index)
        return scaled_df

    def save_data(self, df, output_file="data/emas_scaled.csv"):
        df.to_csv(output_file, index=True)
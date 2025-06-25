import pandas as pd
import datetime
from sklearn.preprocessing import MinMaxScaler

df_emas = pd.read_csv("data/emas.csv")
df_emas = pd.DataFrame(df_emas["data"]["history"])
df_emas = df_emas[["buy", "updated_at"]]
df_emas.rename(columns={'updated_at': 'date'}, inplace=True)

df_emas["date"] = df_emas["date"].apply(lambda x: datetime.datetime.strptime(x[:10], "%Y-%m-%d"))
df_emas = df_emas.set_index('date')
data = df_emas.sort_values(by='date')

scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data)

scaled_df = pd.DataFrame(scaled_data, columns=data.columns, index=data.index)
scaled_df.to_csv("data/emas_scaled.csv", index=True)
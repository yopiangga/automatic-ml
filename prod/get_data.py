import pandas as pd

df_emas = pd.read_json("https://pluang.com/api/asset/gold/pricing?daysLimit=4001")
df_emas.to_csv("data/emas.csv", index=False)
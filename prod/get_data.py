import pandas as pd
import sys
sys.path.append("..")
from config.general import data_url

class GetData:
    def __init__(self, date):
        self.date = date

    def main(self):
        df_emas = pd.read_json(data_url)
        df_emas = pd.DataFrame(df_emas["data"]["history"])

        df_emas.to_csv("data/" + self.date + "/emas.csv", index=False)
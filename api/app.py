# flask api for serving the model
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import datetime
import os

app = Flask(__name__)

@app.route('/evaluate')
def evaluate():
    try:
        list_dir = os.listdir("../data")
        if not list_dir:
            return jsonify({'error': 'No data available for evaluation.'}), 400
        
        list_dir = sorted(list_dir)

        current_date = list_dir[-1]
        last_time = list_dir[-2] if len(list_dir) > 1 else None

        last_emas = pd.read_csv(f"../data/{last_time}/emas.csv")
        last_emas = last_emas[["buy", "updated_at"]]
        last_emas.rename(columns={'updated_at': 'date'}, inplace=True)
        last_emas["date"] = last_emas["date"].apply(lambda x: datetime.datetime.strptime(x[:10], "%Y-%m-%d"))
        last_emas = last_emas.sort_values(by='date', ascending=True)
        last_emas = last_emas[-100:]

        last_predict = pd.read_csv(f"../data/{last_time}/predicted_prices.csv")
        last_evaluate_prices = pd.read_csv(f"../data/{last_time}/evaluate_prices.csv")
        last_evaluate = pd.read_csv(f"../data/{last_time}/evaluate.csv")

        current_emas = pd.read_csv(f"../data/{current_date}/emas.csv")
        current_emas = current_emas[["buy", "updated_at"]]
        current_emas.rename(columns={'updated_at': 'date'}, inplace=True)
        current_emas["date"] = current_emas["date"].apply(lambda x: datetime.datetime.strptime(x[:10], "%Y-%m-%d"))
        current_emas = current_emas.sort_values(by='date', ascending=True)
        current_emas = current_emas[-100:]

        current_predict = pd.read_csv(f"../data/{current_date}/predicted_prices.csv")

        return jsonify({
            'last_emas': {
                "buy": last_emas['buy'].tolist(),
                "date": last_emas['date'].astype(str).tolist()
            },
            'last_predict': {
                "predict": last_predict['Predicted Price'].tolist(),
                "date": last_predict['Date'].astype(str).tolist()
            },
            'last_evaluate_prices': {
                "buy": last_evaluate_prices['buy'].tolist(),
                "predict": last_evaluate_prices['predict'].tolist(),
                "date": last_evaluate_prices['date'].astype(str).tolist()
            },
            'last_evaluate': {
                "mae": last_evaluate['mae'].tolist(),
                "mse": last_evaluate['mse'].tolist(),
                "r2": last_evaluate['r2'].tolist()
            },
            'current_emas': {
                "buy": current_emas['buy'].tolist(),
                "date": current_emas['date'].astype(str).tolist()
            },
            'current_predict': {
                "predict": current_predict['Predicted Price'].tolist(),
                "date": current_predict['Date'].astype(str).tolist()
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/') 
def index():
    return jsonify({'message': 'Monitoring model running!!'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
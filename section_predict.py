import datetime

import prod.predict

def main(current_date = datetime.datetime.now().strftime("%Y-%m-%d")):
    predictor = prod.predict.Predictor(current_date)

    data = predictor.load_data()
    predicted_prices = predictor.predict(data)
    predictor.save_predictions(predicted_prices, data)

if __name__ == "__main__":
    # main("2025-06-28")
    main()
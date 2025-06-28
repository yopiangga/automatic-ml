import datetime
import os

import prod.get_data
import prod.data_preparation
import prod.feature_engineering
import prod.train_model

def main():
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # Create data directory if it doesn't exist
    if not os.path.exists(f"data/{current_date}"):
        os.makedirs(f"data/{current_date}")
    
    if not os.path.exists(f"models/{current_date}"):
        os.makedirs(f"models/{current_date}")

    # Get Data
    get_data = prod.get_data.GetData(current_date)
    get_data.main()

    # Prepare Data
    data_preparation = prod.data_preparation.DataPreparer(emas_file=f"data/{current_date}/emas.csv")
    df_emas = data_preparation.load_data()
    df_emas = data_preparation.preprocess_data(df_emas)
    data_preparation.save_data(df_emas, output_file=f"data/{current_date}/emas_scaled.csv")

    # Feature Engineering
    feature_engineering = prod.feature_engineering.FeatureEngineering(emas_file=f"data/{current_date}/emas_scaled.csv")
    df_emas = feature_engineering.load_data()
    X, y = feature_engineering.create_features(df_emas)
    feature_engineering.save_features(X, y, current_date=current_date)

    # Train Model
    train_model = prod.train_model.TrainModel(current_date=current_date)
    X, y = train_model.load_data()
    X_train, X_test, y_train, y_test = train_model.split_data(X, y)
    model = train_model.train(X_train, y_train, X_test, y_test)

if __name__ == "__main__":
    main()
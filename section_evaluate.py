from datetime import datetime, timedelta

import prod.evaluate

def main(current_date, last_time):
    
    evaluate = prod.evaluate.Evaluate(current_date, last_time)
    actual, predict = evaluate.load_data()

    evaluate.compare(actual, predict)

if __name__ == "__main__":
    current_date = datetime.now().strftime("%Y-%m-%d")
    last_time = (datetime.today() - timedelta(days=7)).strftime('%Y-%m-%d')
    main(current_date, last_time)
    # main("2025-06-28", "2025-06-21")
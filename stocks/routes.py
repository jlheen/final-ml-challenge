from flask import render_template, url_for, flash, redirect, request, jsonify
from stocks import app, db#, model, scaler
from stocks.models import Stocks, Metrics
# import pandas as pd
# import numpy as np

@app.route("/")
def home():
    page = 'home'
    return render_template("index.html", page=page)

@app.route("/model")
def model_page():
    page = 'model'
    title = 'The Model'
    return render_template("model.html", page=page, title=title)

@app.route("/data")
def data_page():
    page = 'data'
    title = 'The Data'
    return render_template("data.html", page=page, title=title)

@app.route("/team")
def team_page():
    page = 'team'
    title = 'The Team'
    return render_template("team.html", page=page, title=title)

@app.route("/api")
def api_docs():
    title = 'API Documentation'
    ticker_list = Stocks.query.all()
    return render_template("api.html", tickers=ticker_list, title=title)

@app.route("/api/v1/stocks")
def stocks():
    stocks = []
    stocks_list = Stocks.query.all()
    for stock in stocks_list:
        stocks.append({
            'id': stock.id,
            'ticker': stock.ticker,
            'name': stock.name,
            'logo': stock.logo
        })
    return jsonify(stocks)

@app.route("/api/v1/stocks/<ticker>")
def ticker_stocks(ticker):
    ticker = ticker.upper()
    stocks = []
    stocks_list = Stocks.query.filter_by(ticker=ticker).all()
    for stock in stocks_list:
        stocks.append({
            'id': stock.id,
            'ticker': stock.ticker,
            'name': stock.name,
            'logo': stock.logo
        })
    return jsonify(stocks)

@app.route("/api/v1/metrics")
def metrics():
    metrics = []
    metrics_list = Metrics.query.all()
    for metric in metrics_list:
        metrics.append({
            'id': metric.id,
            'ticker': metric.ticker,
            'date': metric.date,
            'open_amt': metric.open_amt,
            'high': metric.high,
            'low': metric.low,
            'close': metric.close,
            'volume': metric.volume,
            'dividend': metric.dividend,
            'split': metric.split,
            'adj_close': metric.adj_close,
            'sma': metric.sma,
            'rsi': metric.rsi,
            'slowd': metric.slowd,
            'slowk': metric.slowk,
            'roc': metric.roc,
            'willr': metric.willr,
            'std': metric.std,
            'next_close': metric.next_close,
            'direction': metric.direction
        })
    return jsonify(metrics)

@app.route("/api/v1/metrics/<ticker>")
def ticker_metrics(ticker):
    ticker = ticker.upper()
    metrics = []
    metrics_list = Metrics.query.filter_by(ticker=ticker).all()
    for metric in metrics_list:
        metrics.append({
            'id': metric.id,
            'ticker': metric.ticker,
            'date': metric.date,
            'open_amt': metric.open_amt,
            'high': metric.high,
            'low': metric.low,
            'close': metric.close,
            'volume': metric.volume,
            'dividend': metric.dividend,
            'split': metric.split,
            'adj_close': metric.adj_close,
            'sma': metric.sma,
            'rsi': metric.rsi,
            'slowd': metric.slowd,
            'slowk': metric.slowk,
            'roc': metric.roc,
            'willr': metric.willr,
            'std': metric.std,
            'next_close': metric.next_close,
            'direction': metric.direction
        })
    return jsonify(metrics)

@app.route("/api/v1/predict/<ticker>")
def predict(ticker):
    ticker = ticker.upper()
    # metrics = []
    # metrics_list = Metrics.query.filter_by(ticker=ticker).all()
    # for metric in metrics_list:
    #     metrics.append({
    #         'close': metric.close
    #     })
    # df = pd.DataFrame(metrics)
    # new_dataset = pd.DataFrame(index = range(0, len(df)), columns = ['close'])
    # for i in range(0,len(df)):
    #     new_dataset["close"][i] = df["close"][i]
    # X = []
    # X.append(df.values[-61:-1])
    # X = scaler.transform(X)
    # X = np.array(X)
    # X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    # predicted = model(X)
    # predicted_price = scaler.inverse_transform(predicted)
    # y = predicted_price[0][0]
    next_close = {'next_close': 5000}
    return jsonify(next_close)

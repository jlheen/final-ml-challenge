from flask import render_template, url_for, flash, redirect, request, jsonify
from stocks import app, db, model
from stocks.models import Stocks, Metrics
import numpy as np
import pandas as pd

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api")
def api_docs():
    tickers = []
    ticker_list = Stocks.query.all()
    for ticker in ticker_list:
        tickers.append(ticker.ticker)
    return render_template("api.html", tickers=tickers)

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

@app.route("/api/v1/predict")
def predict():
    df = pd.read_sql("SELECT * FROM metrics WHERE ticker = 'AMZN'", con=db)
    X = []
    for i in range(60, df.shape[0]):
        X.append(df[i-60:i, 0])
    X = np.array(X)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    prediction = model.predict(X)
    return (prediction)
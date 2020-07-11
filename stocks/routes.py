from flask import render_template, url_for, flash, redirect, request, jsonify
from stocks import app, db
from stocks.models import Stocks, Metrics

@app.route("/")
def home():
    return render_template("index.html")

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
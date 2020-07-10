from flask import render_template, url_for, flash, redirect, request, jsonify
from stocks import app, db
from stocks.models import Stocks, Metrics
import json, requests

@app.route("/")
def home():
    return render_template("index.html")
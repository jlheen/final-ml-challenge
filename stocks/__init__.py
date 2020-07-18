from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from keras.models import model_from_json
# from pickle import load
import os

app = Flask(__name__)
env = 'dev'

if env == 'dev':
    from stocks import config
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = config.connection_string
    app.config['SECRET_KEY'] = config.secret
    app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = True
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
    app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
db = SQLAlchemy(app)

# json_file = open('model.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# model = model_from_json(loaded_model_json)
# model.load_weights("model.h5")
# scaler = load(open('scaler.pkl', 'rb'))

from stocks import routes
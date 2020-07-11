from stocks import db

class Stocks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), unique=False, nullable=False)
    logo = db.Column(db.String(100), unique=False, nullable=True)

    def __repr__(self):
        return f"Stocks('{self.id}', '{self.ticker}', '{self.name}')"

class Metrics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(10), unique=False, nullable=False)
    date = db.Column(db.String(12), unique=False, nullable=False)
    open_amt = db.Column(db.Float, unique=False, nullable=False)
    high = db.Column(db.Float, unique=False, nullable=False)
    low = db.Column(db.Float, unique=False, nullable=False)
    close = db.Column(db.Float, unique=False, nullable=False)
    volume = db.Column(db.Integer, unique=False, nullable=False)
    dividend = db.Column(db.Float, unique=False, nullable=False)
    split = db.Column(db.Float, unique=False, nullable=False)
    adj_close = db.Column(db.Float, unique=False, nullable=False)
    sma = db.Column(db.Float, unique=False, nullable=False)
    rsi = db.Column(db.Float, unique=False, nullable=False)
    slowd = db.Column(db.Float, unique=False, nullable=False)
    slowk = db.Column(db.Float, unique=False, nullable=False)
    roc = db.Column(db.Float, unique=False, nullable=False)
    willr = db.Column(db.Float, unique=False, nullable=False)
    std = db.Column(db.Float, unique=False, nullable=False)
    next_close = db.Column(db.Float, unique=False, nullable=True)
    direction = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return f"Metrics('{self.id}', '{self.ticker}')"
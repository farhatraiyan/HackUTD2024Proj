from appDB import db
from sqlalchemy.dialects.sqlite import JSON

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)

    def __init__(self, username, password):
            self.username = username
            self.password = password

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
        }
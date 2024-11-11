from appDB import db
from sqlalchemy import String
import uuid

class Account(db.Model):
    id = db.Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def to_dict(self):
        attributes = ['id', 'username']
        return {attr: getattr(self, attr) for attr in attributes if hasattr(self, attr)}
from appDB import db
from sqlalchemy import String

from flask_login import UserMixin
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

class Account(UserMixin, db.Model):
    id = db.Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        attributes = ['id', 'username']
        return {attr: getattr(self, attr) for attr in attributes if hasattr(self, attr)}
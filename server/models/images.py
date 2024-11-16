from appDB import db
from sqlalchemy import String
import uuid

class Images(db.Model):
    id = db.Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    original_id = db.Column(db.String(59), unique=True, nullable=False)
    preview_id = db.Column(db.String(59), unique=True, nullable=False)

    def __init__(self, original_id, preview_id):
        self.original_id = original_id
        self.preview_id = preview_id

    def to_dict(self):
        attributes = ['id', 'preview_id']
        return {attr: getattr(self, attr) for attr in attributes if hasattr(self, attr)}
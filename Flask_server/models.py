from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(130), unique=True, nullable=True)
    password = db.Column(db.String(100))

    def __repr__(self):
        return f'<User {self.username}>'
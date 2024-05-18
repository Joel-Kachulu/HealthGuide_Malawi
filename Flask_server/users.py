from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(130), unique=True, nullable=True)
    password = db.Column(db.String(100))
    profile_picture = db.Column(db.String(100), default='default.jpg')
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    birthdate = db.Column(db.Date)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    room = db.relationship('Room', backref='users')

    def __repr__(self):
        return f'<User {self.username}>'
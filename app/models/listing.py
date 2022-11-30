from app.models.db import db
from datetime import datetime


class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    guest = db.Column(db.Integer, nullable=False)
    bedroom = db.Column(db.Integer, nullable=False)
    bathroom = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    # lat = db.Column(db.Integer)
    # lng = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship("User", back_populates='listing')
    reviews = db.relationship("Review", back_populates='listing', cascade="all, delete")
    bookings = db.relationship("Booking", back_populates='listing', cascade="all, delete")
    # image = db.relationship('Image', back_populates='listing', cascade="all, delete")
    # amendities = db.relationship('Amendity', back_populates='listing', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'user_id':self.user_id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'guest': self.guest,
            'bedroom': self.bedroom,
            'bathroom': self.bathroom,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'url': self.url,
            # 'lat': self.lat,
            # 'lng': self.lng,
            'username': self.user.username
            # 'image': [{'id':url.id,"image":url.url} for url in self.image],
        }

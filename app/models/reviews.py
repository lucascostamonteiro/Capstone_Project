from app.models.db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)
    content = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

    listing = db.relationship('Listing', back_populates='reviews')
    user = db.relationship("User", back_populates="reviews")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "listing_id": self.listing_id,
            "content": self.content,
            "rating": self.rating,
            "listing": self.listing.to_dict(),
            "user": self.user.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

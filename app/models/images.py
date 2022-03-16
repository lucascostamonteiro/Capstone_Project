from app.models.db import db
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)
    imageUrl = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

    listing = db.relationship('Listing', back_populates='images')


    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "url": self.url
        }

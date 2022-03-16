from app.models.db import db


class Amendity(db.Model):
    __tablename__ = 'amendities'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    free_parking = db.Column(db.Boolean, nullable=False)
    wifi = db.Column(db.Boolean, nullable=False)
    air_conditioning = db.Column(db.Boolean, nullable=False)
    pool = db.Column(db.Boolean, nullable=False)


    listing = db.relationship('Listing', back_populates='amendities')



    def to_dict(self):
        return {
            "id": self.id,
            "listing_id": self.listing_id,
            "free_parking": self.free_parking,
            "wifi": self.wifi,
            "air_conditioning": self.air_conditioning,
            "pool": self.pool,
            "listing": self.listing.to_dict(),
        }

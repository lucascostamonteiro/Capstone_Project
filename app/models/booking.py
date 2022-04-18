from app.models.db import db
from datetime import datetime


class Booking(db.Model):
  __tablename__ = 'bookings'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
  guest = db.Column(db.Integer, nullable=False)
  start_date = db.Column(db.Date, nullable=False)
  end_date = db.Column(db.Date, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship("User", back_populates="bookings", lazy='subquery')
  listing = db.relationship('Listing', back_populates='bookings', lazy='subquery')

  def to_dict(self):
    return{
      'id': self.id,
      'user_id':self.user_id,
      'listing_id':self.listing_id,
      'guest': self.guest,
      'start_date':self.start_date,
      'end_date':self.end_date,
    }

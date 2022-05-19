from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Booking
from datetime import date

# TODO dates validation



class BookingForm(FlaskForm):
  user_id = IntegerField("User Id")
  listing_id = IntegerField('Listing Id')
  start_date = DateField('Start Date', validators=[DataRequired('Please provide a start date')])
  end_date = DateField('End Date', validators=[DataRequired('Please provide a end date')])
  guest = IntegerField('Guests', validators=[DataRequired('Please provide the number of guests')])

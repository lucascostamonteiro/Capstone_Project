from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from datetime import date

# TODO dates validation


class BookingForm(FlaskForm):
  user_id = IntegerField("user_id")
  listing_id = IntegerField('Listing Id')
  start_date = DateField('Start Date', validators=[DataRequired('Please provide a start date')])
  end_date = DateField('End Date', validators=[DataRequired('Please provide a end date')])
  guests = IntegerField('Guests', validators=[DataRequired('Please provide the number of guests')])

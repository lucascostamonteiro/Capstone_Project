from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Booking
from datetime import date

# TODO dates validation
# def dates_validation(form, field):
#   listing_id = field.data
#   booking = form.data

#   print('BOOKING-BE', booking)

#   if(booking["start_date"] == None):
#     return {'errors': ["Please select a start date"]}

#   start_date = booking["start_date"].strftime('%Y-%m-%d')
#   start_date_year = start_date[0:4]
#   start_date_month = start_date[5:7]
#   start_date_day = start_date[8:10]

#   if(booking["end_date"] == None):
#       return

#   end_date = booking["end_date"].strftime('%Y-%m-%d')
#   end_date_year = end_date[0:4]
#   end_date_month = end_date[5:7]
#   end_date_day = end_date[8:10]

#   bookings = Booking.query.filter_by(listing_id=listing_id).all()

#   if(booking["id"]):
#       bookings = Booking.query.filter_by(listing_id=listing_id).filter(Booking.id != booking["id"]).all()

#   if bookings:
#       for booking in bookings:
#           booking_start_date = booking.start_date.strftime('%Y-%m-%d')
#           booking_start_date_year = booking_start_date[0:4]
#           booking_start_date_month = booking_start_date[5:7]
#           booking_start_date_day = booking_start_date[8:10]

#           booking_end_date = booking.end_date.strftime('%Y-%m-%d')
#           booking_end_date_year = booking_end_date[0:4]
#           booking_end_date_month = booking_end_date[5:7]
#           booking_end_date_day = booking_end_date[8:10]

#           if ((start_date_year == booking_start_date_year)
#                   and (start_date_month == booking_start_date_month)
#                   and (int(start_date_day) >= int(booking_start_date_day))):
#               if(int(start_date_year) < int(booking_end_date_year)):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((start_date_year == booking_end_date_year) and
#                       (int(start_date_month) < int(booking_end_date_month))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((start_date_year == booking_end_date_year) and (start_date_month == booking_end_date_month) and (int(start_date_day) <= int(booking_end_date_day))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")

#           if ((end_date_year == booking_start_date_year)
#                   and (end_date_month == booking_start_date_month)
#                   and (int(end_date_day) >= int(booking_start_date_day))):
#               if(int(end_date_year) < int(booking_end_date_year)):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((end_date_year == booking_end_date_year) and
#                       (int(end_date_month) < int(booking_end_date_month))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((end_date_year == booking_end_date_year) and (end_date_month == booking_end_date_month) and (int(end_date_day) <= int(booking_end_date_day))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")

#           if ((booking_start_date_year == start_date_year)
#                   and (booking_start_date_month == start_date_month)
#                   and (int(booking_start_date_day) >= int(start_date_day))):
#               if(int(booking_start_date_year) < int(end_date_year)):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((booking_start_date_year == end_date_year) and
#                       (int(booking_start_date_month) < int(end_date_month))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((booking_start_date_year == end_date_year) and (booking_start_date_month == end_date_month) and (int(booking_start_date_day) <= int(end_date_day))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")

#           if ((booking_end_date_year == start_date_year)
#                   and (booking_end_date_month == start_date_month)
#                   and (int(booking_end_date_day) >= int(start_date_day))):
#               if(int(booking_end_date_year) < int(end_date_year)):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((booking_end_date_year == end_date_year) and
#                       (int(booking_end_date_month) < int(end_date_month))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")
#               if((booking_end_date_year == end_date_year) and (booking_end_date_month == end_date_month) and (int(booking_end_date_day) <= int(end_date_day))):
#                   raise ValidationError(
#                       f"This listing is already booked from {booking_start_date} and {booking_end_date}")



class BookingForm(FlaskForm):
  user_id = IntegerField("User Id")
  listing_id = IntegerField('Listing Id')
  start_date = DateField('Start Date', validators=[DataRequired('Please provide a start date')])
  end_date = DateField('End Date', validators=[DataRequired('Please provide a end date')])
  guest = IntegerField('Guests', validators=[DataRequired('Please provide the number of guests')])

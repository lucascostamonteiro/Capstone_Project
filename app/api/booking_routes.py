from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Booking
from app.forms.booking_form import BookingForm


bookings_routes = Blueprint('bookings_routes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# GET
@bookings_routes.route('/')
def get_listings():
    bookings = Booking.query.all()
    return {"all_bookings":[booking.to_dict() for booking in bookings]}


# POST
@bookings_routes.route('/listings/<int:id>', methods=["POST"])
@login_required
def create_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_booking = Booking(
          user_id=data['user_id'],
          listing_id=data['listing_id'],
          start_date=data['start_date'],
          end_date=data['end_date']
        )

        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

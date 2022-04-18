from flask import Blueprint, request
from flask_login import login_required
from app.forms.booking_form import BookingForm
from app.models import db, Booking


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
@login_required
def get_listings():
    bookings = Booking.query.all()
    return {"all_bookings":[booking.to_dict() for booking in bookings]}


# POST
@bookings_routes.route('/listings/<int:id>', methods=["POST"])
@login_required
def create_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
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

# EDIT
@bookings_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        booking = Booking.query.get(id)

        booking.user_id=data['user_id'],
        booking.listing_id=data['listing_id'],
        booking.start_date=data['start_date'],
        booking.end_date=data['end_date']

        db.session.commit()
        return booking.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE
@bookings_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):
    deleted_booking = Booking.query.get(id)
    db.session.delete(deleted_booking)
    db.session.commit()

    return deleted_booking.to_dict()

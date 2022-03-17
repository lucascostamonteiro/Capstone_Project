from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Listing
# from app.forms import ListingForm

listing_routes = Blueprint('listings_routes',__name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages


# GET
@listing_routes.route('/')
def get_listings():
    listings = Listing.query.all()
    return {"all_listings":[listing.to_dict() for listing in listings]}


# POST
@listing_routes.route('/', methods=["POST"])
def create_listing():
  pass


# PUT
@listing_routes.route('/', methods=["PUT"])
def edit_listing():
  pass


# DELETE
@listing_routes.route('/', methods=["DELETE"])
def delete_listing():
  pass

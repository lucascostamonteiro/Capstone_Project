from flask import Blueprint, request
from flask_login import login_required
from app.forms.listing_form import ListingForm
from app.models import db, Listing


listings_routes = Blueprint('listings_routes',__name__)


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
@listings_routes.route('/')
def get_listings():
    listings = Listing.query.all()
    return {"all_listings":[listing.to_dict() for listing in listings]}


# POST
@listings_routes.route('/', methods=["POST"])
@login_required
def create_listing():
  form = ListingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    listing = Listing(
      user_id=data['user_id'],
      title=data['title'],
      description=data['description'],
      price=data['price'],
      guest=data['guest'],
      bedroom=data['bedroom'],
      bathroom=data['bathroom'],
      address=data['address'],
      city=data['city'],
      state=data['state'],
      url=data['url']
    )

    db.session.add(listing)
    db.session.commit()
    return listing.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT
@listings_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_listing(id):
  form = ListingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    listing = Listing.query.get(id)

    listing.user_id=data['user_id'],
    listing.title=data['title'],
    listing.description=data['description'],
    listing.price=data['price'],
    listing.guest=data['guest'],
    listing.bedroom=data['bedroom'],
    listing.bathroom=data['bathroom'],
    listing.address=data['address'],
    listing.city=data['city'],
    listing.state=data['state'],
    listing.url=data['url']

    db.session.commit()
    return listing.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# DELETE
@listings_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_listing(id):
  deleted_listing = Listing.query.get(id)

  db.session.delete(deleted_listing)
  db.session.commit()

  return deleted_listing.to_dict()

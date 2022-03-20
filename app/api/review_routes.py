from flask import Blueprint, request
from flask_login import login_required
from app.forms.review_form import ReviewForm
from app.models import db, Review



reviews_routes = Blueprint('reviews_routes',__name__)


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
@reviews_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
    return {"all_reviews":[review.to_dict() for review in reviews]}



# POST
@reviews_routes.route('/', methods=["POST"])
@login_required
def create_review():
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    review = Review(
      user_id=data['user_id'],
      listing_id=data['listing_id'],
      rating=data['rating'],
      content=data['content']
    )

    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT
@reviews_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    review = Review.query.get(id)

    review.user_id=data['user_id']
    review.listing_id=data['listing_id'],
    review.rating=data['rating'],
    review.content=data['content']


    db.session.commit()
    return review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# DELETE
@reviews_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
  deleted_review = Review.query.get(id)
  print('*******BACKEND', deleted_review)
  db.session.delete(deleted_review)
  db.session.commit()

  return deleted_review.to_dict()

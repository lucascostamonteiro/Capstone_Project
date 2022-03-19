from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id')
    listing_id = IntegerField('Listing Id')
    content = TextAreaField('Review', validators=[DataRequired("Please provide a review."), Length(min=1, max=255, message="Review must be between 1 - 255 characters")])
    rating = IntegerField('Rating', validators=[DataRequired('Please provide a rating.'), NumberRange(min=1, max=5, message="Rating should be between 1 - 5")])

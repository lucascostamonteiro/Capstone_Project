from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    listing_id = IntegerField('Listing Id', validators=[DataRequired()])
    content = TextAreaField('Review', validators=[DataRequired("Please provide a review.")])
    rating = IntegerField('Rating', validators=[DataRequired('Please provide a rating.')])

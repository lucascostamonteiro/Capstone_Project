from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange


class ListingForm(FlaskForm):
    user_id = IntegerField("user_id")
    title = StringField('title', validators=[DataRequired('Please provide a title.')])
    description = TextAreaField('description', validators=[DataRequired('Please provide a description.')])
    price = IntegerField('Price', validators=[DataRequired('Please provide a price.'), NumberRange(min=1 , max=5000, message="Price must be between $1 - $5,000")])
    guest = IntegerField('price', validators=[DataRequired('Please provide number of guests.'), NumberRange(min=1, max=20, message='Number of guests must be between 1 - 20')])
    bedroom = IntegerField('bedroom', validators=[DataRequired('Please provide number of bedroom.'), NumberRange(min=1, max=10, message='Number of bedrooms must be between 1 - 10')])
    bathroom = IntegerField('bathroom', validators=[DataRequired('Please provide number of bathroom.'), NumberRange(min=1, max=10, message='Number of bathrooms must be between 1 - 10')])
    address = StringField('address', validators=[DataRequired('Please provide an address.')])
    city = StringField('city', validators=[DataRequired('Please provide a city.')])
    state = StringField('state', validators=[DataRequired('Please provide a state.')])
    url = StringField('url', validators=[DataRequired('Please provide a valid image url.'), URL(require_tld=True, message='Please provide a valid image url.')])

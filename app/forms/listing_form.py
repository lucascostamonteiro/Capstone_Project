from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length, ValidationError
import re


def validate_city(form, field):
    city = field.data
    if any(element.isnumeric() for element in city):
      raise ValidationError('City must not include numbers')

def validate_state(form, field):
    state = field.data
    if any(element.isnumeric() for element in state):
      raise ValidationError('State must not include numbers')

def validate_url(form, field):
    url = field.data
    image_url = re.search(r'\.(jpg|jpeg|png|gif)$', url.lower())
    if not image_url:
        raise ValidationError('Please provide a valid image URL (must end in .jpg, .jpeg, .gif, or .png).')



class ListingForm(FlaskForm):
    user_id = IntegerField("user_id")
    title = StringField('title', validators=[DataRequired('Please provide a title.')])
    description = TextAreaField('description', validators=[DataRequired('Please provide a description.')])
    price = IntegerField('Price', validators=[DataRequired('Please provide a price.'), NumberRange(min=1 , max=5000, message="Price must be between $1 - $5,000")])
    guest = IntegerField('price', validators=[DataRequired('Please provide number of guests.'), NumberRange(min=1, max=20, message='Number of guests must be between 1 - 20')])
    bedroom = IntegerField('bedroom', validators=[DataRequired('Please provide number of bedroom.'), NumberRange(min=1, max=10, message='Number of bedrooms must be between 1 - 10')])
    bathroom = IntegerField('bathroom', validators=[DataRequired('Please provide number of bathroom.'), NumberRange(min=1, max=10, message='Number of bathrooms must be between 1 - 10')])
    address = StringField('address', validators=[DataRequired('Please provide an address.'), Length(min=5, max=24, message='Address must be between 5-24 characters')])
    city = StringField('city', validators=[DataRequired('Please provide a city.'), Length(min=2, max=24, message='City must be between 2-24 characters'), validate_city])
    state = StringField('state', validators=[DataRequired('Please provide a state.'), Length(min=2, max=24, message='State must be between 2-24 characters'), validate_state])
    url = StringField('url', validators=[DataRequired('Please provide a valid image url.'), validate_url])

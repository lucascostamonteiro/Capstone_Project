from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired, URL


class ListingForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired('Please provide a title.')])
    description = TextAreaField('description', validators=[DataRequired('Please provide a description.')])
    price = FloatField('Price', validators=[DataRequired('Please provide a price.')])
    guest = IntegerField('price', validators=[DataRequired('Please provide number of guests.')])
    bedroom = IntegerField('bedroom', validators=[DataRequired('Please provide number of bedroom.')])
    bathroom = IntegerField('bathroom', validators=[DataRequired('Please provide number of bathroom.')])
    address = StringField('address', validators=[DataRequired('Please provide an address.')])
    city = StringField('city', validators=[DataRequired('Please provide a city.')])
    state = StringField('state', validators=[DataRequired('Please provide a state.')])
    url = StringField('url', validators=[DataRequired('Please provide a valid image url.'), URL(require_tld=True, message='Please provide a valid image url.')])

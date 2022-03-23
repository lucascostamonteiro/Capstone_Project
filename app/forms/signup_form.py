from email import message
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username is required"), Length(min=4, max=24, message='Username must be between 4-24 characters'), username_exists])
    email = StringField('email', validators=[DataRequired(message="Email is required"), Email("Must be a valid email."), user_exists])
    password = StringField('password', validators=[DataRequired(message="Password is required"), EqualTo('repeat_password', message="Passwords must match."), Length(min=4, max=24,message='Password must be between 4-24 characters')])
    repeat_password = StringField('password', validators=[DataRequired(message="Repeat Password is required")])

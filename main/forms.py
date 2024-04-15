"Models module"

import re
from flask_wtf import FlaskForm, file
from PIL import Image, UnidentifiedImageError
from flask_login import current_user
from datetime import datetime
from wtforms import SubmitField, IntegerField, SelectMultipleField, widgets, \
    StringField, PasswordField, BooleanField, SelectField, RadioField, FileField,\
        FieldList, FormField
from wtforms.validators import DataRequired, EqualTo, Email, \
    Length, NumberRange, ValidationError
from main.models import User


class LoginForm(FlaskForm):
    "Login form"
    email = StringField("Email",
                    validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember me')
    submit = SubmitField("Login")

class RegistrationForm(FlaskForm):
    "Registration Form"
    username = StringField('Username',
                    validators=[DataRequired(), Length(min=2, max = 20)])
    email = StringField("Email",
                    validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8, max=100)])
    confirm_password = PasswordField('Confirm Password',
                    validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField("Continue")

    def validate_username(self, username: str) -> None:
        "Validates username"
        user = User.query.filter_by(username = username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose different one')

    def validate_email(self, email: str) -> None:
        "Validates email"
        user = User.query.filter_by(email = email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose different one')

    def validate_password(self, password):
        'Password validation'
        res_1 = re.findall('[A-z]', password.data)
        if not res_1:
            raise ValidationError('Password must contain letters')
        res_2 = re.findall(r'\d', password.data)
        if not res_2:
            raise ValidationError('Password must contain numbers')


class RequestResetForm(FlaskForm):
    'Request reset form'
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    submit = SubmitField('Request Password Reset')

    def validate_email(self, email):
        'Validates email'
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with that email. You must register first.')

class ResetPasswordForm(FlaskForm):
    'Reset Password Form'
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')

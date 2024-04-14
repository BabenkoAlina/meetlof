"Routes module"

import secrets
import json
from datetime import datetime
from flask import render_template, redirect, url_for, flash, abort, request
from flask_login import login_user, current_user, logout_user, login_required
from main import app, db, bcrypt
from main.forms import RegistrationForm, LoginForm, RequestResetForm, ResetPasswordForm
# from main.calculator import calculator_func
from main.models import User
from main.functions import send_reset_email

@app.route("/", methods=['GET', 'POST'])
@app.route("/main", methods=['GET', 'POST'])
def main():
    "Main page"
    if not current_user.is_authenticated:
        return render_template('home.html', title = 'Home')
    return render_template('main.html', title = 'Main')

@app.route('/flash_message')
def flash_message():
    'Empty page'
    message = "The confirmation was sent to your email. Check it and follow the link"
    flash(message, 'info')
    flash('If you did not receive an email, check your spam folder.', 'info')
    return render_template('layout.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
    "Register route"
    if current_user.is_authenticated:
        return redirect(url_for('main'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Ваш обліковий запис було створено! Тепер Ви можете увійти в систему.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    "Log in route"
    if current_user.is_authenticated:
        return redirect(url_for('main'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            return redirect(url_for('main'))
        flash('Login Unsuccessful. Please check username and password', "danger")
    return render_template('login.html', title='Login', form=form)

@app.route('/logout')
def logout():
    "Logout route"
    logout_user()
    return redirect(url_for('main'))

@app.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    'Resets request'
    if current_user.is_authenticated:
        return redirect(url_for('main'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        flash('If you did not receive an email, check your spam folder.', 'info')
        return redirect(url_for('login'))
    return render_template('reset_request.html', title='Reset Password', form=form)

@app.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    'Resets token'
    if current_user.is_authenticated:
        return redirect(url_for('main'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('reset_token.html', title='Reset Password', form=form)

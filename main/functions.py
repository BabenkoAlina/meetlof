'Function module'

import json
import secrets
import os
from typing import List
from flask import url_for
from PIL import Image
from flask_login import current_user
from flask_mail import Message
from main import mail, app


def send_reset_email(user: object) -> None:
    'Sends reset mail'
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com',
                  recipients=[user.email])
    msg.html = f'<a class="button" \
href="{url_for("reset_token", token=token, _external=True)}\
">Reset Password</a>'
    mail.send(msg)

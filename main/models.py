"Models module"

from flask_login import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import BadSignature
from main import db, login_manager, app

@login_manager.user_loader
def load_user(user_id):
    "Loads user"
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    "User class"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    image_file = db.Column(db.String(20), nullable = False, default='default.jpg')

    def get_reset_token(self, expires_sec=1800):
        'Gets reset token'
        obj = Serializer(app.config['SECRET_KEY'], expires_sec)
        return obj.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        'Verifies reset token'
        obj = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = obj.loads(token)['user_id']
        except BadSignature:
            return None
        except ValueError:
            return None
        except TypeError:
            return None
        except KeyError:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

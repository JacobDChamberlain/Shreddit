from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms.update_user_form import UpdateUserForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
def update_user(id):
    user_to_update = User.query.get(id)

    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(user_to_update)

        db.session.add(user_to_update)
        db.session.commit()
        return user_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

from flask import Blueprint, jsonify, request
from app.models import db, Comment
from app.forms.comment_form import CommentForm
from sqlalchemy import asc, desc
from auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)



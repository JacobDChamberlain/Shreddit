from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Community
# from app.forms import CommunityForm

community_routes = Blueprint('communities', __name__)

@community_routes.route('/<int:id>')
def get_one_community(id):
    community = Community.query.get(id)
    return community.to_dict()

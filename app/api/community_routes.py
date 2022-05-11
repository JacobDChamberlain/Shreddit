from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Community
from app.forms import CommunityForm

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def get_all_communities():
    communities = Community.query.all()
    # (below is an example, if the order needed to be newest-first)
    # communities = Community.query.order_by(Community.id.desc()).all()
    return jsonify([community.to_dict() for community in communities])

@community_routes.route('/<int:id>')
def get_one_community(id):
    community = Community.query.get(id)
    return community.to_dict()

@community_routes.route('/', methods=['POST'])
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        community = Community(
            name = form.data['name'],
            description = form.data['description'],
            community_pic = form.data['community_pic'],
            category = form.data['category'],
            user_id = form.data['user_id']
        )
        db.session.add(community)
        db.session.commit()
        return community.to_dict()

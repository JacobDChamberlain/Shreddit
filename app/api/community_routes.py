from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Community
from app.forms.community_form import CommunityForm

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

    communities = Community.query.all()

    if form.validate_on_submit():
        newCommunity = Community(
            name = form.data['name'],
            description = form.data['description'],
            community_pic = form.data['community_pic'],
            category = form.data['category'],
            user_id = form.data['user_id']
        )

        names = [community.name for community in communities]

        if newCommunity.name in names:
            print("Community ", newCommunity.name, " already exists!")
            return
        else:
            db.session.add(newCommunity)
            db.session.commit()
            return newCommunity.to_dict()



@community_routes.route('/<int:id>', methods=['PUT'])
def update_community(id):
    community_to_update = Community.query.get(id)

    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(community_to_update)

        db.session.add(community_to_update)
        db.session.commit()
        return community_to_update.to_dict()


@community_routes.route('/<int:id>', methods=['DELETE'])
def delete_community(id):
    community_to_delete = Community.query.get(id)
    db.session.delete(community_to_delete)
    db.session.commit()
    return community_to_delete.to_dict()

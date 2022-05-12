from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Community
# from app.forms.post_form import PostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/sh/<int:id>')
def get_all_community_posts(id):
    posts = Post.query.filter(Post.community_id == id).all()

    return jsonify([post.to_dict() for post in posts])


@post_routes.route('/<int:id>')
def get_one_post(id):
    post = Post.query.get(id)

    return post.to_dict()


@post_routes.route('/', methods=['POST'])
def create_post():
    pass


@post_routes.route('/<int:id>', methods=['PUT'])
def update_post(id):
    post_to_update = Post.query.get(id)
    pass


@post_routes.route('/<int:id>/delete')
def delete_post(id):
    post_to_delete = Post.query.get(id)
    return_value = post_to_delete.to_dict()
    db.session.delete(post_to_delete)
    db.session.commit()
    return return_value

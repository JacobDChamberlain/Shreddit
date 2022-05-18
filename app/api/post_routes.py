from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms.post_form import PostForm
from sqlalchemy import asc, desc
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
    # if want newest first:
    posts = Post.query.order_by(desc(Post.id))
    # posts = Post.query.all()

    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/sh/<int:id>')
def get_all_community_posts(id):
    posts = Post.query.filter(Post.community_id == id).all()

    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/users/<int:id>')
def get_all_user_posts(id):
    posts = Post.query.filter(Post.user_id == id).order_by(desc(Post.id)).all()

    return jsonify([post.to_dict() for post in posts])


@post_routes.route('/<int:id>')
def get_one_post(id):
    post = Post.query.get(id)

    return post.to_dict()


@post_routes.route('/', methods=['POST'])
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPost = Post(
            title = form.data['title'],
            body = form.data['body'],
            image_url = form.data['image_url'],
            user_id = form.data['user_id'],
            community_id = form.data['community_id'],
        )
        db.session.add(newPost)
        db.session.commit()
        return newPost.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:id>', methods=['PUT'])
def update_post(id):
    post_to_update = Post.query.get(id)

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(post_to_update)

        db.session.add(post_to_update)
        db.session.commit()
        return post_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:id>/delete')
def delete_post(id):
    post_to_delete = Post.query.get(id)
    return_value = post_to_delete.to_dict()
    db.session.delete(post_to_delete)
    db.session.commit()
    return return_value

from flask import Blueprint, jsonify, request
from app.models import db, Comment
from app.forms.comment_form import CommentForm
from sqlalchemy import asc, desc
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/post/<int:id>')
def get_all_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).all()

    return jsonify([comment.to_dict() for comment in comments])


@comment_routes.route('/', methods=['POST'])
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newComment = Comment(
            content = form.data['content'],
            user_id = form.data['user_id'],
            post_id = form.data['post_id']
        )
        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    comment_to_update = Comment.query.get(id)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(comment_to_update)

        db.session.add(comment_to_update)
        db.session.commit()
        return comment_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:id>/delete')
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    return_value = comment_to_delete.to_dict()
    db.session.delete(comment_to_delete)
    db.session.commit()
    return return_value

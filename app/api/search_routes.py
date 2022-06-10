from flask import Blueprint, jsonify, request
from app.models import db, Post, Community, User

search_routes = Blueprint('search', __name__)

@search_routes.route('/shred')
def search():
    posts = Post.query.all()
    args = request.args.get('search_input')
    search_results = []

    for post in posts:
        title = post.title.lower()
        if title.find(args.lower()) >= 0:
            search_results.append(post.to_dict())
        return {'results': search_results}

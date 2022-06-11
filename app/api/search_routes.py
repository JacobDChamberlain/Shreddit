from flask import Blueprint, jsonify, request
from app.models import db, Post, Community, User

search_routes = Blueprint('search', __name__)

@search_routes.route('/shred')
def search():
    # posts = Post.query.all()
    # print('posts--->', posts)
    args = request.args.get('search_input').lower()
    search_results = []

    communities = Community.query.all()
    # print('communities--->', communities)

    # users = User.query.all()
    # print('users--->', users)

    # for post in posts:
    #     title = post.title.lower()
    #     if title.find(args) >= 0:
    #         search_results.append(post.to_dict())

    for community in communities:
        name = community.name.lower()
        if name.find(args) >= 0:
            search_results.append(community.to_dict())

    # for user in users:
    #     username = user.username.lower()
    #     if username.find(args) >= 0:
    #         search_results.append(user.to_dict())

    print('search_results--->', search_results)
    return {'results': search_results}

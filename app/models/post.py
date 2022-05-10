from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    body = db.Column(db.String(4000))
    image_url = db.Column(db.String(5000))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='posts')
    community = db.relationship('Community',back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade='delete, all')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'community_id': self.community_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

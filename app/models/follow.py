from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)

    member = db.relationship('User', back_populates='member_of')
    community = db.relationship('Community', back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'member_username': self.member.username,
            'community_id': self.community_id,
            'community_name': self.community.name
        }

from app.models import db, Follow

def seed_follows():
    follow1 = Follow(
        user_id = 1,
        community_id = 1
    )
    follow1 = Follow(
        user_id = 1,
        community_id = 2
    )
    follow1 = Follow(
        user_id = 1,
        community_id = 3
    )
    follow1 = Follow(
        user_id = 1,
        community_id = 4
    )
    follow1 = Follow(
        user_id = 1,
        community_id = 5
    )

    db.session.add_all([follow1, ])
    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()

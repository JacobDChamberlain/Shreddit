from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        content = 'NO WAY!!!! IM SO JEALOUS',
        user_id = 2,
        post_id = 1
    )
    comment2 = Comment(
        content = 'You dont need any help, you were chosen; it was meant to be',
        user_id = 1,
        post_id = 3
    )
    comment3 = Comment(
        content = 'rest in peace, Eddie',
        user_id = 2,
        post_id = 4
    )
    comment4 = Comment(
        content = 'bruuuh lorem ipsum is my ish, son',
        user_id = 3,
        post_id = 5
    )
    comment5 = Comment(
        content = 'nec ultrices sem nibh eget augue, indeed, bruuther',
        user_id = 1,
        post_id = 7
    )
    comment6 = Comment(
        content = 'tarregaaaaa, yoooooo',
        user_id = 1,
        post_id = 19
    )
    comment7 = Comment(
        content = 'hey dont hate on my man yngwie',
        user_id = 2,
        post_id = 14
    )
    comment8 = Comment(
        content = 'no, hate on him, he succ',
        user_id = 1,
        post_id = 14
    )
    comment9 = Comment(
        content = 'somebody say somethin about morbid angel?',
        user_id = 3,
        post_id = 16
    )
    comment10 = Comment(
        content = 'bruuuthhurrrrrrr',
        user_id = 2,
        post_id = 7
    )
    comment11 = Comment(
        content = 'bbbbrrrrruuuuuuuuttthhhhuuurrrrrrrrrrr',
        user_id = 3,
        post_id = 7
    )
    comment12 = Comment(
        content = 'wassaaaaaaaaaa',
        user_id = 2,
        post_id = 9
    )
    comment13 = Comment(
        content = 'in a gadda da vida honey',
        user_id = 1,
        post_id = 9
    )
    comment14 = Comment(
        content = 'aint it a frigginilla seper?',
        user_id = 2,
        post_id = 10
    )
    comment15 = Comment(
        content = 'to yeet elit dui or not to yeet elit dui',
        user_id = 2,
        post_id = 11
    )


    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15])
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()

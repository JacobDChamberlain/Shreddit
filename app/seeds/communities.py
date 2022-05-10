from app.models import db, Community

def seed_communities():
    community1 = Community(
        name='ShreddyVanHalen',
        description='The greatest guitarist who ever lived.',
        community_pic='https://ca-times.brightspotcdn.com/dims4/default/c7140f2/2147483647/strip/true/crop/1620x1080+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2Ff3%2Fc9267bb641fe827028f08e568aed%2Feddie-van-halen-dies-la-thmb.jpg',
        category='Hair Metal',
        user_id=1
    )
    community2 = Community(
        name='JasonBecker',
        description='This man lives and breathes the guitar.',
        community_pic='https://cdn.mos.cms.futurecdn.net/t65Yx5aY73iMyeudA2mwuG-1200-80.jpg',
        category='Virtuoso',
        user_id=1
    )
    community3 = Community(
        name='YngwieMalmsteen',
        description='Look at me I do scales real fast.',
        community_pic='http://musicscore.ms/uploads/musicscore/performer_photos/yngwie-malmsteen-4225.jpg',
        category='Virtuoso',
        user_id=2
    )
    community4 = Community(
        name='WesMontgomery',
        description='The best jazz guitarist on the planet.',
        community_pic='https://upload.wikimedia.org/wikipedia/commons/f/f2/Wes_Montgomery_%281967_Gibson_portrait%29.jpg',
        category='Jazz',
        user_id=3
    )
    community5 = Community(
        name='FranciscoTarrega',
        description='This musician took classical guitar to new heights.',
        community_pic='https://upload.wikimedia.org/wikipedia/commons/4/4a/Francisco_Tarrega.jpg',
        category='Classical',
        user_id=1
    )

    db.session.add_all([community1, community2, community3, community4, community5])
    db.session.commit()

def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()

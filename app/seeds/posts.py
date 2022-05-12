from app.models import community, db, Post

def seed_posts():
    post1 = Post(
        title = 'Van Halen was my first concert!!',
        body = 'TOTALLY FREAKING BLESSED to have gotten to see EVH before he passed. What a seriously talented human being.',
        user_id = 1,
        community_id = 1
    )
    post2 = Post(
        title = 'EVH is the man',
        body = 'Superhuman guitar god, fr man.',
        user_id = 2,
        community_id = 1
    )
    post3 = Post(
        title = 'Eddie Van Halen changed my life',
        body = 'I am now covered in red white and black tape, please help, I dont know how this happened, send haaaalp.',
        image_url = 'https://variety.com/wp-content/uploads/2020/04/van-halen.jpg',
        user_id = 3,
        community_id = 1
    )
    post4 = Post(
        title = 'RIP',
        body = 'WHY GOD WHY.',
        image_url = 'https://content.fortune.com/wp-content/uploads/2020/10/GettyImages-179662418.jpg',
        user_id = 3,
        community_id = 1
    )
    post5 = Post(
        title = 'Lorem Ipsuuhh duude',
        body = 'Hey maybe I should start using lorem ipsum for this stuff',
        user_id = 2,
        community_id = 1
    )
    post6 = Post(
        title = 'luctus. Vestibulum ',
        body = 'Nunc aliquet nec erat a rutrum. Nullam sed dolor sed risus auctor dictum. Vivamus molestie, lectus eget sollicitudin dignissim, felis est gravida nisi, et viverra urna lacus ac nisl. Donec maximus laoreet mauris vitae luctus. Vestibulum pulvinar leo quis vehicula sagittis. Sed quis dignissim mauris, non tempor dui. Morbi maximus auctor lacus et suscipit. Donec dignissim tincidunt velit id suscipit. Aenean vel elit dui. Ut id vulputate le',
        image_url = 'https://i1.sndcdn.com/artworks-SvyI2wdXgSlS7oXR-HPHzhQ-t500x500.jpg',
        user_id = 1,
        community_id = 2
    )
    post7 = Post(
        title = 'Praesent maximus, eros non aliquam',
        body = 'ltrices, sem ex gravida est, nec ultrices sem nibh eget augue. Cras at consectetur lorem, eu imperdiet ex. In congue tincidunt hendrerit. Cras in massa sollicitudin, blandit nibh eget, luctus nisi.',
        image_url = 'https://newmobility.com/wp-content/uploads/2021/06/becker.jpg',
        user_id = 2,
        community_id = 2
    )
    post8 = Post(
        title = 'Lorem I psu asdff asdfuhh duude',
        body = ' sapien. Morbi odio dui, finibus quis libero et, pretium elementum mauris. Nam tempus augue eget mauris rhoncus, in convallis dolor sodales. Aliquam sodales dui sapien, eget vehicula augue imperdiet tristique. Morbi in venenatis purus, facilisis tempor est. Nam id placerat ante. Etiam faucibus et ante non pulvinar. Nullam elit sapien, dictum non tincidunt vel, fermentum nec tellus. In aliquam finibu',
        user_id = 2,
        community_id = 2
    )
    post9 = Post(
        title = 'In congue tincidunt',
        body = 'vel consequat nibh metus eget sapien. Morbi odio dui, finibus quis libero et, pretium elementum mauris. Nam tempus augue eget mauris rhoncus, in convallis dolor sodales. Aliquam sod.',
        user_id = 3,
        community_id = 2
    )
    post10 = Post(
        title = 'amet fringilla semper',
        body = 'sit amet posuere nisi consectetur in. Praesent tristique, odio a venenatis porta, eros metus condimentum lorem, ac congue neque odio id mauris. In porttitor aliquet tellus. Nam facilisis, enim sit amet fringilla semper, turpis erat bibendum tortor, non auctor neque lacus at mi. Maecenas blandit ultrices metus non tempus. Aliquam dui magna, lobortis sed rhoncus ac, placerat a magna. Quisque non.',
        user_id = 2,
        community_id = 2
    )
    post11 = Post(
        title = ' Aenean vel elit dui.',
        body = 'Aenean vel elit dui. Ut id vulputate leo. Aliquam hendrerit purus aliquet dui faucibus, sed tempus quam lacinia. Aliquam quam massa, fermentum ut finibus vitae, consec',
        user_id = 3,
        community_id = 2
    )
    post12 = Post(
        title = 'pretium elementum',
        body = 'Morbi odio dui, finibus quis libero et, pretium elementum mauris. Nam tempus augue eget mauris rhoncus, in convallis dolor sodales. Aliquam sodales dui sapien, eget vehicula augue imperdiet tristique. Morbi in venenatis purus, facilisis tempor est. Nam id placerat ante. Etiam faucibus .',
        user_id = 1,
        community_id = 3
    )
    post13 = Post(
        title = 'id pretium justo iaculis ',
        body = 'maximus aliquam, ipsum neque vulputate est, id hendrerit urna sem quis diam. Donec vitae diam est. Mauris semper leo in vulputate imperdiet. Donec vitae diam id dui lobortis efficitur at sed enim. In eu fringilla n',
        user_id = 2,
        community_id = 3
    )
    post14 = Post(
        title = 'f yngwie he succ fr tempor est. Nam id pla',
        body = 'inibus turpis, non porttitor ligula rhoncus sed. Integer tincidunt finibus nisl, sit amet viverra ligula bibendum quis. Etiam ultricies ornare dolor in rutrum. In porta, felis at consequa.',
        image_url = 'https://magazineclonerepub.blob.core.windows.net/mcepub/2258/217595/image/684419a2-8e1d-46f0-bc59-1c5523444e05.jpg',
        user_id = 3,
        community_id = 3
    )
    post15 = Post(
        title = 'n convallis dolor sodales',
        body = 'Sed quis dignissim mauris, non tempor dui. Morbi maximus auctor lacus et suscipit. Donec dignissim tincidunt velit id suscipit. Aenean vel elit dui. Ut id vulputate leo. Aliquam hendrerit purus aliquet dui faucibus, sed tempus quam lacinia. Aliquam quam massa, fermentum ut finibus vitae, consectetur id orci. Donec sit amet ipsum a ipsum tristique ultrices. Vestibulum sed arcu eget risus ullamcorper varius...?',
        image_url = 'https://wiki.killuglyradio.com/images/thumb/6/6c/Wes_Montgomery.jpg/350px-Wes_Montgomery.jpg',
        user_id = 1,
        community_id = 4
    )
    post16 = Post(
        title = ', id viverra odio f',
        body = 'apien. Morbi odio dui, finibus quis libero et, pretium elementum mauris. Nam tempus augue eget mauris rhoncus, in convallis dolor sodales. Aliquam sodales dui sapien, eget vehicula augue imperdiet tristique. Morbi in venenatis purus, facilisis tempor est. Nam id placerat ante. Etiam faucibus et ante non pulvinar. Nullam elit sapien, dictum non tincidunt vel, fermentum nec tellus. In aliquam finibus turpi',
        user_id = 2,
        community_id = 4
    )
    post17 = Post(
        title = 'quam sodales du',
        body = 'Ut id vulputate leo. Aliquam hendrerit purus aliquet dui faucibus, sed tempus quam lacinia. Aliquam quam massa, fermentum ut finibus vitae, consectetur id orci. Donec sit amet ipsum a ipsum tristique ultrices. Vestibulum sed arcu eget risus ullamcorper varius. Nullam at imperdiet lorem. Phasellus at facilisis quam. Donec interdum laoreet odio, vitae bibendum magna facilisis quis. Praesent maximus, eros non aliquam ultrices, sem ex gravida est, nec ultrices sem nibh eget augue. Cras at consectetur lorem, eu im.',
        user_id = 3,
        community_id = 5
    )
    post18 = Post(
        title = 'et. Ut venenatis ',
        body = 'turpis erat bibendum tortor, non auctor neque lacus at mi. Maecenas blandit ultrices metus non tempus. Aliquam dui magna, lobortis sed rhoncus ac, placerat a magna. Quisque non libero nunc. Cras lacinia leo in eros aliquam pulvinar.',
        user_id = 3,
        community_id = 5
    )
    post19 = Post(
        title = 'In porttitor al',
        body = 'velit sagittis neque, vel consequat nibh metus eget sapien. Morbi odio dui, finibus quis libero et, pretium elementum mauris. Nam tempus augue eget mauris rhoncus, in convallis dolor sodales. Aliquam sodales dui sapien, eget vehicula augue imperdiet tristique. Morbi in v',
        image_url = 'https://www.guitarsalon.com/image/cache/catalog/product/ACTARPO-03131/francisco-tarrega-poster-1-326x526.jpg',
        user_id = 2,
        community_id = 5
    )
    post20 = Post(
        title = 'porttitor auctor. Se',
        body = 'Maecenas blandit ultrices metus non tempus. Aliquam dui magna, lobortis sed rhoncus ac, placerat a magna.',
        user_id = 1,
        community_id = 5
    )

    db.session.add_all([post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20])
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()

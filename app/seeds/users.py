from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', firstname='demo', lastname='man', email='demo@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/bernana.png', zipcode=95132)
    marnie = User(
        username='Marnie', firstname='Marnie', lastname='Book', email='marnie@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/marnie.jpg', zipcode=92122)
    dray = User(
        username='Dray', firstname='Draymond', lastname='Green', email='dray@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=94402)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(dray)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

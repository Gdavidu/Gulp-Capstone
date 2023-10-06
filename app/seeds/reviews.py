from app.models import db, Review, environment, SCHEMA
from datetime import datetime
def seed_reviews():

    one = Review(
        user_id=1, business_id=2, rating=4, review='Great place to get bang for your buck', created_at=datetime.utcnow())
    two = Review(
        user_id=2, business_id=3, rating=5, review='Wow!', created_at=datetime.utcnow())
    three = Review(
        user_id=3, business_id=1, rating=1, review='Disgusting', created_at=datetime.utcnow())
    four = Review(
        user_id=1, business_id=3, rating=3, review='Lines are insane ):', created_at=datetime.utcnow())

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()

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
        user_id=1, business_id=5, rating=3, review='Lines are insane ):', created_at=datetime.utcnow())
    five = Review(
        user_id=4, business_id=10, rating=5, review='Ambience is amazing', created_at=datetime.utcnow())
    six = Review(
        user_id=5, business_id=9, rating=3, review='Food is execellent but service is atrocious', created_at=datetime.utcnow())
    seven = Review(
        user_id=6, business_id=8, rating=2, review='Waited 2 hours and got turned away', created_at=datetime.utcnow())
    eight = Review(
        user_id=7, business_id=7, rating=1, review='Food poison', created_at=datetime.utcnow())
    nine = Review(
        user_id=8, business_id=6, rating=4, review='Almost lives up to the original location', created_at=datetime.utcnow())
    ten = Review(
        user_id=9, business_id=3, rating=3, review='Good but not worth the hype', created_at=datetime.utcnow())
    eleven = Review(
        user_id=8, business_id=4, rating=2, review='What a rip-off!', created_at=datetime.utcnow())
    twelve = Review(
        user_id=10, business_id=12, rating=5, review='Crowded but a great deal on Thursdays!', created_at=datetime.utcnow())
    thirteen = Review(
        user_id=11, business_id=11, rating=4, review='Very lowkey shop but the chef has decades of experience', created_at=datetime.utcnow())
    fourteen = Review(
        user_id=12, business_id=14, rating=3, review="Really can't tell how I feel avout this olive oil flavor", created_at=datetime.utcnow())
    fifteen = Review(
        user_id=13, business_id=20, rating=3, review='Food is great but the wait for the food is ridiculous', created_at=datetime.utcnow())
    sixteen = Review(
        user_id=14, business_id=19, rating=4, review='Not all you can eat but super good soup bases', created_at=datetime.utcnow())
    seventeen = Review(
        user_id=15, business_id=18, rating=5, review='Nice date spot', created_at=datetime.utcnow())
    eighteen = Review(
        user_id=16, business_id=17, rating=4, review='Amazingly diverse menu, the combinations of the best foods!', created_at=datetime.utcnow())
    nineteen = Review(
        user_id=17, business_id=13, rating=5, review='Elevated dimsum with inventive concepts. The chocolate lava cake was the best', created_at=datetime.utcnow())
    twenty = Review(
        user_id=20, business_id=16, rating=4, review='Needed to book months ahead but this was a super interesting culinary experience', created_at=datetime.utcnow())

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.add(eight)
    db.session.add(nine)
    db.session.add(ten)
    db.session.add(eleven)
    db.session.add(twelve)
    db.session.add(thirteen)
    db.session.add(fourteen)
    db.session.add(fifteen)
    db.session.add(sixteen)
    db.session.add(seventeen)
    db.session.add(eighteen)
    db.session.add(nineteen)
    db.session.add(twenty)
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

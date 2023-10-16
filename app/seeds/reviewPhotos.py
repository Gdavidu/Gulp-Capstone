from app.models import db, ReviewPhoto, environment, SCHEMA
def seed_reviewPhotos():
    one = ReviewPhoto(
        review_id=1, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/mainchick2.jpg')
    two = ReviewPhoto(
        review_id=2, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos2.jpeg')
    three = ReviewPhoto(
        review_id=3, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/innout2.jpeg')
    four = ReviewPhoto(
        review_id=4, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    five = ReviewPhoto(
        review_id=5, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    six = ReviewPhoto(
        review_id=6, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    seven = ReviewPhoto(
        review_id=7, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    eight = ReviewPhoto(
        review_id=8, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    nine = ReviewPhoto(
        review_id=9, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    ten = ReviewPhoto(
        review_id=10, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')
    eleven = ReviewPhoto(
        review_id=11, photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/portos3.jpg')

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
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviewPhotos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviewPhotos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviewPhotos")

    db.session.commit()

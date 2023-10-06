from app.models import db, Business, environment, SCHEMA

def seed_businesses():

    one = Business(
        name="In N Out", owner_id=1, phone_num=4084998754, street_add='16 Oval Lane',
        city='San Jose', state='California', zip=95132, website_url='https://www.in-n-out.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/InOut.jpg',
        description='Family owned and operated burger joint. Quality you can taste.',
        price_rating=1)
    two = Business(
        name="Main Chick", owner_id=2, phone_num=1234567890, street_add='4705 Clairemont Dr Suite H',
        city='San Diego', state='California', zip=92122, website_url='https://www.eatmainchick.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Main.jpg',
        description='At Main Chick Hot Chicken, our passion for inspired food has led us to create a truly unique Nashville-style fried chicken experience. Our specialty is serving up hot chicken with a range of spice levels.',
        price_rating=2)
    three = Business(
        name="Porto's Bakery", owner_id=3, phone_num=9087654321, street_add='3614 Magnolia Blvd',
        city='Burbank', state='California', zip=91505, website_url='https://www.portosbakery.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Porto.jpg',
        description="Porto's Bakery was born out of Rosa's love for sharing her wonderful cakes, pastries, and savory treats. Millions sold each year. Now shipping nationwide!",
        price_rating=2)
    four = Business(
        name="ADDISON", owner_id=1, phone_num=8583142000, street_add='5200 Grand Del Mar Way',
        city='San Diego', state='California', zip=92130, website_url='https://addisondelmar.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/ADDISON.jpg',
        description="Southern California's most acclaimed fine dining restaurant. Only MICHELIN-Starred restaurant in San Diego. California Gastronomy at its best.",
        price_rating=4)

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
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()

from app.models import db, Business, environment, SCHEMA

def seed_businesses():

    one = Business(
        name="In N Out", owner_id=1, phone_num='4084998754', street_add='16 Oval Lane',
        city='San Jose', state='California', zip=95132, website_url='https://www.in-n-out.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/InOut.jpg',
        description='Family owned and operated burger joint. Quality you can taste.',
        price_rating=1)
    two = Business(
        name="Main Chick", owner_id=2, phone_num='1234567890', street_add='4705 Clairemont Dr Suite H',
        city='San Diego', state='California', zip=92122, website_url='https://www.eatmainchick.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Main.jpg',
        description='At Main Chick Hot Chicken, our passion for inspired food has led us to create a truly unique Nashville-style fried chicken experience. Our specialty is serving up hot chicken with a range of spice levels.',
        price_rating=2)
    three = Business(
        name="Porto's Bakery", owner_id=3, phone_num='9087654321', street_add='3614 Magnolia Blvd',
        city='Burbank', state='California', zip=91505, website_url='https://www.portosbakery.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Porto.jpg',
        description="Porto's Bakery was born out of Rosa's love for sharing her wonderful cakes, pastries, and savory treats. Millions sold each year. Now shipping nationwide!",
        price_rating=2)
    four = Business(
        name="ADDISON", owner_id=1, phone_num='8583142000', street_add='5200 Grand Del Mar Way',
        city='San Diego', state='California', zip=92130, website_url='https://addisondelmar.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed+4.jpg',
        description="Southern California's most acclaimed fine dining restaurant. Only MICHELIN-Starred restaurant in San Diego. California Gastronomy at its best.",
        price_rating=4)
    five = Business(
        name="Shake Shack", owner_id=4, phone_num='8055679234', street_add='33 W Sailer Dr',
        city='San Mateo', state='California', zip=94403, website_url='https://shakeshack.com/#/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed5.jpg',
        description="Hip, counter-serve chain for gourmet takes on fast-food classics like burgers & frozen custard.",
        price_rating=2)
    six = Business(
        name="Falafel Stop", owner_id=5, phone_num='8583142000', street_add='1325 Sunnyvale Saratoga Rd',
        city='Sunnyvale', state='California', zip=94087, website_url='https://falafelstop.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed6.jpeg',
        description="Walk-up kiosk with outdoor tables serving hummus, salad & falafel with handmade pita & sauce.",
        price_rating=1)
    seven = Business(
        name="Ultra Sushi", owner_id=6, phone_num='6502423084', street_add='210 E 3rd Ave',
        city='San Mateo', state='California', zip=94401, website_url='https://ultra-sushi.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed7.jpg',
        description="One of the youngest sushi restaurants in the Bay Area. Fresh and high-quality sushi at the heart of San Mateo. All-you-can-eat option.",
        price_rating=3)
    eight = Business(
        name="Tacos el Gordo", owner_id=7, phone_num='6193754735', street_add='556 Broadway',
        city='Chula Vista', state='California', zip=91910, website_url='https://tacoselgordobc.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed8.jpg',
        description="No-frills Mexican counter-serve joint featuring Tijuana tacos, mulas, loaded fries & more.",
        price_rating=1)
    nine = Business(
        name="Kentucky Fried Chicken", owner_id=8, phone_num='7253410900', street_add='2750 S Maryland Pkwy',
        city='Las Vegas', state='Nevada', zip=92130, website_url='https://kfc.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed9.jpg',
        description="Restaurant chain known for its buckets of fried chicken, plus combo meals & sides.",
        price_rating=1)
    ten = Business(
        name="Wing Lee Bakery", owner_id=9, phone_num='4156683496', street_add='503 Clement St',
        city='San Francisco', state='California', zip=94118, website_url='https://www.yelp.com/biz/wing-lee-bakery-san-francisco',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed10.jpg',
        description="Dim sum bakery",
        price_rating=2)
    eleven = Business(
        name="An | Japanese Restaurant", owner_id=10, phone_num='4153503949', street_add='22 Peace Plaza',
        city='San Francisco', state='California', zip=94115, website_url='https://sushiansf.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed11.jpg',
        description="Snug Japanese eatery with an upscale vibe offering an omakase menu & sushi, plus sake & spirits.",
        price_rating=3)
    twelve = Business(
        name="Pacific Beach Fish Shop", owner_id=11, phone_num='8585430094', street_add='1775 Garnet Ave',
        city='San Diego', state='California', zip=92109, website_url='https://thefishshops.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed12.jpg',
        description="Cheery restaurant serving fresh fish & seafood in tacos, sandwiches & salads, with local microbrews. $1 oysters Thursdays, after 5PM",
        price_rating=2)
    thirteen = Business(
        name="State Bird Provisions", owner_id=12, phone_num='4157951272', street_add='1529 Fillmore St',
        city='San Francisco', state='California', zip=94115, website_url='https://statebirdsf.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed13.jpg',
        description="Urban-rustic storefront setting for a changing menu of American small plates served dim-sum style.",
        price_rating=3)
    fourteen = Business(
        name="Salt & Straw", owner_id=13, phone_num='6509832234', street_add='1309 Burlingame Ave Suite 110',
        city='Burlingame', state='California', zip=94010, website_url='https://saltandstraw.olo.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed14.jpg',
        description="Burlingame scoop shop",
        price_rating=1)
    fifteen = Business(
        name="7Leaves", owner_id=14, phone_num='4086187210', street_add='1743 Berryessa Rd',
        city='San Jose', state='California', zip=95131, website_url='https://7leavescafesj.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/7leaves.png',
        description="Coffee, Tea, and Goodness are the very essence of what we serve.",
        price_rating=1)
    sixteen = Business(
        name="Wakuriya", owner_id=15, phone_num='6504086757', street_add='115 De Anza Blvd',
        city='San Mateo', state='California', zip=94402, website_url='https://wakuriya.com/',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed16.jpg',
        description="Compact, upscale Japanese eatery serving multicourse kaiseki menus at fixed seating times.",
        price_rating=4)
    seventeen = Business(
        name="Uncle John's Cafe", owner_id=15, phone_num='2136134567', street_add='834 S Grand Ave',
        city='Los Angeles', state='California', zip=90017, website_url='https://unclejohnsdtla.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed17.jpg',
        description="Chinese-American diner with a menu ranging from egg rolls & spicy pork chops to omelets & burgers.",
        price_rating=1)
    eighteen = Business(
        name="Mezze and Mooore", owner_id=3, phone_num='4156594059', street_add='834 S Grand Ave',
        city='San Francisco', state='California', zip=94103, website_url='https://mezzeandmooore.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed18.jpg',
        description="Our menu features many variety of Lebanese Mezze. Such as Hunmus , tabouli, BaBaGhanouge, and more.",
        price_rating=2)
    nineteen = Business(
        name="Mumu Hot Pot", owner_id=1, phone_num='6509864381', street_add='1099 Foster Square Ln #135',
        city='Foster City', state='California', zip=94404, website_url='https://www.yelp.com/biz/mumu-hot-pot-foster-city-2',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Busi+seed+adds/seed19.jpg',
        description="AYCE hot pot",
        price_rating=3)
    twenty = Business(
        name="Vivace Ristorante", owner_id=2, phone_num='6504070608', street_add='1910 Ralston Ave',
        city='Belmont', state='California', zip=94002, website_url='https://www.vivacerestaurant.com',
        photo_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/seed10.jpg',
        description="Highly regarded as one of the best restaurants on the Peninsula, Vivace Ristorante is located in the charming city of Belmont.",
        price_rating=3)
    
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
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()

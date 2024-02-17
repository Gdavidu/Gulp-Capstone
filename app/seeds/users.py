from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    one = User(
        username='demo', firstname='demo', lastname='man', email='demo@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/bernana.png', zipcode='95132')
    two = User(
        username='Devin', firstname='Devin', lastname='Book', email='dbook@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/marnie.jpg', zipcode='92122')
    three = User(
        username='Dray', firstname='Draymond', lastname='Green', email='dray@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=94402)
    four = User(
        username='John', firstname='John', lastname='Doe', email='john@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=94242)
    five = User(
        username='Trae', firstname='Trae', lastname='Young', email='trae@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=35673)
    six = User(
        username='Steph', firstname='Steph', lastname='Curry', email='steph@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=24456)
    seven = User(
        username='RJ', firstname='Richard', lastname='Jefferson', email='rj@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=78953)
    eight = User(
        username='Tyus', firstname='Tyus', lastname='Jones', email='tyus@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=12445)
    nine = User(
        username='Jamorant', firstname='Ja', lastname='Morant', email='ja@aa.io', password='password', image_url='https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/trashgoober.jpg', zipcode=75463)
    ten = User(
        username='SGA', firstname='Shai', lastname='Gilgeous-Alexander', email='sga@aa.io', password='password', zipcode=90210)
    ten = User(
        username='Derozan', firstname='Demar', lastname='Derozan', email='derozan@aa.io', password='password', zipcode=94070)
    ten = User(
        username='Domas', firstname='Domantas', lastname='Sabonis', email='domas@aa.io', password='password', zipcode=90210)
    eleven = User(
        username='Swirving', firstname='Kyrie', lastname='Irving', email='kyrie@aa.io', password='password', zipcode=95665)
    twelve = User(
        username='Slimreaper', firstname='Kevin', lastname='Durant', email='kd@aa.io', password='password', zipcode=94040)
    thirteen = User(
        username='Dwade', firstname='Dwayne', lastname='Wade', email='dwade@aa.io', password='password', zipcode=91293)
    fourteen = User(
        username='Dwhite', firstname='Derrick', lastname='White', email='dwhite@aa.io', password='password', zipcode=91313)
    fifteen = User(
        username='Ar15', firstname='Austin', lastname='Reeves', email='ar15@aa.io', password='password', zipcode=91515)
    sixteen = User(
        username='Roundmound', firstname='Charles', lastname='Barkley', email='roundmound@aa.io', password='password', zipcode=90505)
    seventeen = User(
        username='Tinguspingus', firstname='Tingus', lastname='Pingus', email='tp@aa.io', password='password', zipcode=94154)
    eighteen = User(
        username='Deegee', firstname='Darius', lastname='Garland', email='deegee@aa.io', password='password', zipcode=98134)
    nineteen = User(
        username='Pg13', firstname='Paul', lastname='George', email='pg13@aa.io', password='password', zipcode=94222)
    twenty = User(
        username='Claw', firstname='Kawhi', lastname='Leonard', email='heyhey@aa.io', password='password', zipcode=90404)

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
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

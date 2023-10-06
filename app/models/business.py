from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
class Business(db.Model, UserMixin):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone_num = db.Column(db.Integer, nullable=False)
    street_add = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(25), nullable=False)
    state = db.Column(db.String(15), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    website_url = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String(250), nullable=False)
    # categories = db.Column(db.String, nullable=False)
    price_rating = db.Column(db.Integer, nullable=False)
    # open_Sunday = db.Column(db.Boolean, nullable=False, default=False)
    # open_Mon = db.Column(db.Boolean, nullable=False, default=False)
    # open_Tue = db.Column(db.Boolean, nullable=False, default=False)
    # open_Wed = db.Column(db.Boolean, nullable=False, default=False)
    # open_Thu = db.Column(db.Boolean, nullable=False, default=False)
    # open_Fri = db.Column(db.Boolean, nullable=False, default=False)
    # open_Sat = db.Column(db.Boolean, nullable=False, default=False)
    # open_time_Sun = db.Column(db.Time, nullable=True)
    # open_time_Mon = db.Column(db.Time, nullable=True)
    # open_time_Tues = db.Column(db.Time, nullable=True)
    # open_time_Wed = db.Column(db.Time, nullable=True)
    # open_time_Thu = db.Column(db.Time, nullable=True)
    # open_time_Fri = db.Column(db.Time, nullable=True)
    # open_time_Sat = db.Column(db.Time, nullable=True)
    # close_time_Sun = db.Column(db.Time, nullable=True)
    # close_time_Mon = db.Column(db.Time, nullable=True)
    # close_time_Tues = db.Column(db.Time, nullable=True)
    # close_time_Wed = db.Column(db.Time, nullable=True)
    # close_time_Thu = db.Column(db.Time, nullable=True)
    # close_time_Fri = db.Column(db.Time, nullable=True)
    # close_time_Sat = db.Column(db.Time, nullable=True)

    # relationship attributes
    user = db.relationship("User", back_populates="businesses")
    reviews = db.relationship("Review", back_populates="businesses", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_num': self.phone_num,
            'street_add': self.street_add,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'website_url': self.website_url,
            'photo_url': self.photo_url,
            'description': self.description,
            # 'categories': self.categories,
            'price_rating': self.price_rating,
            # 'days_open': self.days_open,
            # 'open_time': self.open_time,
            # 'close_time': self.close_time,
            'reviews': self.reviews.to_dict(),
            'user': self.user.to_dict_no_business()
        }

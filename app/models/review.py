from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.Time, nullable=False)


    user = db.relationship("User", back_populates="reviews")
    businesses = db.relationship("Business", back_populates="reviews")
    photos = db.relationship("Review", back_populates="reviews", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            'rating': self.rating,
            'review': self.review,
            'created_at': self.created_at,
            'user': self.user.to_dict_no_business(),
            'photos': self.photos.to_dict()
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class ReviewPhotos(db.Model, UserMixin):
    __tablename__= 'reviewPhotos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    photo_url = db.Column(db.String, nullable=False)

    reviews = db.relationship("Review", back_populates="reviewPhotos")

    def to_dict(self):
        return {
            'id':self.id,
            'photo_url':self.photo_url
        }

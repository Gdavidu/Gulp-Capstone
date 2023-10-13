from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from ..forms.review_form import ReviewForm
reviews = Blueprint('reviews', __name__)

@reviews.route('')
def all_reviews():
    every_review = Review.query.all()
    response = [review.to_dict() for review in every_review]
    return response

@reviews.route('/<int:businessId>')
def all_bus_reviews(businessId):
    get_reviews = Review.query.filter(Review.business_id == businessId).all()
    response = [review.to_dict() for review in get_reviews]
    return response


@reviews.route('/<int:businessId>/new', methods=['POST'])
@login_required
def create_new_review(businessId):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_review = Review(
            review=form.data['review'],
            rating=form.data['rating'],
            business_id = businessId,
            user_id=current_user.to_dict()["id"],
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    else:
        print(form.errors)
        return {"errors": form.errors}


@reviews.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review_to_update = Review.query.get(id)
        review_to_update.review = form.data['review']
        review_to_update.rating = form.data['rating']
        db.session.commit()
        return review_to_update.to_dict()

    else:
        print(form.errors)
        return {"errors": form.errors}



@reviews.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return {"Success": "successfully deleted"}

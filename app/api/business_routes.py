from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Business, db
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms.business_form import BusinessForm
from ..forms.business_edit_form import BusinessEditForm
businesses = Blueprint('businesses', __name__)

@businesses.route('')
def all_songs():
    # return all songs
    get_businesses = Business.query.all()
    response = [business.to_dict() for business in get_businesses]
    return response

@businesses.route('/<int:id>')
def get_one_busin(id):
    one_busin = Business.query.get(id)
    return one_busin.to_dict()

@businesses.route('/new', methods=["POST"])
@login_required
def post_busin():

    form = BusinessForm()

    form["csrf_token"].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["photo_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            print([upload])
            return {'errors': upload}

        new_busin = Business(
            name=form.data['name'],
            owner_id=current_user.to_dict()['id'],
            photo_url=upload['url'],
            phone_num=form.data['phone_num'],
            street_add =form.data['street_add'],
            city =form.data['city'],
            zip =form.data['zip'],
            state =form.data['state'],
            website_url =form.data['website_url'],
            description =form.data['description'],
            price_rating =form.data['price_rating'],
        )

        db.session.add(new_busin)
        db.session.commit()
        return {'newBusiness': new_busin.to_dict()}

    else:
        print(form.errors)
        return {"errors": form.errors}

@businesses.route('/<int:id>', methods=['DELETE'])
def delete_busin(id):
    get_busin = Business.query.get(id)

    image_deleted = remove_file_from_s3(get_busin.photo_url)

    if image_deleted is True:
        db.session.delete(get_busin)
        db.session.commit()
        return {"Success": "successfully deleted"}
    else:
        return "<h1> Error Occurred in Deleting This Business<h1>"

@businesses.route('/<int:id>', methods=['PUT'])
@login_required
def edit_busin(id):
    form = BusinessEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        busin_to_update = Business.query.get(id)

        if form.data["photo_url"]:
            image_deleted = remove_file_from_s3(busin_to_update.photo_url)
            image = form.data["photo_url"]
            if image_deleted is True:
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)
                if "url" not in upload:
                    print([upload])
                    return {'errors': upload}
            busin_to_update.photo_url = upload['url']

        busin_to_update.name = form.data['name']
        busin_to_update.phone_num = form.data['phone_num']
        busin_to_update.street_add = form.data['street_add']
        busin_to_update.city = form.data['city']
        busin_to_update.zip = form.data['zip']
        busin_to_update.state = form.data['state']
        busin_to_update.website_url = form.data['website_url']
        busin_to_update.description = form.data['description']
        busin_to_update.price_rating = form.data['price_rating']

        print("EDITED BUSI", busin_to_update.photo_url, busin_to_update)
        db.session.commit()
        return busin_to_update.to_dict()
    else:
        print(form.errors)
        return {"errors": form.errors}

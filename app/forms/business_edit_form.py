from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, URLField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class BusinessEditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    phone_num = StringField('Phone Number', validators=[DataRequired()])
    street_add = StringField('Street Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    zip = IntegerField('Zipcode', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    website_url = URLField('Website URL', validators=[DataRequired()])
    photo_url = FileField('Image URL', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('Description', validators=[DataRequired()])
    price_rating = IntegerField('Price Rating', validators=[DataRequired()])
    submit = SubmitField('Edit Business')

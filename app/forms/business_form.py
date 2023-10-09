from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..api. import ALLOWED_EXTENSIONS

"""
need to add enctype="multipart/form-data" to any form tag
on the template for this form for AWS to work
"""

class BusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    # image = URLField('Image URL', validators=[DataRequired()])
    image = FileField('Image URL', validators=[FileRequired(), FileAllowed(list(IMAGE_ALLOWED_EXTENSIONS))])
    # audio = URLField('Audio URL', validators=[DataRequired()])
    zipcode = FileField('Audio URL', validators=[FileRequired(), FileAllowed(list(AUDIO_ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create New Business')

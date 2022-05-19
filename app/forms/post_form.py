from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError

def validate_image_url(form, field):
        if len(field.data) > 0 and ".jpg" not in field.data:
            raise ValidationError('Image url must contain .jpg')

def validate_post_title(form, field):
    if len(field.data) > 300:
        raise ValidationError('Title must be under 300 characters.')

def validate_post_body(form, field):
    if len(field.data) > 4000:
        raise ValidationError('Body must be under 4000 characters.')

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), validate_post_title])
    body = StringField('Body', validators=[DataRequired(), validate_post_body])
    image_url = StringField('Image', validators=[validate_image_url])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    community_id = IntegerField('Community Id', validators=[DataRequired()])

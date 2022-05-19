from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Community


def community_exists(form, field):
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('Community already exists.')

def no_spaces(form, field):
    name = field.data
    if ' ' in name:
        raise ValidationError('Community names cannot have spaces.')

def max_name_length(form, field):
    name = field.data
    if len(name) > 21:
        raise ValidationError('Community names can be up to 21 characters.')

def max_description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Community description can be up to 500 characters.')

def validate_community_pic(form, field):
        if len(field.data) > 0 and ".jpg" not in field.data:
            raise ValidationError('Image url must contain .jpg')

class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), max_description_length])
    community_pic = StringField('Community Pic', validators=[validate_community_pic])
    category = SelectField('Category', choices=["Classical", "Jazz", "Hair Metal", "Virtuoso", "Speed Metal", "Bluegrass", "Metal", "Country", "Death Metal"], validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User



def is_jpg(form, field):
    profile_pic = field.data
    if len(profile_pic) > 0 and ".jpg" not in profile_pic:
        raise ValidationError('Profile Picture must be a .jpg URL.')



class UpdateUserForm(FlaskForm):
    profile_pic = StringField('profile_pic', validators=[DataRequired(), is_jpg])

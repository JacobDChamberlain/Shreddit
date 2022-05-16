from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    body = StringField('Body', validators=[DataRequired()])
    image_url = StringField('Image')
    user_id = IntegerField('User Id', validators=[DataRequired()])
    community_id = IntegerField('Community Id', validators=[DataRequired()])

    def validate_image_url(form, field):
        if len(field.data) > 0 and ".jpg" not in field.data:
            raise ValidationError('Image url must contain .jpg')

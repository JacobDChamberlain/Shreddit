from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Community

class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    community_pic = StringField('Community Pic')
    category = SelectField('Category', choices=["Classical", "Jazz", "Hair Metal", "Virtuoso", "Speed Metal", "Bluegrass", "Metal", "Country", "Death Metal"], validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])

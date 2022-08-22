from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def validate__comment_content(form, field):
    if (len(field.data) > 1000):
        raise ValidationError('Comment must be under 1000 characters.')


class CommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), validate__comment_content])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    post_id = IntegerField('Post Id', validators=[DataRequired()])

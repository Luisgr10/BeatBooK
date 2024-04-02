import os
from flask_admin import Admin
from .models import db, User, Event, Place, Band, Assistance, Review, MusicalCategory,Media
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Event, db.session))
    admin.add_view(ModelView(Place, db.session))
    admin.add_view(ModelView(Band, db.session))
    admin.add_view(ModelView(Assistance, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(MusicalCategory, db.session))
    admin.add_view(ModelView(Media, db.session))

    # You can duplicate that line to add new models
    # admin.add_view(ModelView(YourModelName, db.session))
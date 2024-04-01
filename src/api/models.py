from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    user_categories = db.relationship('MusicalCategory', secondary='user_favorite_category', back_populates='users')

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            'id': self.id,
            'is_active': self.is_active,
            'email': self.email,
            'username': self.username,
            'birthdate': self.birthdate,
            'description': self.description,
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), nullable=True)
    media = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'description': self.description,
            'address': self.address,
            'price': self.price,
            'pictures': self.pictures,
            'media': self.media,
            'social_networks': self.social_networks,
            'place_id': self.place_id,
        }

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='place', lazy=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'phone': self.phone,
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'social_networks': self.social_networks,
        }

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='band', lazy=True)
    musical_categories = db.relationship('MusicalCategory', secondary='band_musical_category', back_populates='bands')

    members = db.relationship('User', secondary='band_members', backref=db.backref('bands', lazy='dynamic'))


    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'social_networks': self.social_networks,
        }

class Assistance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

    user = db.relationship('User', backref='assistances', lazy=True)
    event = db.relationship('Event', backref='assistances', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(300), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

    user = db.relationship('User', backref='reviews', lazy=True)
    event = db.relationship('Event', backref='reviews', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    bands = db.relationship('Band', secondary='band_musical_category', back_populates='musical_categories')
    users = db.relationship('User', secondary='user_favorite_category', back_populates='user_categories')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }

band_events = db.Table('band_events',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

band_musical_category = db.Table('band_musical_category',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

user_favorite_category = db.Table('user_favorite_category',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

band_members = db.Table('band_members',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)
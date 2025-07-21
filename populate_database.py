#!/usr/bin/env python3
"""
Script para poblar la base de datos de BeatBooK con datos de ejemplo
Ejecutar: python populate_database.py
"""

import json
import os
import sys
from datetime import datetime
import bcrypt
import random

# Configurar la base de datos PostgreSQL de Supabase ANTES de importar la app
os.environ['DATABASE_URL'] = "postgresql://postgres:beatbook2024@db.hiarqdzspdewueaugmmp.supabase.co:5432/postgres"

# Agregar el directorio src al path para importar los módulos
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from api.models import db, User, Event, Place, Band, MusicalCategory, Assistance, Review, Media
from app import app

def load_json_data(filename):
    """Carga datos desde un archivo JSON"""
    json_path = os.path.join('src', 'api', 'JSON', filename)
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {filename}")
        return []
    except json.JSONDecodeError as e:
        print(f"❌ Error al parsear JSON en {filename}: {e}")
        return []

def parse_date(date_string):
    """Convierte string de fecha a objeto datetime"""
    try:
        # Formato: "Fri, 25 Aug 1989 00:00:00 GMT"
        return datetime.strptime(date_string, "%a, %d %b %Y %H:%M:%S %Z")
    except ValueError:
        try:
            # Formato alternativo: "2024-01-15"
            return datetime.strptime(date_string, "%Y-%m-%d")
        except ValueError:
            print(f"⚠️  No se pudo parsear la fecha: {date_string}")
            return datetime.now()

def populate_database():
    """Función principal para poblar la base de datos"""
    print("🎵 Iniciando población de la base de datos BeatBooK...")
    
    with app.app_context():
        # Limpiar base de datos existente
        print("🧹 Limpiando base de datos existente...")
        db.drop_all()
        db.create_all()
        
        # 1. Cargar Categorías Musicales
        print("🎼 Cargando categorías musicales...")
        categories_data = load_json_data('MusicalCategories.json')
        categories = {}
        
        for cat_data in categories_data:
            category = MusicalCategory(
                name=cat_data['name'],
                description=cat_data['description'],
                image_url=cat_data.get('image_url')
            )
            db.session.add(category)
            db.session.flush()  # Para obtener el ID
            categories[cat_data['name']] = category
        
        print(f"✅ {len(categories)} categorías musicales cargadas")
        
        # 2. Cargar Usuarios
        print("👥 Cargando usuarios...")
        users_data = load_json_data('Users.json')
        users = {}
        
        for user_data in users_data:
            # Hashear la contraseña con bcrypt
            password_bytes = user_data['password'].encode('utf-8')
            hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
            
            user = User(
                email=user_data['email'],
                username=user_data['username'],
                password=hashed_password,
                birthdate=parse_date(user_data['birthdate']),
                description=user_data['description'],
                gender=user_data['gender'],
                city=user_data['city'],
                profile_image_url=user_data.get('profile_image_url'),
                banner_picture=user_data.get('banner_picture'),
                instagram=user_data.get('instagram'),
                tiktok=user_data.get('tiktok'),
                is_active=user_data.get('is_active', True)
            )
            db.session.add(user)
            db.session.flush()  # Para obtener el ID
            users[user_data['username']] = user
        
        print(f"✅ {len(users)} usuarios cargados")
        
        # 3. Cargar Lugares
        print("🏢 Cargando lugares...")
        places_data = load_json_data('Places.json')
        places = {}
        
        for place_data in places_data:
            place = Place(
                name=place_data['name'],
                description=place_data['description'],
                address=place_data['address'],
                phone=place_data.get('phone'),
                profile_picture=place_data.get('profile_picture'),
                banner_picture=place_data.get('banner_picture'),
                instagram=place_data.get('instagram'),
                tiktok=place_data.get('tiktok')
            )
            db.session.add(place)
            db.session.flush()  # Para obtener el ID
            places[place_data['name']] = place
        
        print(f"✅ {len(places)} lugares cargados")
        
        # 4. Cargar Bandas
        print("🎸 Cargando bandas...")
        bands_data = load_json_data('Bands.json')
        bands = {}
        user_list = list(users.values())
        
        # Mapeo de bandas a categorías musicales basado en el nombre/descripción
        band_categories = {
            'Smooth Jazz Collective': ['Jazz'],
            'Neon Nights Ensemble': ['Electrónica'],
            'Rhythm Revolutionaries': ['Hip Hop'],
            'The Rockin\' Rollers': ['Rock'],
            'Pop Sensations': ['Pop'],
            'Reggae Rhythms Collective': ['Reggae'],
            'Salsa Kings Orchestra': ['Salsa'],
            'R&B Soul Masters': ['R&B'],
            'Thunder Road Rebels': ['Rock'],
            'Starlight Echoes': ['Indie']
        }
        
        for i, band_data in enumerate(bands_data):
            # Asignar un creador aleatorio
            creator = user_list[i % len(user_list)]
            
            band = Band(
                name=band_data['name'],
                description=band_data['description'],
                profile_picture=band_data.get('profile_picture'),
                banner_picture=band_data.get('banner_picture'),
                instagram=band_data.get('instagram'),
                tiktok=band_data.get('tiktok'),
                creator_id=creator.id
            )
            db.session.add(band)
            db.session.flush()  # Para obtener el ID
            bands[band_data['name']] = band
            
            # Agregar categorías musicales a la banda
            if band_data['name'] in band_categories:
                for cat_name in band_categories[band_data['name']]:
                    if cat_name in categories:
                        band.musical_categories.append(categories[cat_name])
            
            # Agregar algunos miembros aleatorios a la banda (2-4 miembros)
            num_members = random.randint(2, 4)
            band_members = random.sample(user_list, min(num_members, len(user_list)))
            for member in band_members:
                band.members.append(member)
        
        print(f"✅ {len(bands)} bandas cargadas")
        
        # 5. Cargar Eventos
        print("🎪 Cargando eventos...")
        events_data = load_json_data('Events.json')
        events = {}
        
        for event_data in events_data:
            # Obtener referencias
            creator = users.get(event_data.get('creator_username'))
            place = places.get(event_data.get('place_name'))
            band = bands.get(event_data.get('band_name'))
            
            event = Event(
                name=event_data['name'],
                date=parse_date(event_data['date']),
                description=event_data['description'],
                address=event_data['address'],
                price=event_data.get('price'),
                picture_url=event_data.get('picture_url'),
                instagram=event_data.get('instagram'),
                tiktok=event_data.get('tiktok'),
                creator_id=creator.id if creator else None,
                place_id=place.id if place else None,
                band_id=band.id if band else None
            )
            db.session.add(event)
            db.session.flush()  # Para obtener el ID
            events[event_data['name']] = event
        
        print(f"✅ {len(events)} eventos cargados")
        
        # 6. Cargar Asistencias
        print("📋 Cargando asistencias...")
        assistances_data = load_json_data('Assistances.json')
        
        for assistance_data in assistances_data:
            user = users.get(assistance_data.get('username'))
            event = events.get(assistance_data.get('event_name'))
            
            if user and event:
                assistance = Assistance(
                    user_id=user.id,
                    event_id=event.id
                )
                db.session.add(assistance)
        
        print(f"✅ {len(assistances_data)} asistencias cargadas")
        
        # 7. Cargar Reviews
        print("⭐ Cargando reseñas...")
        reviews_data = load_json_data('Reviews.Json')
        
        for review_data in reviews_data:
            user = users.get(review_data.get('username'))
            event = events.get(review_data.get('event_name'))
            
            if user and event:
                review = Review(
                    title=review_data.get('title'),
                    rating=review_data.get('rating'),
                    comment=review_data['comment'],
                    user_id=user.id,
                    event_id=event.id
                )
                db.session.add(review)
        
        print(f"✅ {len(reviews_data)} reseñas cargadas")
        
        # 8. Asignar categorías favoritas a usuarios (basado en descripción)
        print("🎯 Asignando categorías favoritas a usuarios...")
        user_categories_mapping = {
            'AnaPianist': ['Jazz', 'Pop'],
            'CarlosSaxophonist': ['Jazz', 'R&B'],
            'JuanGuitarist': ['Rock', 'Indie'],
            'LauraMusicLover': ['Indie', 'Pop'],
            'LuisMusician': ['Rock', 'Indie'],
            'MariaSinger': ['Pop', 'R&B'],
            'PacoMusicLover': ['Indie', 'Rock'],
            'SaraDrummer': ['Rock', 'Electrónica']
        }
        
        for username, category_names in user_categories_mapping.items():
            if username in users:
                user = users[username]
                for cat_name in category_names:
                    if cat_name in categories:
                        user.user_categories.append(categories[cat_name])
        
        # Commit final
        db.session.commit()
        
        print("\n🎉 ¡Base de datos poblada exitosamente!")
        print(f"📊 Resumen:")
        print(f"   - {len(categories)} categorías musicales")
        print(f"   - {len(users)} usuarios")
        print(f"   - {len(places)} lugares")
        print(f"   - {len(bands)} bandas")
        print(f"   - {len(events)} eventos")
        print(f"   - {len(assistances_data)} asistencias")
        print(f"   - {len(reviews_data)} reseñas")
        print("\n🚀 ¡Tu aplicación BeatBooK está lista para usar!")
        print("\n📝 Credenciales de ejemplo:")
        print("   Usuario: AnaPianist")
        print("   Contraseña: ana456")
        print("   Email: ana@4geeks.com")

if __name__ == "__main__":
    try:
        populate_database()
    except Exception as e:
        print(f"❌ Error durante la población de la base de datos: {e}")
        import traceback
        traceback.print_exc() 
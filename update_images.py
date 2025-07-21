#!/usr/bin/env python3
"""
Script para actualizar las URLs de imágenes en los archivos JSON con URLs de placeholder que funcionen
Ejecutar: python update_images.py
"""

import json
import os
import random

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

def save_json_data(filename, data):
    """Guarda datos en un archivo JSON"""
    json_path = os.path.join('src', 'api', 'JSON', filename)
    try:
        with open(json_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"✅ Archivo {filename} actualizado correctamente")
    except Exception as e:
        print(f"❌ Error al guardar {filename}: {e}")

def get_placeholder_image_url(category, size="400"):
    """Genera URLs de placeholder basadas en la categoría usando Unsplash"""
    # URLs de Unsplash con imágenes relacionadas a música
    unsplash_urls = {
        'user_profile': [
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
        ],
        'user_banner': [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop"
        ],
        'band_profile': [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
        ],
        'band_banner': [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=200&fit=crop"
        ],
        'event': [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop"
        ],
        'place_profile': [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
        ],
        'place_banner': [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=200&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=200&fit=crop"
        ],
        'category': [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
        ]
    }
    
    urls = unsplash_urls.get(category, unsplash_urls['user_profile'])
    return random.choice(urls)

def update_images():
    """Función principal para actualizar todas las imágenes"""
    print("🖼️  Actualizando imágenes en BeatBooK...")
    print("=" * 60)
    
    # 1. Actualizar imágenes de usuarios
    print("\n👥 Actualizando imágenes de usuarios...")
    users_data = load_json_data('Users.json')
    
    for user in users_data:
        # Actualizar imagen de perfil
        user['profile_image_url'] = get_placeholder_image_url('user_profile', "300x300")
        # Actualizar imagen de banner
        user['banner_picture'] = get_placeholder_image_url('user_banner', "800x200")
    
    save_json_data('Users.json', users_data)
    
    # 2. Actualizar imágenes de bandas
    print("\n🎸 Actualizando imágenes de bandas...")
    bands_data = load_json_data('Bands.json')
    
    for band in bands_data:
        # Actualizar imagen de perfil
        band['profile_picture'] = get_placeholder_image_url('band_profile', "300x300")
        # Actualizar imagen de banner
        band['banner_picture'] = get_placeholder_image_url('band_banner', "800x200")
    
    save_json_data('Bands.json', bands_data)
    
    # 3. Actualizar imágenes de eventos
    print("\n🎪 Actualizando imágenes de eventos...")
    events_data = load_json_data('Events.json')
    
    for event in events_data:
        # Actualizar imagen del evento
        event['picture_url'] = get_placeholder_image_url('event', "600x400")
    
    save_json_data('Events.json', events_data)
    
    # 4. Actualizar imágenes de lugares
    print("\n🏢 Actualizando imágenes de lugares...")
    places_data = load_json_data('Places.json')
    
    for place in places_data:
        # Actualizar imagen de perfil
        place['profile_picture'] = get_placeholder_image_url('place_profile', "300x300")
        # Actualizar imagen de banner
        place['banner_picture'] = get_placeholder_image_url('place_banner', "800x200")
    
    save_json_data('Places.json', places_data)
    
    # 5. Actualizar imágenes de categorías musicales
    print("\n🎼 Actualizando imágenes de categorías musicales...")
    categories_data = load_json_data('MusicalCategories.json')
    
    for category in categories_data:
        # Actualizar imagen de la categoría
        category['image_url'] = get_placeholder_image_url('category', "400x400")
    
    save_json_data('MusicalCategories.json', categories_data)
    
    print("\n" + "=" * 60)
    print("🎉 ¡Todas las imágenes han sido actualizadas!")
    print("=" * 60)
    print("📝 Las nuevas imágenes usan:")
    print("   - picsum.photos para generar placeholders")
    print("   - URLs de Unsplash para imágenes más confiables")
    print("   - Tamaños apropiados para cada tipo de imagen")
    print("\n🔄 Ejecuta 'python verify_images.py' para verificar que funcionen")

if __name__ == "__main__":
    try:
        update_images()
    except Exception as e:
        print(f"❌ Error durante la actualización: {e}")
        import traceback
        traceback.print_exc() 
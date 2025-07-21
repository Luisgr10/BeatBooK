#!/usr/bin/env python3
"""
Script para verificar que todas las imágenes en los archivos JSON sean accesibles
Ejecutar: python verify_images.py
"""

import json
import os
import requests
from urllib.parse import urlparse
import time

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

def check_image_url(url, description):
    """Verifica si una URL de imagen es accesible"""
    if not url:
        return False, "URL vacía"
    
    try:
        # Agregar headers para simular un navegador
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.head(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            content_type = response.headers.get('content-type', '')
            if 'image' in content_type:
                return True, f"✅ {description}: {url}"
            else:
                return False, f"❌ {description}: No es una imagen (Content-Type: {content_type})"
        else:
            return False, f"❌ {description}: HTTP {response.status_code}"
            
    except requests.exceptions.Timeout:
        return False, f"⏰ {description}: Timeout"
    except requests.exceptions.ConnectionError:
        return False, f"🔌 {description}: Error de conexión"
    except requests.exceptions.RequestException as e:
        return False, f"❌ {description}: {str(e)}"
    except Exception as e:
        return False, f"❌ {description}: Error inesperado - {str(e)}"

def verify_images():
    """Función principal para verificar todas las imágenes"""
    print("🖼️  Verificando imágenes en BeatBooK...")
    print("=" * 60)
    
    total_images = 0
    working_images = 0
    failed_images = []
    
    # 1. Verificar imágenes de usuarios
    print("\n👥 Verificando imágenes de usuarios...")
    users_data = load_json_data('Users.json')
    
    for user in users_data:
        # Verificar imagen de perfil
        if 'profile_image_url' in user and user['profile_image_url']:
            total_images += 1
            is_working, message = check_image_url(
                user['profile_image_url'], 
                f"Perfil de {user['username']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        # Verificar imagen de banner
        if 'banner_picture' in user and user['banner_picture']:
            total_images += 1
            is_working, message = check_image_url(
                user['banner_picture'], 
                f"Banner de {user['username']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        time.sleep(0.1)  # Pequeña pausa para no sobrecargar el servidor
    
    # 2. Verificar imágenes de bandas
    print("\n🎸 Verificando imágenes de bandas...")
    bands_data = load_json_data('Bands.json')
    
    for band in bands_data:
        # Verificar imagen de perfil
        if 'profile_picture' in band and band['profile_picture']:
            total_images += 1
            is_working, message = check_image_url(
                band['profile_picture'], 
                f"Perfil de {band['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        # Verificar imagen de banner
        if 'banner_picture' in band and band['banner_picture']:
            total_images += 1
            is_working, message = check_image_url(
                band['banner_picture'], 
                f"Banner de {band['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        time.sleep(0.1)
    
    # 3. Verificar imágenes de eventos
    print("\n🎪 Verificando imágenes de eventos...")
    events_data = load_json_data('Events.json')
    
    for event in events_data:
        if 'picture_url' in event and event['picture_url']:
            total_images += 1
            is_working, message = check_image_url(
                event['picture_url'], 
                f"Imagen de {event['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        time.sleep(0.1)
    
    # 4. Verificar imágenes de lugares
    print("\n🏢 Verificando imágenes de lugares...")
    places_data = load_json_data('Places.json')
    
    for place in places_data:
        # Verificar imagen de perfil
        if 'profile_picture' in place and place['profile_picture']:
            total_images += 1
            is_working, message = check_image_url(
                place['profile_picture'], 
                f"Perfil de {place['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        # Verificar imagen de banner
        if 'banner_picture' in place and place['banner_picture']:
            total_images += 1
            is_working, message = check_image_url(
                place['banner_picture'], 
                f"Banner de {place['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        time.sleep(0.1)
    
    # 5. Verificar imágenes de categorías musicales
    print("\n🎼 Verificando imágenes de categorías musicales...")
    categories_data = load_json_data('MusicalCategories.json')
    
    for category in categories_data:
        if 'image_url' in category and category['image_url']:
            total_images += 1
            is_working, message = check_image_url(
                category['image_url'], 
                f"Imagen de {category['name']}"
            )
            if is_working:
                working_images += 1
            else:
                failed_images.append(message)
            print(message)
        
        time.sleep(0.1)
    
    # Resumen final
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE VERIFICACIÓN DE IMÁGENES")
    print("=" * 60)
    print(f"🖼️  Total de imágenes verificadas: {total_images}")
    print(f"✅ Imágenes funcionando: {working_images}")
    print(f"❌ Imágenes con problemas: {total_images - working_images}")
    
    if total_images > 0:
        success_rate = (working_images / total_images) * 100
        print(f"📈 Tasa de éxito: {success_rate:.1f}%")
    
    if failed_images:
        print(f"\n❌ Imágenes con problemas:")
        for failed in failed_images:
            print(f"   {failed}")
    
    if working_images == total_images and total_images > 0:
        print("\n🎉 ¡Todas las imágenes están funcionando correctamente!")
    elif working_images > 0:
        print(f"\n⚠️  {total_images - working_images} imágenes tienen problemas que deberían ser revisadas.")
    else:
        print("\n❌ Todas las imágenes tienen problemas. Revisa las URLs.")

if __name__ == "__main__":
    try:
        verify_images()
    except Exception as e:
        print(f"❌ Error durante la verificación: {e}")
        import traceback
        traceback.print_exc() 
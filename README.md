# Beatbook

Beatbook se presenta como una agenda cultural personalizada, donde los usuarios generan el propio contenido, compartiendo eventos, lugares y grupos de música. Nos centramos en dar visibilidad a estos tres pilares, permitiendo a los usuarios descubrir planes atractivos según sus preferencias.

## Objetivos

- Permitir a los usuarios descubrir eventos, lugares y grupos de música alineados con sus preferencias.

- Facilitar el acceso a información sobre eventos musicales en vivo, ayudando a los usuarios a encontrar planes atractivos de manera rápida y sencilla.

- Fomentar la participación de los usuarios, permitiéndoles generar contenido y compartir sus experiencias musicales.

## Tecnologías Usadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![CSS](https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

## Capturas de Pantalla

<div align="center">
  <img width="510" alt="Captura de Pantalla 2024-05-16 a las 11 14 30" src="https://github.com/Luisgr10/BeatBooK/assets/147260322/23278df0-20b3-40db-8376-2a46b3defd73">
</div>
<img width="500" alt="Captura de Pantalla 2024-05-16 a las 12 54 35" src="https://github.com/Luisgr10/BeatBooK/assets/147260322/a6ce854d-5935-4faf-9e46-cdf8d8005d66"> <img width="500" alt="Captura de Pantalla 2024-05-16 a las 12 54 57" src="https://github.com/Luisgr10/BeatBooK/assets/147260322/8698594e-ad12-4302-bc48-3634b395b28f">
<div align="center">
  <img width="510" alt="Captura de Pantalla 2024-05-16 a las 12 35 44" src="https://github.com/Luisgr10/BeatBooK/assets/147260322/e311145c-4c53-4097-80ab-df666acc741c">
</div>

## Instalación

   Si utilizas Github Codespaces (recomendado) o Gitpod, esta plantilla ya vendrá con Python, Node y la base de datos Postgres instalados. Si trabajas localmente, asegúrate de instalar Python 3.10, Node.

**Instalar el backend primero**:
   Asegúrate de tener Python 3.8, Pipenv y un motor de base de datos (Postgres recomendado).

**Instalar los paquetes de Python**:
   ```sh
   $ pipenv install
   ```

**Crear un archivo .env basado en .env.example**:
   ```sh
   $ cp .env.example .env
   ```
  ```sh
  Ejemplo:

  # This file includes global variables that will be available inside your project
  # 1. In the front end code you can access this variables like this: console.log(process.env.VARIABLE_NAME)
  # 1. In the back end code you access the variable by importing os and then typing print(os.getenv('VARIABLE_NAME'))
  
  # Back-End Variables
  DATABASE_URL=postgres://gitpod:postgres@localhost:5432/example
  FLASK_APP_KEY="any key works"
  FLASK_APP=src/app.py
  FLASK_DEBUG=1
  DEBUG=TRUE
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  
  # Front-End Variables
  BASENAME=/
  BACKEND_URL= 
  ```
  

**Instalar tu motor de base de datos y crear tu base de datos**:
   Dependiendo de tu base de datos, debes crear una variable `DATABASE_URL` con uno de los posibles valores, asegurándote de reemplazar los valores con la información de tu base de datos:

   | Motor     | DATABASE_URL                               |
   |-----------|--------------------------------------------|
   | SQLite    | sqlite:////test.db                         |
   | MySQL     | mysql://username:password@localhost:port/example |
   | Postgres  | postgres://username:password@localhost:5432/example |

**Migrar las migraciones** (saltar si no has hecho cambios en los modelos en `./src/api/models.py`):
   ```sh
   $ pipenv run migrate
   ```

**Ejecutar las migraciones**:
   ```sh
   $ pipenv run upgrade
   ```

**Ejecutar la aplicación**:
   ```sh
   $ pipenv run start
   ```

   **Nota**: Los usuarios de Codespaces pueden conectarse a psql escribiendo:
   ```sh
   psql -h localhost -U gitpod example
   ```

**Deshacer una migración**:
   También puedes deshacer una migración ejecutando:
   ```sh
   $ pipenv run downgrade
   ```
**Instalación Manual del Front-End**

1. Asegúrate de estar usando la versión 14+ de Node y de haber instalado y ejecutado exitosamente el backend.
2. Instala los paquetes:
   ```sh
   $ npm install
   ```
3. ¡Empieza a codificar! Inicia el servidor de desarrollo de webpack:
   ```sh
   $ npm run start
   ```
   
## **Nota importante sobre la base de datos y los datos en su interior**

Cada entorno de Github Codespaces tendrá **su propia base de datos**, por lo que si estás trabajando con más personas, cada uno tendrá una base de datos diferente y registros diferentes dentro de ella. Estos datos **se perderán**, así que no pases demasiado tiempo creando registros manualmente para pruebas. En su lugar, puedes automatizar la adición de registros a tu base de datos editando el archivo ```commands.py``` dentro de la carpeta ```/src/api```. Edita la línea 32 de la función ```insert_test_data``` para insertar los datos según tu modelo (utiliza la función ```insert_test_users``` anterior como ejemplo). Luego, todo lo que necesitas hacer es ejecutar ```pipenv run insert-test-data```.


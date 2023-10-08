# cmpc-dogs
Api para gestión e inventario de mascotas CMPC.

### Descripción

API de gestión de mascotas.

### Construcción 🛠️
* **Tipo:** API Rest
* **Lenguaje:** NodeJS
* **Framework:** NestJS
* **Base de datos:** Mysql
* **ORM:** Sequelize

### Autor ✒️
* **Autores:** Jean Carlos Cuadros, cuadrosjean26@gmail.com.

### Estructura del proyecto 📂
- **src:** Carpeta que contiene el código fuente del proyecto.
- **src/config:** Carpeta que contiene la configuración de la base de datos.
- **src/common:** Carpeta que contiene los archivos de handler de validación y estructura de respuesa.
- **src/filters:** Carpeta que contiene los filtros de excepciones.
- **src/dogs:** Carpeta que contiene los archivos de controlador, servicio, modelo y dto de la entidad dogs.
- **src/breeds:** Carpeta que contiene los archivos de controlador, servicio, modelo y dto de la entidad breeds.
- **src/subbreeds:** Carpeta que contiene los archivos de controlador, servicio, modelo y dto de la entidad subbreeds.
- **src/modulo/validators:** Carpeta que contiene los archivos de validaciones que aplica el handler de validación.
- **cmpc_dogs_model.png:** Imagen que contiene el modelo de datos de la base de datos.

### Patrones de diseño implementados 📂

Se implemento el patron de diseño Chain of Responsibility para la validación de las reglas de negocio, se creo una clase ValidationHandler al cual se le puede agregar un pool de validadores y la funcion handler los invoca opr medio de la funcion validate, si la validación es exitosa pasa al siguiente validador, si la validación falla se retorna un error con el mensaje correspondiente.


### Pre-requisitos 📋

- Docker.

### Instalación 🔧

- Clonar proyecto.
- Crear archivo `.env` en la carpeta raíz. Se incluye archivo `.env.example` como referencia, que se puede usar tal cual como está.
- Ejecutar `docker-compose build` para construir las imágenes de Docker. Sólo es necesario hacerlo una vez.
- Ejecutar `docker-compose up` para levantar los servicios. Si se quiere ejecutar en segundo plano, usar `docker-compose up -d`.



### Información de cómo realizar las peticiones al API 📖
El API se encuentra disponible en la URL `http://localhost:3001`. 

### Información de los endpoints disponibles del API 📖
En esta sección se detallan los endpoints disponibles en la API.

Todos los endpoints reciben las siguientes cabeceras:
- **Content-Type:** `application/json`

#### Mascotas

- **Descripción:** Crear una mascota.
- **Método:** `POST`
- **URL:** `/dogs`
- **Body:**
```json
{
    "name": "Nombre de la mascota",
    "breed_id": "Raza de la mascota",
    "subbreed_id": "Subraza de la mascota",
    "color": "Color de la mascota",
    "birthDate": "Fecha de nacimiento"
}
```
- **Respuesta:**
```json
{
    "message": "Mascota creada correctamente",
    "data": {
        "id": "Id de la mascota",
        "name": "Nombre de la mascota",
        "breed_id": "Raza de la mascota",
        "subbreed_id": "Subraza de la mascota",
        "color": "Color de la mascota",
        "birthDate": "Fecha de nacimiento"
    },
    "status": "201"

}
```

- **Respuesta Fallida**
- **code:** 400
- **Respuesta:**
```json
{
    "message": "Errores de validación",
    "errors": [
      "Color must be string" 
    ]
}
```

-**code:** 409
- **Respuesta:**
```json
{
    "message": "La mascota con el nombre Thor ya existe.",
    "status": 409
}
```


- **Descripción:** Obtener todas las mascotas.
- **Método:** `GET`
- **URL:** `/dogs`
- **Respuesta:**
```json
{
    "message": "Mascotas obtenidas correctamente",
    "data": [
        {
            "id": "Id de la mascota",
            "name": "Nombre de la mascota",
            "breed_id": "Raza de la mascota",
            "subbreed_id": "Subraza de la mascota",
            "color": "Color de la mascota",
            "birthDate": "Fecha de nacimiento"
        }
    ],
    "status": "200"
}
```

- **Descripción:** Obtener una mascota por su id.
- **Método:** `GET`
- **URL:** `/dogs/:id`
- **Respuesta:**
```json
{
    "message": "Mascota obtenida correctamente",
    "data": {
        "id": "Id de la mascota",
        "name": "Nombre de la mascota",
        "breed_id": "Raza de la mascota",
        "subbreed_id": "Subraza de la mascota",
        "color": "Color de la mascota",
        "birthDate": "Fecha de nacimiento"
    },
    "status": "200"
}
```

- **Descripción:** Actualizar una mascota.
- **Método:** `PUT`
- **URL:** `/dogs/:id`
- **Body:**
```json
{
    "name": "Nombre de la mascota",
    "breed_id": "Raza de la mascota",
    "subbreed_id": "Subraza de la mascota",
    "color": "Color de la mascota",
    "birthDate": "Fecha de nacimiento"
}
```
- **Respuesta:**
```json
{
    "message": "Mascota actualizada correctamente",
    "data": {
        "id": "Id de la mascota",
        "name": "Nombre de la mascota",
        "breed_id": "Raza de la mascota",
        "subbreed_id": "Subraza de la mascota",
        "color": "Color de la mascota",
        "birthDate": "Fecha de nacimiento"
    },
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 400
- **Respuesta:**
```json
{
    "message": "Errores de validación",
    "errors": [
      "Color must be string" 
    ]
}
```

-**code:** 409
- **Respuesta:**
```json
{
    "message": "La mascota con el nombre Thor ya existe.",
    "status": 409
}
```

- **Descripción:** Eliminar una mascota.
- **Método:** `DELETE`
- **URL:** `/dogs/:id`
- **Respuesta:**
```json
{
    "message": "Mascota eliminada correctamente",
    "status": "200"
}
```

#### Razas

- **Descripción:** Crear una raza.
- **Método:** `POST`
- **URL:** `/breeds`
- **Body:**
```json
{
    "name":"bulldog",
    "description":"perro pequeño con pelaje corto",
    "origin":"francia, inglaterra",
    "height":2,
    "weight":5,
    "lifeSpan":"12 años"
}
```
- **Respuesta:**
```json
{
    "message": "Raza creada correctamente",
    "data": {
        "id": "Id de la raza",
        "name":"bulldog",
        "description":"perro pequeño con pelaje corto",
        "origin":"francia, inglaterra",
        "height":2,
        "weight":5,
        "lifeSpan":"12 años"
    },
    "status": "201"

}
```
- **Respuesta Fallida**
- **code:** 400
- **Respuesta:**
```json
{
    "message": "Errores de validación",
    "errors": [
        "name must be longer than or equal to 3 characters",
        "name must be a string"
    ]
}
```
-**code:** 409
- **Respuesta:**
```json
{
    "message": "La raza con el nombre bulldog ya existe.",
    "status": 409
}
```

- **Descripción:** Obtener todas las razas.
- **Método:** `GET`
- **URL:** `/breeds`
- **Respuesta:**
```json
{
    "message": "Razas obtenidas correctamente",
    "data": [
        {
            "id": "Id de la raza",
            "name":"bulldog",
            "description":"perro pequeño con pelaje corto",
            "origin":"francia, inglaterra",
            "height":2,
            "weight":5,
            "lifeSpan":"12 años"
        }
    ],
    "status": "200"
}
```

- **Descripción:** Obtener una raza por su id.
- **Método:** `GET`
- **URL:** `/breeds/:id`
- **Respuesta:**
```json
{
    "message": "Raza obtenida correctamente",
    "data": {
        "id": "Id de la raza",
        "name":"bulldog",
        "description":"perro pequeño con pelaje corto",
        "origin":"francia, inglaterra",
        "height":2,
        "weight":5,
        "lifeSpan":"12 años"
    },
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la raza con el id 1",
    "status": 404
}
```

- **Descripción:** Actualizar una raza.
- **Método:** `PUT`
- **URL:** `/breeds/:id`
- **Body:**
```json
{
    "name":"bulldog",
    "description":"perro pequeño con pelaje corto",
    "origin":"francia, inglaterra",
    "height":2,
    "weight":5,
    "lifeSpan":"12 años"
}
```
- **Respuesta:**
```json
{
    "message": "Raza actualizada correctamente",
    "data": {
        "id": "Id de la raza",
        "name":"bulldog",
        "description":"perro pequeño con pelaje corto",
        "origin":"francia, inglaterra",
        "height":2,
        "weight":5,
        "lifeSpan":"12 años"
    },
    "status": "200"
}
``` 
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la raza con el id 1",
    "status": 404
}
```

- **Descripción:** Eliminar una raza.
- **Método:** `DELETE`
- **URL:** `/breeds/:id`
- **Respuesta:**
```json
{
    "message": "Raza eliminada correctamente",
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la raza con el id 1",
    "status": 404
}
```

#### Subrazas

- **Descripción:** Crear una subraza.
- **Método:** `POST`
- **URL:** `/subbreeds`
- **Body:**
```json
{
    "name":"Buldog frances",
    "breed_id":1,
    "description":"pelo corto y bajo"
}
```
- **Respuesta:**
```json
{
    "message": "Subraza creada correctamente",
    "data": {
        "id": "Id de la subraza",
        "name":"Buldog frances",
        "breed_id":1,
        "description":"pelo corto y bajo"
    },
    "status": "201"

}
```
- **Respuesta Fallida**
- **code:** 400
- **Respuesta:**
```json
{
    "message": "Errores de validación",
    "errors": [
        "name must be longer than or equal to 3 characters",
        "name must be a string"
    ]
}
```
-**code:** 409
- **Respuesta:**
```json
{
    "message": "La subraza con el nombre Buldog frances ya existe.",
    "status": 409
}
```

- **Descripción:** Obtener todas las subrazas.
- **Método:** `GET`
- **URL:** `/subbreeds`
- **Respuesta:**
```json
{
    "message": "Subrazas obtenidas correctamente",
    "data": [
        {
            "id": "Id de la subraza",
            "name":"Buldog frances",
            "breed_id":1,
            "description":"pelo corto y bajo"
        }
    ],
    "status": "200"
}
```

- **Descripción:** Obtener una subraza por su id.
- **Método:** `GET`
- **URL:** `/subbreeds/:id`
- **Respuesta:**
```json
{
    "message": "Subraza obtenida correctamente",
    "data": {
        "id": "Id de la subraza",
        "name":"Buldog frances",
        "breed_id":1,
        "description":"pelo corto y bajo"
    },
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la subraza con el id 1",
    "status": 404
}
```

- **Descripción:** Actualizar una subraza.
- **Método:** `PUT`
- **URL:** `/subbreeds/:id`
- **Body:**
```json
{
    "name":"Buldog frances",
    "breed_id":1,
    "description":"pelo corto y bajo"
}
```
- **Respuesta:**
```json
{
    "message": "Subraza actualizada correctamente",
    "data": {
        "id": "Id de la subraza",
        "name":"Buldog frances",
        "breed_id":1,
        "description":"pelo corto y bajo"
    },
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la subraza con el id 1",
    "status": 404
}
```

- **Descripción:** Eliminar una subraza.
- **Método:** `DELETE`
- **URL:** `/subbreeds/:id`
- **Respuesta:**
```json
{
    "message": "Subraza eliminada correctamente",
    "status": "200"
}
```
- **Respuesta Fallida**
- **code:** 404
- **Respuesta:**
```json
{
    "message": "No se encontró la subraza con el id 1",
    "status": 404
}
```

##  conectarse a la base de datos mysql que está en un contenedor docker

- entrar al contenedor dorcker de mysql
```bash
docker exec -it mysql bash
```
- conectarse a mysql
```bash
mysql -U root -p
```
- ingresar la contraseña
```bash
admin
```
- seleccionar la base de datos
```bash
use dog_manager;
```
- mostrar las tablas
```bash
show tables;
```
- mostrar los registros de una tabla
```bash
select * from Dogs;
```




# 📓 App de Notas Fullstack

Aplicación web que permite a los usuarios **crear y ver sus propias notas**. Está dividida en dos partes:

- **Frontend**: construido con Angular
- **Backend**: construido con Spring Boot, usando autenticación **JWT almacenado en cookies** para manejar sesiones seguras y **MySQL** para la persistencia de datos.

---

## 🖼️ Demo

![log in](https://github.com/Mayimauro/NoteApp/blob/main/assets/Log%20in.png?raw=true)
![singUp](https://github.com/Mayimauro/NoteApp/blob/main/assets/Sing%20up.png?raw=true)
![home](https://github.com/Mayimauro/NoteApp/blob/main/assets/Home%201.png?raw=true")
![home 2](https://github.com/Mayimauro/NoteApp/blob/main/assets/Home%202.png?raw=true)
![nueva nota](https://github.com/Mayimauro/NoteApp/blob/main/assets/Nueva%20nota.png?raw=true)

---

## Respuestas de la API
**Endpoint de Usuario** `/api/v1/user`

GET`/api/v1/user`
- **Descripción:** Devuelve el **nombre real** del usuario actualmente autenticado (extraído del JWT en la cookie).

**Respuesta exitosa**
Código `200 OK` 
- devuelve el nombre del usuario en String.

**Respuestas de error**
Código:`401 UNAUTHORIZED`  
- Causa No hay token o es inválido.

---

**Endpoints de Notas** `/api/v1/tarea`
**POST** `/api/v1/tarea`

- **Descripción:** Crea una nueva tarea para el usuario autenticado.
- **Body (JSON):**
```json
{
  "titulo": "Estudiar Spring",
  "descripcion": "Revisar controladores, servicios, y JWT",
  "completada": false
}
```
**Respuesta exitosa**
Código `200 OK` 
---
**GET** `/api/v1/tarea`
- **Descripción:** Devuelve todas las tareas asociadas al usuario autenticado.
- **Respuesta exitosa**
Código `200 OK` 
---
**PUT** `/api/v1/tarea/{id}`
- **Descripción:** Actualiza una tarea específica si pertenece al usuario autenticado.
**Body (JSON):**
```
{
  "titulo": "Estudiar Spring Boot",
  "descripcion": "Actualizar controladores y agregar seguridad",
  "completada": true
}
```
**Respuestas exitosa:**
Código `200 OK` 
 - Devuelve la tarea actualizada.
 
**Respuestas de error:**
Código:`401 UNAUTHORIZED`  
 - Si el usuario no es dueño de la tarea.
 
---
**DELETE** `/api/v1/tarea/{id}`
- **Descripción:** Elimina una tarea si pertenece al usuario autenticado.
**Respuestas exitosa**:
Código `200 OK`
- Tarea eliminada correctamente.


 **Respuestas de error:**
Código:`403 FORBIDDEN`
- No autorizado para eliminar esa tarea.


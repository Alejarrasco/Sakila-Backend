# API actores Documentación
## Rutas de Autenticación
### Login
- __Ruta__: `POST /login`
- __Descripción__: Esta ruta se utiliza para iniciar sesión en la aplicación.
- __Parámetros__ Requeridos: Los parámetros se esperan en el cuerpo de la solicitud y deben incluir el nombre de usuario y la contraseña.
- __Respuesta Exitosa:__ Si las credenciales son válidas, se devolverá un JSON con el mensaje "Login exitoso".
- __Respuesta de Error:__ Si las credenciales son inválidas, se devolverá un código de estado 401 con un JSON que contiene un mensaje de error.
### Logout
- __Ruta:__ `GET /logout`
- __Descripción:__ Esta ruta se utiliza para cerrar sesión en la aplicación.
- __Respuesta Exitosa:__ Un JSON con el mensaje "Logout exitoso" será devuelto después de cerrar la sesión.
### Perfil
- __Ruta:__ `GET /profile`
- __Descripción:__ Esta ruta se utiliza para obtener el perfil del usuario actual.
- __Respuesta Exitosa:__ Si el usuario está autenticado, se devolverá un JSON que contiene la información del usuario.
- __Respuesta de Error:__ Si el usuario no está autenticado, se devolverá un código de estado 401 con un JSON que contiene un mensaje de error.
## Rutas para Operaciones CRUD en la tabla "actor"
### Obtener Todos los Actores
- __Ruta:__ `GET /actors`
- __Descripción:__ Esta ruta se utiliza para obtener una lista de actores desde la base de datos.
- __Parámetros Opcionales:__ Se pueden proporcionar los parámetros de consulta page y pageSize para paginar los resultados.
- __Respuesta Exitosa:__ Devuelve un JSON que contiene la lista de actores. Si se especifican los parámetros de paginación, se mostrarán los resultados paginados.
- __Respuesta de Error:__ Si se produce un error al obtener los actores, se devolverá un código de estado 500 con un mensaje de error.
### Obtener un Actor por ID
- __Ruta:__ `GET /actors/:id`
- __Descripción:__ Esta ruta se utiliza para obtener un actor específico por su ID.
- __Parámetros Requeridos:__ El ID del actor se debe proporcionar en la URL.
- __Respuesta Exitosa:__ Si se encuentra un actor con el ID proporcionado, se devolverá un JSON con los detalles del actor.
- __Respuesta de Error:__ Si no se encuentra un actor con el ID proporcionado, se devolverá un código de estado 404 con un mensaje de error. Si se produce un error en la consulta, se devolverá un código de estado 500 con un mensaje de error.
### Crear un Actor
- __Ruta:__ `POST /actors`
- __Descripción:__ Esta ruta se utiliza para crear un nuevo actor en la base de datos.
- __Parámetros Requeridos:__ Los datos del actor deben proporcionarse en el cuerpo de la solicitud en formato JSON.
- __Respuesta Exitosa:__ Si el actor se crea con éxito, se devolverá un código de estado 201 con un mensaje de éxito.
- __Respuesta de Error:__ Si los datos proporcionados no son válidos o si se produce un error al crear el actor, se devolverá un código de estado 400 o 500, respectivamente, con un mensaje de error.
### Actualizar un Actor por ID
- __Ruta:__ `PUT /actors/:id`
- __Descripción:__ Esta ruta se utiliza para actualizar un actor existente por su ID.
- __Parámetros Requeridos:__ El ID del actor a actualizar se debe proporcionar en la URL, y los datos actualizados se deben enviar en el cuerpo de la solicitud en formato JSON.
- __Respuesta Exitosa:__ Si el actor se actualiza con éxito, se devolverá un JSON con un mensaje de éxito.
- __Respuesta de Error:__ Si los datos proporcionados no son válidos o si se produce un error al actualizar el actor, se devolverá un código de estado 400 o 500, respectivamente, con un mensaje de error.
### Eliminar un Actor por ID
- __Ruta:__ `DELETE /actors/:id`
- __Descripción:__ Esta ruta se utiliza para eliminar un actor por su ID.
- __Parámetros Requeridos:__ El ID del actor a eliminar se debe proporcionar en la URL.
- __Respuesta Exitosa:__ Si el actor se elimina con éxito, se devolverá un JSON con un mensaje de éxito.
- __Respuesta de Error:__ Si se produce un error al eliminar el actor, se devolverá un código de estado 500 con un mensaje de error
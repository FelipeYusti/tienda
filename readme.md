# NOTAS DEL PROYECTO

- Tener en cuenta si no corre el NodeJs, habilitar ejecucion de SCRIPTS en PowerShell en modo Admin.
- Ecutaremos el comando Set-ExecutionPolicy RemoteSigned -Scope CurrentUse.

=================================================================

- Usaremos 2 arquitecturas : Orientada a Servicios (API REST) para el Backend
- Iternamente usaremos el MVC ( Tenga en cuenta que las vistas se replanzan por EndPoints o RUTAS)

1- Creamos las carpetas para el MVC (controllers,models,rutas).
2- Instalamos los paquetes claves : npm i nodemon express cors mongoose bcryptjs jsonwebtoken multer.

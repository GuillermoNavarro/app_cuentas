# App Cuentas Domésticas

Herramienta Full Stack para el control y optimización de gastos e ingresos de las cuentas del hogar.


## Stack Tecnológico Utilizado

El proyecto está diseñado bajo una arquitectura de capas desacopladas, separando la persistencia, la lógica de negocio y la presentación, realizando la comunicación entre ellas mediante una API REST.

* **Frontend:** Desarrollado con **Vue 3**, garantizando una interfaz ágil, reactiva y modular.
* **Backend:** API REST construida con **Node.js y Express**, encargada de la lógica de negocio, validación de datos y comunicación con el motor de base de datos.
* **Base de Datos:** **MariaDB**, elegida por su robustez, rendimiento y compatibilidad con sistemas relacionales.
* **Infraestructura y DevOps:** **Docker y Docker Compose** para la creación de contenedores del entorno, utilizando **Nginx como proxy inverso** para centralizar el tráfico, servir los archivos estáticos del front y redirigir las peticiones '/api/' de forma segura.


## Retos Técnicos y Optimización

En este proyecto se han solucionado problemas reales de rendimiento, precisión y experiencia de usuario (UX).

### Optimización del Rendimiento en Base de Datos
Para optimizar las consultas mensuales recurrentes, que constituyen el flujo principal de carga de la aplicación, se ha diseñado e implementado un **índice compuesto** `(id_hogar, fecha)` en MariaDB. De forma que se evita que el motor realice escaneos completos de las tablas a medida que crece el histórico, acelerando la renderización del mes actual y optimizando colateralmente los rangos de fechas del resumen anual.

### Gestión Estricta de Rangos y Cierre de Mes en JavaScript
Se ha implementado una lógica rigurosa para el manejo de objetos `Date` en el backend, resolviendo las limitaciones de fecha de las bases de datos al consultar históricos. Mediante el uso de métodos como `setDate(0)`, el sistema calcula de forma exacta el último día de cada mes. Esto asegura que las consultas SQL bajo el operador `BETWEEN` obtengan todos los registros del mes completo sin omitir importes.

### Automatización Adaptativa de Lógica de Negocio
En el backend se ha desarrollado un servicio inteligente para gestionar la recurrencia financiera a través de cuotas previstas. Al crear un patrón financiero, el sistema calcula los rangos temporales y autogenera en bloque los recibos mensuales futuros. El servicio protege el histórico ya pagado (`estado = true`) discriminando el estado de los recibos para realizar modificaciones o cancelaciones en los patrones de forma segura.

### Filtros Reactivos en Frontend
Para maximizar la velocidad de la interfaz en dispositivos móviles, se han implementado **propiedades computadas (`computed`)** en Vue 3. Al conmutar el filtro entre *"Todos los recibos"* y *"Solo pendientes"*, el navegador procesa la información instantáneamente sobre el array de datos ya existente en memoria, eliminando peticiones HTTP repetitivas al servidor y cálculos innecesarios. 

### Documentación OpenAPI en Entornos de Ejecución Seguros
Mediante la variable `NODE_ENV` en el punto de entrada de la aplicación (`app.js`) se ha implementado el control de entornos, protegiendo y aislando la documentación interactiva de la API con **Swagger UI** para que no sea accesible en el entorno de producción.


## Instalación y Despliegue Local

Este proyecto utiliza Docker para empaquetar de forma automatizada tanto el servidor de base de datos como las aplicaciones de frontend y backend.

### Requisitos previos
* Docker y Docker Compose instalados.

### Instalación del entorno:
```bash
# 1. Clonar el repositorio
git clone https://github.com/GuillermoNavarro/app_cuentas.git
cd app_cuentas

# 2. Configurar las variables de entorno
cp .env.example .env

# 3. Levantar el entorno de producción
docker compose up -d --build
```
*(Nota sobre el entorno: Es necesario editar el archivo .env recién creado y rellenar las credenciales esenciales (como las contraseñas de la base de datos y la clave de firma de JWT) para garantizar el correcto arranque de los servicios.)*

### Datos de acceso Preconfigurados
El script de inicialización automatizada (`init.sql`) se encarga de estructurar la base de datos e insertar de forma directa un hogar y un usuario de prueba para poder testear la plataforma de inmediato en el entorno local.

* Email: admin@cuentas.local
* Password: admin1234
*(Nota: obligará al cambio de contraseña la primera vez que se acceda)*

Una vez levantado, la aplicación es accesible a través de:
* Aplicación(Frontend): http://localhost:81
* API Gateway(Backend): http://localhost:81/api/


# FrontEnd - Módulo 6, Ejercicio 2

## Descripción del proyecto

Este proyecto consiste en una página web para un hospital ficticio, incluyendo sus diferentes servicios y personal médico.
Se continúa con el proyecto iniciado en el Módulo 4.

## Ejercicio

### Implementación de Almacenamiento Web

Se utiliza el almaceniamiento en `localStorage` para guardar la información del usuario actualmente logeado en el sitio.

### Implementación de IndexedDB

Se utiliza `IndexedDB` para almacenar las reservas realizadas, las cuales se pueden ver desde la página de Administración entrando como usuario administrador.

#### Para realizar una reserva:
Iniciar sesión con el usuario de prueba
- user: juanito
- pass: juanito

Realizar la reserva seleccionando especialidad y doctor.

#### Para ver reservas almacenadas:
Iniciar sesión con el usuario administrador:
- user: admin
- pass: admin

### Despliegue y Configuración del Service Worker Personalizado

Se despliega y configura el service worker personalizado, incluyendo cache tanto para `IndexedDB` como para `localStorage`.

### Pruebas de Rendimiento con Lighthouse

Se ejecutó Lighthouse en modo offline, validando el funcionamiento del service worker y la PWA y obteniendo los siguientes resultados:

![image](https://raw.githubusercontent.com/njaramillo-ortiz/FE_M6_E2/refs/heads/main/src/images/lighthouse.png)

Requiere Node.js y npm instalados para su uso.
Desde la raíz del proyecto:
- Ejecutar el comando `npm install` para instalar las dependencias del proyecto.
- Ejecutar el comando `json-server db.json` para ejecutar la API simulada con base de datos.
- Ejecutar el comando `npm run dev` para ejecutar el proyecto.

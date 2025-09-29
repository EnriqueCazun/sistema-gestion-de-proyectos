# Sistema de Gestión de Proyectos

Este es un sistema de gestión de proyectos desarrollado en **React**, utilizando **json-server** como una API REST para manejar datos de manera sencilla.

Permite crear, listar y administrar proyectos y tareas.

---

## Tecnologías utilizadas

* React
* json-server
* JavaScript (ES6+)
* npm

---

## Estructura del proyecto

```
sistema-gestion-de-proyectos/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.js
│── db.json
│── package.json
```

---

## Instalación y ejecución

1. Clonar el repositorio o descomprimir el proyecto.

   ```bash
   git clone <url-del-repo>
   cd sistema-gestion-de-proyectos
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar el servidor React (en la primera terminal):

   ```bash
   npm start
   ```

4. Ejecutar el servidor de base de datos con **json-server** (en otra terminal):

   ```bash
   json-server --watch db.json --port 5000
   ```

---

## 🌐 Acceso a la aplicación

* Frontend: [http://localhost:3000](http://localhost:3000)
* API (json-server): [http://localhost:5000](http://localhost:5000)

---

## Notas

* Asegúrate de tener instalado `json-server` globalmente o bien como dependencia:

  ```bash
  npm install -g json-server
  ```
* Los datos se almacenan en el archivo que ya viene dentro del trabajo `db.json`.

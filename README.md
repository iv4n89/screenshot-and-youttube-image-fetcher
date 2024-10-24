# Free learning resources - Frontend

Esta es la parte frontend de este proyecto. Se nutre de los datos obtenidos desde el repositorio [free-learning-resources](https://github.com/iv4n89/free_learning_resources)

Al modificar los datos del json `resources.json` de este repositorio se actualizarán los datos, incluido un screenshot de la web a la que hacemos referencia.

## Levantar el proyecto

Para levantar el proyecto será necesario primero instalar dependencias

```bash
npm i
```

Después de esto podemos levantar el proyecto en entorno de desarrollo

```bash
npm run dev
```

También podemos generar una build de producción 

```bash
npm build
npm start
```

## Demo

Este proyecto está desplegado en Vercel

https://free-learn-resources.vercel.app/

Cualquier modificación a la rama `main` de este repositorio generará una nueva build en Vercel.

Los cambios en el json de recursos no necesitan de una nueva build.

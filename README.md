# 🌍 Explorador de Países

Aplicación web desarrollada con **Next.js** que consume la API pública [REST Countries](https://restcountries.com/) y permite explorar información detallada de todos los países del mundo.

## Características

- Listado de todos los países con bandera y nombre.
- Búsqueda en tiempo real por nombre.
- Página de detalle por país con: nombre oficial, capital, región, subregión, población e idiomas.
- Navegación con rutas dinámicas (`/country/[name]`).
- Diseño responsive con CSS Modules.

## Instrucciones para ejecutar el proyecto

### Prerequisitos

- Node.js 18+ instalado.
- npm (incluido con Node.js).

### Pasos

```bash
# 1. Clona el repositorio
git clone <URL_DEL_REPOSITORIO>
cd practica2-front

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Otros comandos

```bash
npm run build   # Construye la aplicación para producción
npm start       # Inicia el servidor en modo producción (tras build)
```

## Estructura del proyecto

```
src/
├── app/
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout raíz con metadatos
│   ├── page.tsx                 # Página principal: listado y búsqueda
│   ├── page.module.css          # Estilos de la página principal
│   └── country/
│       └── [name]/
│           ├── page.tsx         # Página dinámica de detalle de país
│           └── page.module.css  # Estilos de la página de detalle
└── components/
    └── CountryCard/
        ├── CountryCard.tsx      # Componente reutilizable de tarjeta de país
        └── CountryCard.module.css
```

## API utilizada

[REST Countries v3.1](https://restcountries.com/)

- Listado: `GET https://restcountries.com/v3.1/all?fields=name,flags`
- Detalle: `GET https://restcountries.com/v3.1/name/{name}?fields=name,flags,capital,region,subregion,population,languages`

## Tecnologías

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- TypeScript
- CSS Modules


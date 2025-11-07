# PrimerPaso — Backend

Este repositorio contiene el backend del proyecto PrimerPaso. Esta rama corresponde a la versión inicial del backend exportada desde el repositorio principal.

Estado y notas de migración (06-11-2025)

- El backend se ha exportado a la rama `initial-backend` para continuar el desarrollo en su propio repositorio.
- Implementación actual: Astro (nota: este es el scaffold inicial exportado; adaptar si se prefiere Express/Node u otro framework para producción).
- Versión del backend: 0.1.0
- Estado: en proceso de migración y refactorización. Se recomienda revisar `package.json`, scripts de arranque y la configuración de variables de entorno antes de ponerlo en producción.

Instrucciones rápidas

- Para revisar o trabajar en esta rama:

```bash
git fetch origin
git checkout backend
```

- Para proponer cambios en el repositorio canónico del backend (remoto): crear ramas de feature (por ejemplo `backend/feature/auth`) y abrir pull requests hacia `initial-backend`.

Fecha: 06-11-2025
# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

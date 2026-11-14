# Task 4 — continuación de Task 3

Este proyecto mantiene la tarjeta de perfil de mi **Task 3** y agrega la práctica de **Sprint 4** (Rick and Morty Explorer). Se puede cambiar de sección con los botones de arriba.

## Qué funciona

- **Mi perfil:** Follow, Message, selección de habilidades, proyectos horizontales, modal para compartir.
- **Rick and Morty:** API HTTP con `fetch`, `useEffect`, `FlatList`, carga inicial, errores con reintento, lista vacía, paginación, actualizar jalando y búsqueda con debounce de 500 ms.

## Para correrlo

```bash
npm install
npx expo start
```

Abre el código QR desde Expo Go en el iPhone. Necesitas internet para consultar los personajes.

## Archivos principales

- `src/screens/ProfileScreen.js`: pantalla que venía del Task 3.
- `src/screens/CharactersScreen.js`: pantalla nueva para Sprint 4.
- `src/services/charactersService.js`: petición a la API.
- `src/components/CharacterCard.js` y `StateMessage.js`: componentes de la plantilla.
- `PREGUNTAS_REFLEXION.md`: respuestas a la práctica.
- `GUIA_ALUMNO.md`: guía original del profesor.

## Para entregar

Revisa las dos pantallas en Expo Go, toma capturas y sube los cambios a tu repositorio de GitHub. Los archivos de `node_modules` no se suben.

**Nota:** La plantilla del Sprint 4 proponía una aplicación independiente. Aquí se integró como segunda sección para conservar el Task 3, como continuación del mismo proyecto.

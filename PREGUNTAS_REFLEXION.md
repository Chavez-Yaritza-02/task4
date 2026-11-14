# Preguntas de reflexión — Sprint 4

**Alumno:** Yaritza Chávez Chávez

## Paso 1

| Pregunta | Mi respuesta |
|---|---|
| ¿Cuántos personajes trae cada página? | Normalmente 20. |
| ¿Qué campo indica la página siguiente? | `info.next`. |
| ¿Qué valor tiene en la última página? | `null`. |
| ¿Qué código devuelve una búsqueda sin resultados? | 404. |
| ¿Qué campos usa CharacterCard? | `name`, `status`, `species` e `image`. También uso `id` para la lista. |

## Paso 2

`fetch` puede fallar por conexión y ni siquiera recibir una respuesta. En cambio, si el servidor responde 404 o 500, sí llegó una respuesta y tengo que revisar `response.ok` o `response.status`.

## Paso 3

Guardo los personajes en `useState` porque al llegar los datos quiero que la pantalla se actualice. Una variable normal no hace que React dibuje otra vez.

## Paso 4

1. Sin dependencias, el efecto se ejecuta después de cada render y puede hacer muchas peticiones.
2. Con `[]` corre al montar el componente (en desarrollo puede verse una ejecución adicional por Strict Mode).
3. No pongo `async` directamente en `useEffect` porque debe devolver una función de limpieza o nada, no una promesa. Creo una función async adentro.

## Paso 5

1. `keyExtractor` le da una llave única a cada personaje para que React sepa cuál es cuál.
2. `FlatList` es mejor para una lista grande porque no necesita dibujar todos los elementos de golpe, como lo haría un `ScrollView` con `map`.

## Paso 6

Con el botón Reintentar puedo volver a cargar cuando regrese el internet. Si solo dejo la pantalla vacía, no se entiende qué pasó.

## Paso 8

Si se llama varias veces, podría pedir la misma página y repetir personajes. Lo evité revisando si ya hay una carga en curso con un `useRef`.

## Paso 9

`refreshing` es distinto de `loading` porque al jalar para actualizar quiero conservar la lista visible y mostrar el indicador de actualización, no quitar todo.

## Paso 10

1. Debounce significa esperar un momento después de escribir antes de buscar. Así no hago una petición por cada letra.
2. La limpieza cancela el temporizador anterior cuando sigo escribiendo. En la carga también cancelo peticiones anteriores con `AbortController`.
3. Una respuesta vieja podría aparecer encima de una búsqueda nueva. Comparo una versión de la petición para ignorar respuestas anteriores.

## Cierre

Si tuviera una hora más, agregaría un filtro por estado (Alive, Dead) y una pantalla con más información al tocar cada personaje.

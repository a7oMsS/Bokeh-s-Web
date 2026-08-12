# Bokeh's — página de beta cerrada

Sitio estático de 2 pantallas: gate de código → registro → link de descarga (itch.io), más una página de feedback separada. Sin backend propio — Netlify guarda los envíos de los formularios.

## Archivos

- `index.html` — landing, gate de código, registro, reveal del acceso
- `feedback.html` — formulario de feedback post-juego
- `style.css` — todo el sistema visual
- `script.js` — lógica del gate + envío de formularios

## Antes de compartir el link: edita 3 líneas

Abre `script.js`, arriba del todo:

```js
const ACCESS_CODE = "LJOSSTEINN";                       // el código que le das a tus testers
const ITCH_URL = "https://TU-USUARIO.itch.io/bokehs-beta"; // tu link real de itch.io
const ITCH_PASSWORD = "TU-PASSWORD-DE-ITCH";              // el password que pongas en itch.io
```

Nota de seguridad honesta: el gate de código es del lado del cliente (visible si alguien abre el código fuente). Para una beta cerrada informal está bien — no es una cerradura real, es una forma de que no entre cualquiera que llegue al link por accidente.

## Configurar itch.io

1. Sube tu build de Windows y el APK de Android al mismo proyecto de itch.io.
2. En **Edit theme / Visibility & access**, ponlo como **Restricted** y define una contraseña.
3. Copia esa URL y esa contraseña a `script.js` (arriba).

## Desplegar en Netlify

1. Sube esta carpeta a un repo de GitHub (el que ya tenías pensado).
2. En [netlify.com](https://netlify.com) → **Add new site → Import from Git** → selecciona el repo.
3. Build command: vacío. Publish directory: `/` (raíz). Netlify detecta los `<form data-netlify="true">` automáticamente al desplegar — no hay que configurar nada más.
4. Netlify te da un dominio gratis tipo `bokehs-beta.netlify.app`. Puedes conectar un dominio propio después desde **Domain settings** si tienes uno.

## Revisar registros y feedback

Dashboard de Netlify → tu sitio → **Forms**. Vas a ver dos formularios: `registro-beta` y `feedback-beta`, cada uno con todas las respuestas. Puedes activar notificaciones por email en **Forms → Settings and usage → Form notifications** para que te llegue cada envío a tu correo.

Límite del plan gratis: 100 envíos de formulario al mes — de sobra para una beta cerrada.

## Probar en local antes de desplegar

Abrir `index.html` directo en el navegador funciona para ver el gate y el diseño, pero **los formularios no se van a enviar** (Netlify solo procesa envíos en un sitio ya desplegado ahí). Para probar el envío real, despliega primero y prueba en la URL de Netlify.

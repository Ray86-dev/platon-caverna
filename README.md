# Platón y la caverna · Web interactiva (2.º Bachillerato)

Aventura interactiva basada en la **Unidad 1** (Los orígenes de la filosofía. El idealismo de Platón).
El alumnado "sale de la caverna" a través de 7 estaciones; la barra de **Luz** de la cabecera sube con su progreso.

## Cómo usarla
- **En local:** abre `index.html` con doble clic (no necesita instalar nada).
- **Publicarla:** sube la carpeta `platon/` tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages, Moodle/Aules como recurso web…).
- Los vídeos (YouTube) y las tipografías (Google Fonts) requieren conexión a internet.
- El progreso y las respuestas se guardan **solo en el navegador del alumno** (no hay servidor ni datos personales).
  El alumno descarga su **cuaderno de campo (.txt)** o su diploma (imprimir/PDF) para entregarlo.

## Estaciones
1. Las sombras: mito→lógos, presocráticos, sofistas, Sócrates, vida y obras de Platón.
2. El fuego y los objetos: dualismo ontológico, Teoría de las Ideas, Timeo, crítica del Parménides.
3. El carro y las cadenas: alma tripartita, inmortalidad, mito de Er.
4. La luz del Sol: reminiscencia (Menón), grados del conocimiento, Mito de la Caverna.
5. El camino de ascenso: ética (tres definiciones de virtud, justicia).
6. El regreso a la cueva: política, castas, triple fundamento, degeneración de gobiernos.
7. Fuera de la cueva: mapa de dualismos, prueba final (10 de 20 preguntas al azar), comentario de texto, diploma.

## Cómo editar el contenido
- `js/content.js`: todas las estaciones, pasos, preguntas, el banco del examen (`EXAM`) y los vídeos (`VIDEOS`).
- `js/glossary.js`: glosario. En los textos, `[[clave|texto]]` crea un término clicable.
- `js/engine.js`: tipos de reto genéricos (`reflect`, `quiz`, `match`, `sort`, `order`, `cards`, `video`).
- `js/widgets.js`: experiencias específicas (diálogo socrático, círculo, carro, Menón, caverna…).
- `css/styles.css`: diseño.

## Importante: revisa los vídeos
Los enlaces de YouTube se seleccionaron por su título y descripción, **no se han visualizado completos**.
Revísalos antes de usarlos en clase y cámbialos en `VIDEOS` si prefieres otros (basta el ID del vídeo).
Nota: el texto del Mito de la Caverna del apartado de comentario es una paráfrasis; para el examen, usa la traducción literal.

/* Contenido de la web. Cada estación = lista de pasos que se desbloquean en orden.
   Marcado en textos: **negrita**, *cursiva*, [[clave|texto]] = término del glosario. */

window.VIDEOS = {
  mitoLogos: { id: 'LhSc_9laEt4', title: 'El inicio de la filosofía: mito y logos' },
  presocraticos: { id: 'UAPZ-wShjhs', title: 'Los presocráticos (TitiCLB)' },
  socrates: { id: '4TZI9E5rQbw', title: 'Sócrates para 2º de Bachillerato (TitiCLB)' },
  ideas: { id: 'Yscq3PauprE', title: 'Platón: teoría de las Ideas y dualismos' },
  platonBach: { id: 'E5OJ-AXrHpk', title: 'Platón, Filosofía 2º Bachillerato' },
  caverna: { id: 'IVgqvOvabVQ', title: 'El mito de la caverna, explicado fácil' },
  cavernaHist: { id: 'xaMRW2uvfNI', title: 'El mito de la caverna · Filosofía en historietas' },
  carro: { id: '027RpiLTg7w', title: '¿Qué es el mito del carro alado?' },
  alma: { id: 'cSgsvjqNcEg', title: 'Platón: el alma y su división' },
  menon: { id: 'bWMTtC_TDeI', title: 'El esclavo de Menón' },
  estado: { id: 'gUqOHNLq1Dg', title: 'El Estado ideal de Platón' },
  gobiernos: { id: 'PCTQdA1ngVM', title: 'Formas de gobierno según Platón' }
};

window.STATIONS = [
/* ═════════════════════════ 0 · LAS SOMBRAS ═════════════════════════ */
{
  id: 'sombras', num: 1, icon: '🌑', title: 'Las sombras', subtitle: 'Antes de Platón',
  epigraph: 'Todavía estás encadenado: lo que sabes del mundo te lo han contado las sombras. Averigua de dónde viene la filosofía… y por qué Platón se atrevió a mirar atrás.',
  grade: 'eikasía', objectives: ['Del mito al lógos', 'Presocráticos, sofistas y Sócrates', 'Biografía y obras de Platón'],
  steps: [
    { type: 'reflect', kicker: 'Pregunta inicial', title: 'Un trueno en Mileto',
      prompt: 'Estás en una ciudad griega del siglo VII a. C. Cae un rayo, retumba un trueno y nadie sabe qué ha pasado. **¿Cómo lo explicarías tú?** Escribe tu explicación en pocas líneas.',
      hints: ['Piensa: ¿quién o qué lo causa? ¿Una voluntad que actúa por capricho, o algo que sucede siempre del mismo modo?', '¿Tu explicación podría comprobarse o repetirse? ¿O depende de que alguien lo quiera?'],
      reveal: { title: 'Lo que cambió en Grecia', body: ['Si has hablado de dioses enfadados, has razonado como el **[[mito|mito]]**: fuerzas personificadas, caprichosas e imprevisibles (*antropomorfismo*).', 'Si has buscado una causa natural y regular, has dado el salto al **[[logos|lógos]]**: explicar un hecho natural por otros hechos naturales. Ese paso, hacia el s. VII a. C., es el nacimiento de la filosofía.', 'Platón nace en plena transición y **mezcla las dos cosas**: argumenta con razones… pero cuando llega a lo más profundo, ¡cuenta mitos! (la Caverna, el Carro alado, Er…).'] } },

    { type: 'sort', kicker: 'Reto', title: 'Mito o lógos',
      prompt: 'Clasifica cada afirmación. Pulsa una tarjeta y después la columna (o arrástrala).',
      buckets: [{ id: 'mito', label: 'Mito', hint: 'μῦθος' }, { id: 'logos', label: 'Lógos', hint: 'λόγος' }],
      items: [
        { text: 'Los truenos son la ira de Zeus.', bucket: 'mito' },
        { text: 'Los fenómenos dependen de voluntades sobrenaturales que escapan al control humano.', bucket: 'mito' },
        { text: 'Lo que ocurre podría suceder de cualquier otro modo, por capricho de los dioses.', bucket: 'mito' },
        { text: 'Cuenta relatos simbólicos con héroes y dioses personificados.', bucket: 'mito' },
        { text: 'Busca el fundamento de un hecho natural en otros hechos naturales.', bucket: 'logos' },
        { text: 'Sostiene que la naturaleza tiene orden, regularidad y causas.', bucket: 'logos' },
        { text: 'Pregunta por el principio (arkhé) que explica la variedad del mundo.', bucket: 'logos' },
        { text: 'Exige justificar las explicaciones con razones.', bucket: 'logos' }
      ],
      after: 'Arbitrariedad frente a causalidad, caos frente a orden. Tú también heredas ese legado sin darte cuenta.' },

    { type: 'match', kicker: 'Reto', title: 'La carrera por el arkhé',
      prompt: 'Los **presocráticos** preguntaron: «¿de qué está hecho todo?». Une cada pensador con su respuesta.',
      pairs: [
        ['Tales de Mileto', 'El agua'],
        ['Anaximandro', 'El ápeiron (lo ilimitado)'],
        ['Anaxímenes', 'El aire'],
        ['Pitágoras', 'Los números y las figuras'],
        ['Heráclito', 'El fuego y el devenir'],
        ['Empédocles', 'Cuatro elementos + amor y discordia'],
        ['Demócrito', 'Los átomos y el vacío'],
        ['Parménides', 'El ser, único e inmutable']
      ],
      after: 'Fíjate: de lo material (agua, aire) se pasa a lo abstracto (ápeiron, números, ser). Esa abstracción es el camino hacia las Ideas.' },

    { type: 'sort', kicker: 'Reto clave', title: 'Heráclito contra Parménides',
      prompt: 'Dos gigantes, dos visiones opuestas. ¿De quién es cada frase? **Presta atención: Platón heredará a los dos.**',
      buckets: [{ id: 'her', label: 'Heráclito', hint: 'todo fluye' }, { id: 'par', label: 'Parménides', hint: 'el ser es' }],
      items: [
        { text: 'No es posible bañarse dos veces en el mismo río.', bucket: 'her' },
        { text: 'Todo fluye (πάντα ῥεῖ): la realidad es cambio constante.', bucket: 'her' },
        { text: 'La armonía del cosmos nace de la lucha de los contrarios.', bucket: 'her' },
        { text: 'El fuego es el elemento del que todo brota y al que todo vuelve.', bucket: 'her' },
        { text: 'Solo existe lo que permanece idéntico a sí mismo: el ser es inmutable, eterno e indivisible.', bucket: 'par' },
        { text: 'Del no-ser nada puede surgir: el cambio es solo apariencia.', bucket: 'par' },
        { text: 'Los sentidos engañan: solo la razón alcanza la verdad.', bucket: 'par' },
        { text: 'Hay dos vías: la de la verdad (el ser) y la de la opinión (las apariencias).', bucket: 'par' }
      ] },

    { type: 'reflect', kicker: 'Descubre', title: 'Un problema sin resolver',
      prompt: 'Heráclito tiene razón en que **lo que vemos cambia siempre**. Parménides tiene razón en que **la verdad no puede cambiar**. Los dos parecen incompatibles. **¿Qué solución se te ocurre para salvar a los dos?**',
      hints: ['¿Y si la realidad no fuera una sola cosa?', 'Piensa en «dos tipos de realidad»: una que cambia y otra que no. ¿Qué lugar ocuparía cada una?'],
      reveal: { title: 'La jugada maestra de Platón', body: ['Platón divide la realidad en **dos mundos**: el **[[sensible|mundo sensible]]** (Heráclito: cambio, apariencia, opinión) y el **[[inteligible|mundo inteligible]]** (Parménides: ser inmutable, accesible a la razón).', 'Esa idea —el **[[dualismo|dualismo]]**— es la llave de todo el sistema. En la Estación 2 la descubrirás por ti mismo.'] } },

    { type: 'sort', kicker: 'Reto', title: 'Sofistas frente a Sócrates',
      prompt: 'En el s. V a. C. la filosofía deja el cosmos y mira al ser humano: el **giro antropológico**. Pero hay dos formas de hacerlo.',
      buckets: [{ id: 'sof', label: 'Sofistas', hint: 'Protágoras · Gorgias' }, { id: 'soc', label: 'Sócrates', hint: '470-399 a. C.' }],
      items: [
        { text: 'Enseñan retórica a cambio de dinero para triunfar en la vida pública.', bucket: 'sof' },
        { text: 'No hay verdades absolutas: todo depende del sujeto y de su cultura.', bucket: 'sof' },
        { text: 'Las leyes y normas son convenciones humanas, acuerdos históricos.', bucket: 'sof' },
        { text: 'El criterio de verdad es lo útil: el éxito y el interés.', bucket: 'sof' },
        { text: 'Busca definiciones universales de la virtud, la justicia, el valor…', bucket: 'soc' },
        { text: 'Dialoga con ironía y mayéutica para hacer pensar a los demás.', bucket: 'soc' },
        { text: 'Defiende que es posible una ciencia objetiva de la ética y la política.', bucket: 'soc' },
        { text: 'No escribió nada: lo conocemos sobre todo por los diálogos de Platón.', bucket: 'soc' }
      ],
      after: 'Sócrates rechaza el relativismo: para él hay conceptos universales y necesarios. De ahí a las Ideas de Platón solo hay un paso.' },

    { type: 'widget', name: 'mayeutica', kicker: 'Experiencia', title: 'Dialoga con Sócrates' },

    { type: 'widget', name: 'timeline', kicker: 'Descubre', title: 'La vida de Platón: de aristócrata a fundador' },

    { type: 'quiz', kicker: 'Comprueba', title: 'Dos heridas políticas',
      question: '¿Qué dos experiencias empujan a Platón a desconfiar de la democracia real y a imaginar una ciudad ideal?',
      options: [
        'La tiranía de los Treinta (con parientes suyos) y la condena a muerte de Sócrates por la democracia restaurada.',
        'La derrota de Esparta ante Atenas y su exilio en Egipto.',
        'La fundación de la Academia y su fracaso económico.',
        'Las Guerras Médicas contra Persia y la muerte de Pericles.'
      ],
      correct: 0,
      explain: 'Primero el terror de los Treinta Tiranos (404 a. C.), después la injusta ejecución de Sócrates (399 a. C.) por la democracia. Platón concluye que solo el conocimiento de la justicia puede salvar la vida pública.',
      hint: 'Fíjate en lo que pasa en el año 404 a. C. y en el 399 a. C.' },

    { type: 'sort', kicker: 'Reto', title: 'Ordena los diálogos en el tiempo',
      prompt: 'Platón escribió **diálogos**, con Sócrates como protagonista. Su obra se divide en cuatro etapas. Coloca cada diálogo en la suya.',
      buckets: [
        { id: 'j', label: 'Juventud', hint: '399-389 · aún socrático' },
        { id: 't', label: 'Transición', hint: '388-385 · busca su camino' },
        { id: 'm', label: 'Madurez', hint: '385-370 · teoría de las Ideas' },
        { id: 'v', label: 'Vejez', hint: '369-362 · autocrítica' }
      ],
      items: [
        { text: 'Apología de Sócrates', bucket: 'j', why: 'El juicio y la muerte de su maestro.' },
        { text: 'Critón', bucket: 'j' },
        { text: 'Menón', bucket: 't', why: 'Aquí aparece la reminiscencia.' },
        { text: 'Gorgias', bucket: 't' },
        { text: 'Fedón', bucket: 'm', why: 'Inmortalidad del alma.' },
        { text: 'República', bucket: 'm', why: 'Caverna, justicia y Estado ideal.' },
        { text: 'Banquete', bucket: 'm' },
        { text: 'Fedro', bucket: 'm', why: 'El mito del carro alado.' },
        { text: 'Parménides', bucket: 'v', why: 'Platón critica su propia teoría.' },
        { text: 'Timeo', bucket: 'v', why: 'Su explicación de la naturaleza.' },
        { text: 'Leyes', bucket: 'v' }
      ] },

    { type: 'video', kicker: 'Vídeo', title: 'Para ver con calma',
      videos: ['mitoLogos', 'presocraticos', 'socrates'],
      ask: 'Después de ver (al menos) uno: **escribe una idea que no sabías o que te haya sorprendido.**' }
  ]
},

/* ═════════════════════════ 1 · EL FUEGO ═════════════════════════ */
{
  id: 'ideas', num: 2, icon: '🔥', title: 'El fuego y los objetos', subtitle: 'Dos mundos · Teoría de las Ideas',
  epigraph: 'Te das la vuelta. Ves por primera vez que las sombras eran copias. Hay otra realidad, más verdadera, que los ojos no ven. Esa es la **Teoría de las Ideas**.',
  grade: 'pístis', objectives: ['Dualismo ontológico', 'Características de las Ideas', 'Participación, imitación, demiurgo'],
  steps: [
    { type: 'widget', name: 'circulo', kicker: 'Experiencia', title: 'Dibuja un círculo perfecto' },

    { type: 'reflect', kicker: 'Pregunta', title: 'Mil sillas, una sola «silla»',
      prompt: 'Piensa en todas las sillas que existen: de madera, de plástico, taburetes, sillones, la silla del dentista… Ninguna es igual a otra, pero **a todas las reconoces como «silla»**. ¿Qué es lo que ves en ellas para saber que lo son?',
      hints: ['No es el material, ni el color, ni el tamaño. Entonces, ¿qué tienen en común todas?', 'Para reconocer una silla nueva que nunca has visto, ¿contra qué la comparas?'],
      reveal: { title: 'La Idea de silla', body: ['Para Platón, eso común no es una simple abstracción de tu mente: es una **[[idea|Idea]]** (*eidos*), una esencia real, universal y eterna que existe con independencia de las sillas particulares.', 'Sócrates había descubierto los **conceptos universales**. Platón les da un paso más: los convierte en realidades **subsistentes**, separadas de las cosas.'] } },

    { type: 'sort', kicker: 'Reto', title: 'Las dos caras de la realidad',
      prompt: 'Clasifica estas características según pertenezcan al **mundo sensible** (el de las sombras y las cosas) o al **mundo inteligible** (el de las Ideas).',
      buckets: [{ id: 's', label: 'Mundo sensible', hint: 'kósmos aisthetós' }, { id: 'i', label: 'Mundo inteligible', hint: 'kósmos noetós' }],
      items: [
        { text: 'Finito: se corrompe y se disuelve con el tiempo.', bucket: 's' },
        { text: 'Mutable: está en continuo devenir.', bucket: 's' },
        { text: 'Singular: cada cosa es única e irrepetible.', bucket: 's' },
        { text: 'Solo permite opinión y creencia, no ciencia.', bucket: 's' },
        { text: 'Imperecedero: eterno, sin principio ni fin.', bucket: 'i' },
        { text: 'Inmutable: siempre idéntico a sí mismo.', bucket: 'i' },
        { text: 'Universal: vale para todos los casos que representa.', bucket: 'i' },
        { text: 'Inteligible: solo la razón puede conocerlo.', bucket: 'i' }
      ],
      after: 'Observa la herencia: el mundo sensible es el de Heráclito (todo cambia); el inteligible, el de Parménides (el ser es inmutable).' },

    { type: 'order', kicker: 'Reto', title: 'La escalera de las Ideas',
      prompt: 'Las Ideas no están al mismo nivel: hay una **jerarquía** según su perfección. Ordénalas **de la más alta a la más baja**.',
      items: [
        { text: 'Ideas éticas y políticas: **el Bien** y la Justicia', clue: 'El Bien es la causa de todas las demás y hacia él tienden todas.' },
        { text: 'Ideas estéticas: la Belleza', clue: 'Muy alta, pero por debajo de las que gobiernan la vida moral.' },
        { text: 'Ideas metafísicas: Ser, Identidad, Diferencia, Reposo, Movimiento', clue: 'Las más universales del conocimiento teórico.' },
        { text: 'Ideas matemáticas: números, relaciones, figuras', clue: 'Son las que usa la razón discursiva (la diánoia).' },
        { text: 'Ideas de los seres sensibles: hombre, fuego, mesa…', clue: 'Las más próximas al mundo de las cosas.' }
      ],
      after: 'En la cima, el **Bien**: en la Caverna, el Sol. Todas las Ideas participan de él y tienden hacia él.' },

    { type: 'match', kicker: 'Reto', title: 'El vocabulario de las Ideas',
      prompt: '¿Cómo se relacionan las cosas con las Ideas? Une cada término griego con su significado.',
      pairs: [
        ['Participación (méthexis)', 'Las cosas son lo que son por tomar parte, en distinto grado, de la perfección de la Idea.'],
        ['Imitación (mímesis)', 'Las cosas copian a las Ideas, que son sus modelos o causas ejemplares.'],
        ['Presencia (parousía)', 'La Idea está presente en la cosa como su esencia.'],
        ['Fin (télos)', 'Cada cosa tiende a realizar su Idea: las Ideas son causas finales.']
      ],
      after: 'Por eso las Ideas son el **fundamento ontológico**: la causa que explica la multiplicidad de cosas del mundo sensible.' },

    { type: 'quiz', kicker: 'Comprueba', title: 'Una cosmología «verosímil»',
      question: 'En el **Timeo**, un dios artesano (el *demiurgo*) forma el mundo mirando a las Ideas. ¿Considera Platón que esa explicación es **ciencia** (epistéme)?',
      options: [
        'Sí: es la primera física rigurosa de la historia.',
        'No: es una explicación aproximada, más cercana a la creencia (pístis); del mundo sensible no hay conocimiento seguro.',
        'Sí, pero solo porque usa matemáticas.',
        'No, porque Platón negaba que existiera la naturaleza.'
      ],
      correct: 1,
      explain: 'Para Platón solo hay verdadera ciencia de las Ideas. La física solo ofrece «relatos verosímiles». Aun así, ordena el cosmos con números y figuras: un precedente lejano de la ciencia moderna… que, a la vez, frenó el interés por la física.',
      hint: 'Piensa en qué mundo es objeto de «epistéme» y en cuál solo de opinión.' },

    { type: 'reflect', kicker: 'Duda de Platón', title: 'El punto débil de la teoría',
      prompt: 'Si las Ideas viven en un lugar aparte, **separadas** de las cosas… ¿cómo «participa» esta silla de la Idea de Silla? ¿Hace falta algo que conecte a las dos? Escribe tu objeción.',
      hints: ['Si necesitas una tercera cosa para unir la silla y la Idea, ¿no necesitarías otra para unir esa tercera cosa con la silla…?'],
      reveal: { title: 'Platón se critica a sí mismo', body: ['En el diálogo **Parménides** (vejez), el propio Platón examina estas dificultades: la relación de participación e imitación genera objeciones (más tarde Aristóteles la llamará el *«tercer hombre»*) e incluso duda de que las Ideas sean cognoscibles.', 'Pero **no abandona la teoría**: sin mundo inteligible desaparece el único método válido de la filosofía. El *Parménides* es una invitación a pensar con más rigor, no una renuncia.'] } },

    { type: 'video', kicker: 'Vídeo', title: 'Dos mundos en vídeo', videos: ['ideas', 'platonBach'],
      ask: '**Resume en una frase** la Teoría de las Ideas con tus propias palabras.' }
  ]
},

/* ═════════════════════════ 2 · EL CARRO ═════════════════════════ */
{
  id: 'alma', num: 3, icon: '🏇', title: 'El carro y las cadenas', subtitle: 'El alma · Dualismo antropológico',
  epigraph: 'Las cadenas de los prisioneros son tu cuerpo. Pero hay algo en ti que viene de otro lugar y que ansía regresar. Descubre qué es el alma y por qué no muere.',
  grade: 'diánoia', objectives: ['Las tres partes del alma', 'Demostraciones de inmortalidad', 'Mito de Er y metempsicosis'],
  steps: [
    { type: 'widget', name: 'carro', kicker: 'Experiencia', title: 'Conduce el carro alado' },

    { type: 'sort', kicker: 'Reto', title: 'Las tres partes del alma',
      prompt: 'Platón divide el alma en tres partes. Asigna cada rasgo a la parte que le corresponde.',
      buckets: [
        { id: 'r', label: 'Racional', hint: 'tó logistikón' },
        { id: 'i', label: 'Irascible', hint: 'tó thymoeidés' },
        { id: 'c', label: 'Concupiscible', hint: 'tó epithymetikón' }
      ],
      items: [
        { text: 'Está en la cabeza', bucket: 'r' },
        { text: 'Su virtud es la prudencia', bucket: 'r' },
        { text: 'Es el auriga del carro', bucket: 'r' },
        { text: 'Espiritual e inmortal', bucket: 'r' },
        { text: 'Está en el pecho', bucket: 'i' },
        { text: 'Su virtud es la fortaleza o valentía', bucket: 'i' },
        { text: 'Es el caballo noble y dócil', bucket: 'i' },
        { text: 'Origen de las pasiones nobles', bucket: 'i' },
        { text: 'Está en el abdomen', bucket: 'c' },
        { text: 'Su virtud es la templanza', bucket: 'c' },
        { text: 'Es el caballo rebelde', bucket: 'c' },
        { text: 'Origen de los deseos corporales', bucket: 'c' }
      ],
      after: 'Solo el alma racional es de naturaleza divina como las Ideas. Las otras dos, unidas al cuerpo, son mortales.' },

    { type: 'match', kicker: 'Reto', title: 'Cuatro pruebas de que el alma no muere',
      prompt: 'Platón (sobre todo en el *Fedón*) ofrece argumentos «probables» de la inmortalidad. Une cada argumento con su nombre.',
      pairs: [
        ['El alma existió antes en el mundo celeste y es de la misma naturaleza que las Ideas.', 'Preexistencia'],
        ['Solo lo material tiene partes y puede disolverse; el alma es simple e indivisible.', 'Simplicidad'],
        ['El alma es lo que hace vivir al cuerpo: no puede dejar de vivir sin dejar de ser alma.', 'Principio de vida'],
        ['La enfermedad destruye el cuerpo, pero la injusticia no aniquila el alma; la muerte la libera.', 'Indestructibilidad']
      ] },

    { type: 'widget', name: 'er', kicker: 'Experiencia', title: 'El mito de Er: elige tu vida' },

    { type: 'quiz', kicker: 'Comprueba', title: '«Filosofar es prepararse para morir»',
      question: '¿Qué quiere decir Platón (siguiendo a Sócrates) con que **la filosofía es una preparación para la muerte**?',
      options: [
        'Que los filósofos deben desear morir cuanto antes.',
        'Que filosofar es purificar el alma de las ataduras del cuerpo, que es justo lo que la muerte hace del todo.',
        'Que la filosofía enseña a tener miedo a morir.',
        'Que solo los muertos pueden ser sabios.'
      ],
      correct: 1,
      explain: 'El filósofo entrena en vida lo que la muerte consuma: la liberación del alma, que regresa al mundo de las Ideas. Por eso Sócrates, ante la cicuta, no temía.',
      hint: 'Piensa en el cuerpo como «cárcel del alma».' },

    { type: 'video', kicker: 'Vídeo', title: 'El carro alado en imágenes', videos: ['carro', 'alma'],
      ask: '**Relaciona** el carro alado con la Caverna: ¿qué representa el caballo rebelde en cada una?' }
  ]
},

/* ═════════════════════════ 3 · LA LUZ ═════════════════════════ */
{
  id: 'conocimiento', num: 4, icon: '☀️', title: 'La luz del Sol', subtitle: 'Conocimiento · Reminiscencia y Caverna',
  epigraph: 'Sales de la cueva. La luz duele, pero ahora ves las cosas tal como son. ¿Cómo se llega a conocer? Según Platón, conocer no es aprender cosas nuevas: es **recordar**.',
  grade: 'nóesis', objectives: ['Teoría de la reminiscencia', 'Los cuatro grados del conocimiento', 'El Mito de la Caverna'],
  steps: [
    { type: 'widget', name: 'menon', kicker: 'Experiencia', title: 'El esclavo y el cuadrado' },

    { type: 'quiz', kicker: 'Comprueba', title: '¿Innatismo o empirismo?',
      question: 'Sócrates no le dijo la solución al esclavo: solo hizo preguntas. Para Platón, ¿qué demuestra eso?',
      options: [
        'Que el conocimiento viene de la experiencia sensible acumulada.',
        'Que el esclavo ya conocía la verdad en su alma (la había contemplado antes de nacer) y solo necesitaba recordarla: la teoría es innatista.',
        'Que la geometría es una convención social.',
        'Que enseñar consiste en meter conocimientos en la cabeza del alumno.'
      ],
      correct: 1,
      explain: 'Es la **reminiscencia (anámnesis)**: el alma contempló las Ideas antes de encarnarse. Enseñar es **ayudar a que el alumno descubra** lo que lleva dentro, no llenarle la cabeza. (Justo lo que intenta esta web.)',
      hint: 'Fíjate en de dónde «sacó» la respuesta el esclavo.' },

    { type: 'reflect', kicker: 'Piensa críticamente', title: 'La objeción empirista',
      prompt: 'Un empirista diría: «el esclavo no recuerda nada; **razona** a partir de lo que ve en el dibujo y de las preguntas de Sócrates». **¿Quién te convence más? ¿Por qué?**',
      hints: ['¿Podía el esclavo llegar a la solución sin el dibujo ni la guía de las preguntas?', '¿Es posible que Sócrates le esté guiando (y casi dando) la respuesta?'],
      reveal: { title: 'Un debate abierto', body: ['Es un debate que dura veinticuatro siglos: **racionalistas e innatistas** (Platón, Descartes) frente a **empiristas** (Hume). Lo verás en las siguientes unidades.', 'Lo que no se discute: Platón defendió que **la razón** —no los sentidos— es la facultad que conoce de verdad.'] } },

    { type: 'widget', name: 'cueva', kicker: 'Experiencia', title: 'Explora la Caverna' },

    { type: 'sort', kicker: 'Reto', title: 'Los cuatro grados del conocimiento',
      prompt: 'El conocimiento asciende por cuatro grados. Coloca cada elemento en su grado.',
      buckets: [
        { id: 'e', label: 'Eikasía', hint: 'imaginación' },
        { id: 'p', label: 'Pístis', hint: 'creencia' },
        { id: 'd', label: 'Diánoia', hint: 'razón discursiva' },
        { id: 'n', label: 'Nóesis', hint: 'razón especulativa' }
      ],
      items: [
        { text: 'Sombras y ecos de la pared', bucket: 'e' },
        { text: 'Percepción', bucket: 'e' },
        { text: 'Objetos tras la tapia, a la luz del fuego', bucket: 'p' },
        { text: 'Física: observación de fenómenos', bucket: 'p' },
        { text: 'Cosas reales a la luz de la Luna', bucket: 'd' },
        { text: 'Matemáticas: demostración', bucket: 'd' },
        { text: 'Cosas a la luz del Sol', bucket: 'n' },
        { text: 'Filosofía: dialéctica sobre las Ideas', bucket: 'n' }
      ],
      after: 'Los dos primeros grados son conocimiento **sensible** (opinión, dóxa). Los dos últimos, **racional** (ciencia, epistéme). La cumbre es la dialéctica que culmina en la Idea del Bien.' },

    { type: 'match', kicker: 'Reto', title: 'La Caverna es todo el sistema',
      prompt: 'Según el libro, el Mito de la Caverna resume **todos los dualismos**. Une cada elemento del mito con lo que simboliza.',
      pairs: [
        ['Interior / exterior de la caverna', 'Mundo sensible / mundo inteligible'],
        ['Cadenas de los prisioneros', 'El cuerpo que ata al alma'],
        ['Prisionero atado / prisionero que ve el Sol', 'Hombre ignorante / hombre de conocimiento (el filósofo)'],
        ['El que regresa y es amenazado de muerte', 'El filósofo en la sociedad real: Sócrates condenado'],
        ['El Sol', 'La Idea del Bien']
      ] },

    { type: 'video', kicker: 'Vídeo', title: 'La Caverna, contada de tres maneras', videos: ['caverna', 'cavernaHist', 'menon'],
      ask: '¿Dónde está **hoy** nuestra caverna? Escribe un ejemplo actual de «sombras que tomamos por realidad».' }
  ]
},

/* ═════════════════════════ 4 · LA VIRTUD ═════════════════════════ */
{
  id: 'etica', num: 5, icon: '⚖️', title: 'El camino de ascenso', subtitle: 'Ética · Virtud y justicia',
  epigraph: 'Salir de la cueva no basta: hay que vivir de otro modo. ¿Cómo es una vida buena? ¿Se puede ser malo sabiendo qué es lo bueno?',
  grade: 'nóesis', objectives: ['Tres definiciones de virtud', 'Intelectualismo ético', 'Justicia como armonía del alma'],
  steps: [
    { type: 'reflect', kicker: 'Pregunta', title: '¿Se puede hacer el mal a sabiendas?',
      prompt: 'Un arquitecto muy preparado usa materiales baratos y falsea las cuentas. Otra pareja, sin estudios, educa a sus hijos de forma ejemplar. **¿Quién «sabe» más de lo que es bueno?** ¿Es la virtud una cuestión de saber?',
      hints: ['Platón dice que nadie hace el mal voluntariamente: el que actúa mal es que *no conoce* realmente el bien.', '¿Qué diría Platón del arquitecto? ¿«Sabe» de verdad su oficio?'],
      reveal: { title: 'Intelectualismo ético y su paradoja', body: ['Para Platón virtud y conocimiento coinciden: solo quien conoce la Idea de amistad puede ser buen amigo. Es el **[[intelectualismo|intelectualismo ético]]**.', 'Del arquitecto diría: «no conoce *de verdad* su profesión». De la pareja: «conocen sus obligaciones». Pero ojo: eso es **circular** (solo es virtuoso quien sabe, y solo sabe quien es virtuoso). Una objeción que te puede salir en un examen.'] } },

    { type: 'cards', kicker: 'Descubre', title: 'Tres definiciones de virtud',
      prompt: 'Gira cada carta. En los diálogos de madurez, Platón da tres definiciones **complementarias** de la virtud primera.',
      cards: [
        { front: 'Fedón y Fedro', title: 'Espiritualismo ético', back: 'Virtud = **purificación del alma** de las ataduras del cuerpo (sentidos, pasiones, deseos). La vida es un tránsito y la filosofía una preparación para la muerte.' },
        { front: 'Banquete', title: 'Intelectualismo ético', back: 'Virtud = **conocimiento de las Ideas éticas**. Solo quien conoce la virtud puede practicarla: el sabio (filósofo) es el modelo.' },
        { front: 'República', title: 'Racionalismo ético', back: 'Virtud = **armonía de las tres partes del alma** bajo la guía de la razón. De ella surge la justicia.' }
      ] },

    { type: 'sort', kicker: 'Reto', title: '¿Qué definición de virtud es?',
      prompt: 'Cada frase refleja una de las tres concepciones. Clasifícalas.',
      buckets: [{ id: 'e', label: 'Espiritualista' }, { id: 'i', label: 'Intelectualista' }, { id: 'r', label: 'Racionalista' }],
      items: [
        { text: '«Sé justo quien sabe de verdad qué es la justicia.»', bucket: 'i' },
        { text: '«Para ver la verdad hay que liberarse de los placeres del cuerpo.»', bucket: 'e' },
        { text: '«La razón dirige, el valor la ayuda y el deseo obedece.»', bucket: 'r' },
        { text: '«El filósofo se prepara para la muerte porque filosofar es purificarse.»', bucket: 'e' },
        { text: '«Sólo conoce la amistad el que investiga su esencia.»', bucket: 'i' },
        { text: '«La justicia es el equilibrio entre las tres partes del alma.»', bucket: 'r' }
      ] },

    { type: 'widget', name: 'armonia', kicker: 'Experiencia', title: 'Tu alma, en equilibrio' },

    { type: 'match', kicker: 'Reto', title: 'A cada parte, su virtud',
      prompt: 'De la armonía del alma surgen las virtudes. Une cada parte con su virtud.',
      pairs: [
        ['Alma racional', 'Prudencia o sabiduría práctica'],
        ['Alma irascible', 'Fortaleza o valentía'],
        ['Alma concupiscible', 'Templanza o moderación'],
        ['Las tres en armonía, guiadas por la razón', 'Justicia (dikaiosýne)']
      ],
      after: 'La justicia es la virtud **síntesis**: no una parte más, sino el orden entre las partes. Y ese mismo orden, en grande, será la ciudad.' }
  ]
},

/* ═════════════════════════ 5 · LA CIUDAD ═════════════════════════ */
{
  id: 'politica', num: 6, icon: '🏛️', title: 'El regreso a la cueva', subtitle: 'Política · La Calípolis',
  epigraph: 'El que ha visto el Sol tiene el deber de volver a la cueva. ¿Y si gobernaran los que de verdad saben? Platón diseña la primera gran utopía de la historia.',
  grade: 'nóesis', objectives: ['Castas, virtudes y educación', 'Triple fundamento del Estado', 'Degeneración de las formas de gobierno'],
  steps: [
    { type: 'widget', name: 'calipolis', kicker: 'Experiencia', title: 'Construye la Calípolis' },

    { type: 'match', kicker: 'Reto', title: 'Educación según la casta',
      prompt: 'En el Estado platónico cada casta recibe una educación distinta. Une casta y formación.',
      pairs: [
        ['Gobernantes-filósofos', 'Artes, gimnástica, ciencias (matemáticas, astronomía) y, sobre todo, dialéctica'],
        ['Guardianes', 'Música, relatos épicos (Homero, Hesíodo), gimnástica y artes marciales'],
        ['Productores', 'No reciben educación específica del Estado']
      ],
      after: 'La **paideía** es la institución central: «el principal ministerio no es el de Economía sino el de Educación».' },

    { type: 'sort', kicker: 'Reto', title: 'Triple fundamento del Estado',
      prompt: 'La utopía política platónica se apoya en tres pilares. ¿A cuál pertenece cada afirmación?',
      buckets: [{ id: 'a', label: 'Antropológico' }, { id: 'p', label: 'Pedagógico' }, { id: 't', label: 'Totalitario' }],
      items: [
        { text: 'Las castas surgen de las tres partes del alma.', bucket: 'a' },
        { text: 'Las clases dirigentes carecen de propiedad privada y de familia.', bucket: 't' },
        { text: 'El Estado selecciona a los niños y los destina a una casta.', bucket: 'p' },
        { text: 'El individuo está subordinado a los intereses del Estado.', bucket: 't' },
        { text: 'Las instituciones educativas tienen prioridad sobre las demás.', bucket: 'p' },
        { text: 'El orden social proyecta la estructura del alma humana.', bucket: 'a' }
      ] },

    { type: 'order', kicker: 'Reto', title: 'La caída de los regímenes',
      prompt: 'En el libro VIII de *La República*, Platón describe cómo los gobiernos **degeneran** uno tras otro. Ordénalos **del mejor al peor**.',
      items: [
        { text: 'Gobierna el más sabio, por mérito: reina la **justicia**', clue: 'Es el Estado ideal.' },
        { text: 'Gobiernan los guerreros: se busca el **honor** y la fama', clue: 'Los guardianes usurpan el poder.' },
        { text: 'Gobiernan los más ricos: poder y propiedad coinciden', clue: 'El amor al honor se convierte en amor al dinero.' },
        { text: 'Gobierna la mayoría: reina la **libertad** sin normas firmes', clue: 'La mayoría sin bienes se rebela contra los ricos.' },
        { text: 'Gobierna uno solo, en su propio interés', clue: 'La peor de todas.' }
      ],
      after: 'Aristocracia → Timocracia → Oligarquía → Democracia → Tiranía. No es historia real de Grecia, sino un **modelo ideal** que refleja el sistema de Platón y sus experiencias.' },

    { type: 'cards', kicker: 'Descubre', title: '¿Por qué degenera cada uno?',
      prompt: 'Gira las cartas para ver el motor de cada caída.',
      cards: [
        { front: 'Aristocracia → Timocracia', back: 'Los guardianes, con valores militares «erróneos», empiezan a buscar honores y privilegios… y usurpan el poder por la fuerza.' },
        { front: 'Timocracia → Oligarquía', back: 'El afán de honores lleva al amor al dinero con que se pagan. Gobiernan los más ricos.' },
        { front: 'Oligarquía → Democracia', back: 'La mayoría sin bienes se rebela. Por mayoría numérica toma el poder.' },
        { front: 'Democracia → Tiranía', back: 'Una mayoría no cualificada, con exceso de normas inútiles o ausencia de normas firmes, cae en la anarquía; de ella surge el tirano.' }
      ] },

    { type: 'widget', name: 'debate', kicker: 'Debate', title: '¿Utopía o totalitarismo?' },

    { type: 'video', kicker: 'Vídeo', title: 'La ciudad ideal', videos: ['estado', 'gobiernos'],
      ask: '**Una idea de Platón que te parezca vigente** y **una que te parezca peligrosa**: escríbelas.' }
  ]
},

/* ═════════════════════════ 6 · SALIDA ═════════════════════════ */
{
  id: 'salida', num: 7, icon: '🌅', title: 'Fuera de la cueva', subtitle: 'Síntesis · Reto final',
  epigraph: 'Has llegado arriba. Para saber si de verdad has salido, junta las piezas: el sistema de Platón es un único edificio con cinco habitaciones que se explican entre sí.',
  grade: 'nóesis', objectives: ['Mapa de dualismos', 'Prueba final', 'Comentario de texto'],
  steps: [
    { type: 'match', kicker: 'Síntesis', title: 'El mapa de los cinco dualismos',
      prompt: 'Todo el sistema platónico se organiza en **dualismos que se proyectan en cascada**: el ontológico en el antropológico, este en el epistemológico, este en el ético y este en el político. Une cada dualismo con sus dos polos.',
      pairs: [
        ['Ontológico (Realidad)', 'Mundo sensible ↔ Mundo inteligible'],
        ['Antropológico (Hombre)', 'Cuerpo mortal ↔ Alma inmortal'],
        ['Epistemológico (Conocimiento)', 'Sentidos ↔ Razón'],
        ['Ético (Acción)', 'Hombre ignorante ↔ Hombre de conocimiento'],
        ['Político (Sociedad)', 'Estado real ↔ Estado ideal']
      ],
      after: 'Más allá de la dispersión de los diálogos, estamos ante un **sistema integrado y deductivo**.' },

    { type: 'widget', name: 'examen', kicker: 'Reto final', title: 'Prueba de salida' },

    { type: 'widget', name: 'comentario', kicker: 'Aplicación', title: 'Comenta un texto de Platón' },

    { type: 'widget', name: 'diploma', kicker: 'Meta', title: 'Prisionero liberado' }
  ]
}
];

/* Banco de preguntas de la prueba final (se eligen 10 al azar). correct = índice. */
window.EXAM = [
  { q: 'Platón pertenece a la transición entre…', o: ['El saber arcaico (mito) y el avanzado (filosofía y ciencia).', 'La Edad Media y el Renacimiento.', 'La ciencia moderna y la contemporánea.', 'El mito y la religión cristiana.'], c: 0, w: 'Mezcla elementos míticos (Caverna, Er) y racionales (dialéctica, matemáticas).' },
  { q: '¿Qué heredó Platón de Parménides?', o: ['La idea de que todo fluye.', 'La existencia de un ser inmutable y eterno accesible solo a la razón.', 'El átomo como principio.', 'El relativismo.'], c: 1, w: 'El mundo inteligible recuerda al ser parmenídeo; el sensible, al devenir de Heráclito.' },
  { q: 'La diferencia entre sofistas y Sócrates es que Sócrates…', o: ['Cobraba por enseñar.', 'Era relativista.', 'Defendía conceptos universales y la posibilidad de una ciencia objetiva de la ética.', 'Solo se ocupaba de la naturaleza.'], c: 2, w: 'Frente al relativismo sofista, Sócrates busca definiciones universales.' },
  { q: 'Las Ideas platónicas son…', o: ['Pensamientos de la mente humana.', 'Esencias reales, eternas, inmutables, universales e inteligibles.', 'Abstracciones generalizadas desde la experiencia.', 'Copias de las cosas.'], c: 1, w: 'Existen de modo real e independiente de nuestra mente y de las cosas.' },
  { q: '¿Qué ocupa la cima de la jerarquía de las Ideas?', o: ['La Belleza.', 'El Ser.', 'El Bien.', 'Los números.'], c: 2, w: 'El Bien (el Sol de la Caverna) es principio de las demás Ideas.' },
  { q: 'Las cosas del mundo sensible son lo que son porque…', o: ['Participan de las Ideas e imitan sus modelos.', 'Fueron creadas de la nada.', 'Son átomos.', 'Se corrompen.'], c: 0, w: 'Participación (méthexis) e imitación (mímesis).' },
  { q: 'Según el dualismo antropológico, el cuerpo es…', o: ['La parte más noble.', 'Mortal y cárcel del alma.', 'Inmortal.', 'Idéntico al alma.'], c: 1, w: 'El alma es de naturaleza divina; el cuerpo, soma, es su cárcel.' },
  { q: '¿Qué parte del alma es inmortal?', o: ['La irascible.', 'La concupiscible.', 'La racional.', 'Las tres.'], c: 2, w: 'Solo la racional, de naturaleza semejante a las Ideas.' },
  { q: 'En el Fedro, el caballo rebelde del carro alado representa…', o: ['La razón.', 'El valor.', 'El deseo (alma concupiscible).', 'El cuerpo entero.'], c: 2, w: 'El auriga es la razón; el caballo dócil, el valor; el rebelde, el deseo.' },
  { q: 'La teoría de la reminiscencia afirma que…', o: ['Conocer es recordar Ideas que el alma contempló antes de encarnarse.', 'Todo conocimiento viene de los sentidos.', 'Solo conocemos lo útil.', 'Aprender es memorizar.'], c: 0, w: 'Es una teoría innatista (Menón, Fedro).' },
  { q: 'Los cuatro grados del conocimiento, de menor a mayor, son…', o: ['Eikasía, pístis, diánoia, nóesis.', 'Nóesis, diánoia, pístis, eikasía.', 'Pístis, eikasía, nóesis, diánoia.', 'Diánoia, eikasía, nóesis, pístis.'], c: 0, w: 'Imaginación, creencia, razón discursiva, razón especulativa.' },
  { q: 'En la Caverna, las sombras de la pared corresponden a…', o: ['La nóesis.', 'La eikasía (imaginación).', 'La diánoia.', 'La Idea del Bien.'], c: 1, w: 'Son el grado más bajo del conocimiento sensible.' },
  { q: 'La definición de virtud del libro IV de la República es…', o: ['Purificación del alma.', 'Conocimiento de las Ideas.', 'Armonía de las partes del alma bajo la guía de la razón.', 'Éxito social.'], c: 2, w: 'Racionalismo ético: de ella surge la justicia.' },
  { q: 'La virtud de la casta de los productores es…', o: ['La prudencia.', 'La fortaleza.', 'La templanza.', 'La justicia.'], c: 2, w: 'Se corresponde con el alma concupiscible.' },
  { q: 'La justicia social en la ciudad platónica consiste en…', o: ['Igualdad de riqueza.', 'Armonía entre las castas, sin intromisión de unas en las funciones de otras, bajo la dirección de los gobernantes.', 'Que gobierne la mayoría.', 'Que el rey sea hereditario.'], c: 1, w: 'Es la proyección social de la justicia individual.' },
  { q: 'El Estado de Platón se califica de totalitario porque…', o: ['Lo gobierna un tirano.', 'El Estado decide casta, educación y función de cada ciudadano y está por encima del individuo.', 'No hay leyes.', 'Prohíbe la educación.'], c: 1, w: 'Los fines del Estado son anteriores a los derechos individuales.' },
  { q: 'El orden de degeneración de las formas de gobierno es…', o: ['Tiranía, democracia, oligarquía, timocracia, aristocracia.', 'Aristocracia, timocracia, oligarquía, democracia, tiranía.', 'Democracia, aristocracia, tiranía, oligarquía, timocracia.', 'Oligarquía, aristocracia, timocracia, tiranía, democracia.'], c: 1, w: 'De la mejor (aristocracia) a la peor (tiranía).' },
  { q: 'En el Timeo, ¿quién ordena la materia mirando a las Ideas?', o: ['Zeus.', 'El demiurgo.', 'Sócrates.', 'El alma humana.'], c: 1, w: 'Un artesano divino, no un creador de la nada.' },
  { q: 'En el Parménides, Platón…', o: ['Abandona la teoría de las Ideas.', 'Pone a prueba la participación y la imitación, pero no rechaza la teoría.', 'Se hace sofista.', 'Defiende el materialismo.'], c: 1, w: 'Es un ejercicio de autocrítica en la vejez.' },
  { q: 'Según Platón, de la naturaleza (mundo sensible) solo cabe…', o: ['Ciencia (epistéme) segura.', 'Opinión y creencia verosímil.', 'Conocimiento innato.', 'Nada: no existe.'], c: 1, w: 'Solo las Ideas son objeto de ciencia.' }
];

/* Texto para el comentario guiado (paráfrasis fiel al contenido de la unidad, no cita literal). */
window.COMENTARIO = {
  titulo: 'Resumen de la alegoría de la caverna (República, libro VII)',
  texto: 'Imagina unos prisioneros encadenados desde niños en una caverna, sin poder volver la cabeza: solo ven la pared del fondo, donde se proyectan las sombras de los objetos que unos hombres pasean tras una tapia, delante de una hoguera. Para ellos esas sombras son la única realidad. Si uno fuera liberado y obligado a subir hacia la salida, sufriría: la luz le deslumbraría y creería más verdaderas las sombras de antes. Poco a poco vería las imágenes en el agua, luego las cosas mismas, de noche, y por fin el Sol, que entendería como causa de todo lo visible. Si regresara a la cueva para liberar a los otros, estos se burlarían de él y, si pudieran, lo matarían.',
  guia: [
    'Tema: ¿de qué trata el texto y qué dualismos simboliza?',
    'Ideas principales: identifica los cuatro grados del conocimiento y el papel del Sol.',
    'Contexto: sitúalo en la obra de Platón (República, madurez) y en su biografía (muerte de Sócrates).',
    'Relación: conecta con la teoría de las Ideas, el alma, la ética y la política.',
    'Opinión razonada: ¿qué «sombras» confundimos hoy con la realidad?'
  ]
};

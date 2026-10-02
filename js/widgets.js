/* Widgets interactivos específicos de cada estación. */
(function () {
  'use strict';
  const { h, s, R, rich, shuffle, toast, Store, W, setFb, feedback, revealBox } = window.Engine;

  /* ═════════ Diálogo socrático (mayéutica) ═════════ */
  W.mayeutica = (st, ctx) => {
    const rounds = [
      { q: 'Amigo, dime con franqueza: **¿qué es la justicia?**',
        opts: [
          ['Devolver a cada uno lo que se le debe.', 'Mmm. Un amigo te deja su espada; enloquece y te la reclama para hacer daño. ¿Sería justo devolvérsela?'],
          ['Hacer bien a los amigos y mal a los enemigos.', '¿Y si tu amigo es un malvado y tu enemigo, un hombre bueno? Y dañar a alguien, ¿lo hace mejor persona?'],
          ['Obedecer las leyes de la ciudad.', 'Pero ¿acaso no hubo leyes injustas dictadas por los Treinta Tiranos? ¿Eran justas por ser leyes?']
        ] },
      { q: 'Veo que tu respuesta sirve para unos casos y falla en otros. Yo busco algo que sea **idéntico en todas las acciones justas**. ¿Qué tienen en común?',
        opts: [
          ['Que todas dan a cada uno lo que le corresponde.', '¿Y qué es lo que «le corresponde»? Estás cerca: sigamos buscando.'],
          ['Que todas mantienen el orden y la armonía entre las personas.', 'Interesante… ¿Y qué es esa armonía, de dónde la sacas?'],
          ['No lo sé… ¿existe algo común a todas?', 'Excelente: reconocer que no sabes es el comienzo de la sabiduría. Eso es lo único que yo sé.']
        ] }
    ];
    const chat = h('div', { class: 'chat' });
    const choices = h('div', { class: 'options' });
    const out = h('div');
    function say(who, text) {
      chat.append(h('div', { class: 'bubble ' + who }, h('b', null, who === 'soc' ? 'Sócrates' : 'Tú'), h('span', { html: rich(text) })));
      chat.scrollTop = chat.scrollHeight;
    }
    function ask(n) {
      choices.innerHTML = '';
      if (n >= rounds.length) return finish();
      say('soc', rounds[n].q);
      rounds[n].opts.forEach(o => choices.append(h('button', { class: 'option', type: 'button', onclick() {
        choices.innerHTML = '';
        say('you', o[0]);
        setTimeout(() => { say('soc', o[1]); setTimeout(() => ask(n + 1), 700); }, 450);
      } }, o[0])));
    }
    function finish() {
      out.append(revealBox({ title: 'Lo que acaba de pasar', body: [
        'Has vivido el **método socrático**: primero la **[[ironia|ironía]]** (derribar tu falsa certeza con un contraejemplo) y luego la **[[mayeutica|mayéutica]]** (ayudarte a «dar a luz» una definición mejor).',
        'Fíjate: partimos de **casos particulares** (la espada, los amigos, las leyes) para buscar **lo universal**. Sócrates inventó el concepto universal; Platón se preguntará: *¿dónde está eso universal, la Justicia en sí?* Su respuesta: en el mundo de las Ideas.'
      ] }));
      ctx.complete();
    }
    ask(0);
    return h('div', null, R('Ponte en el papel del interlocutor de Sócrates. **Responde con lo que de verdad pensarías.**'), chat, choices, out);
  };

  /* ═════════ Línea de tiempo de Platón ═════════ */
  W.timeline = (st, ctx) => {
    const ev = [
      { y: '427', t: 'Nace en Atenas', d: 'Se llama Aristocles; «Platón» (el de anchas espaldas) será su apodo. Familia aristocrática: su madre descendía de Solón y su padre del rey Codro.', k: 'Crece en la Edad de Oro… y en la guerra del Peloponeso.' },
      { y: '407', t: 'Conoce a Sócrates', d: 'Con unos veinte años encuentra a quien será su maestro y amigo. Es el acontecimiento fundamental de su vida.', k: 'Sócrates será el protagonista de casi todos sus diálogos.' },
      { y: '404', t: 'Los Treinta Tiranos', d: 'Esparta vence a Atenas e impone un gobierno oligárquico en el que figuran parientes de Platón (Cármides y Critias). Le invitan a colaborar, pero el terror lo aparta.', k: 'Primera decepción política.' },
      { y: '399', t: 'Condena a muerte de Sócrates', d: 'La democracia restaurada ejecuta a Sócrates. Platón se refugia tres años en Megara y empieza a escribir.', k: 'Su rechazo a la democracia se hace más fuerte. Nace su obra.' },
      { y: '390–388', t: 'Viajes y esclavitud', d: 'Viaja a Egipto, Cirene e Italia. En Sicilia intenta convencer al tirano Dionisio el Viejo de sus ideales: acaba vendido como esclavo en Egina y rescatado por un amigo.', k: 'Primer intento fallido de poner en práctica un gobierno de sabios.' },
      { y: '387', t: 'Funda la Academia', d: 'De vuelta en Atenas funda la Academia, escuela que perduró hasta el 529 d. C. Allí se estudian matemáticas, astronomía y filosofía.', k: 'Primera «universidad» de Occidente.' },
      { y: '367–361', t: 'Con Dionisio el Joven', d: 'Regresa a Sicilia para asesorar al nuevo tirano y poner en práctica su utopía. Fracasa de nuevo y vuelve desilusionado, con dudas sobre la teoría de las ideas y la naturaleza humana.', k: 'Sus últimos diálogos son más críticos (Parménides, Leyes).' },
      { y: '347', t: 'Muere a los 80 años', d: 'Muere en Atenas dejando una Academia viva. Su discípulo más famoso, Aristóteles, tomará otro camino.', k: 'Siguiente unidad: Aristóteles.' }
    ];
    let seen = new Set();
    const nodes = h('div', { class: 'tl' });
    const panel = h('div', { class: 'tl-panel' }, h('p', { class: 'muted' }, 'Pulsa cada fecha para descubrir qué pasó.'));
    const done = h('div');
    ev.forEach((e, i) => {
      const b = h('button', { class: 'tl-node', type: 'button', 'aria-label': e.y + ': ' + e.t, onclick() {
        nodes.querySelectorAll('.tl-node').forEach(x => x.classList.remove('active'));
        b.classList.add('active', 'seen'); seen.add(i);
        panel.innerHTML = '';
        panel.append(h('div', { class: 'tl-year' }, e.y + ' a. C.'), h('h4', null, e.t), h('p', null, e.d), h('p', { class: 'tl-key' }, '→ ' + e.k));
        if (seen.size === ev.length && !done.firstChild) {
          done.append(h('div', { class: 'feedback show ok' }, '<strong>Línea completa.</strong> Una vida entre la verdad filosófica y la decepción política: de ahí nace la idea de que solo gobernando el que sabe habrá justicia.'.replace(/<\/?strong>/g, '')));
          ctx.complete();
        }
      } }, h('span', { class: 'dot' }), h('span', { class: 'yr' }, e.y));
      nodes.append(b);
    });
    return h('div', null, R('Recorre su biografía con atención: **¿qué hechos explican el pensamiento político de Platón?**'), nodes, panel, done);
  };

  /* ═════════ Dibuja un círculo perfecto ═════════ */
  W.circulo = (st, ctx) => {
    const size = 300;
    const canvas = h('canvas', { width: size, height: size, class: 'draw', 'aria-label': 'Lienzo para dibujar un círculo' });
    canvas.style.touchAction = 'none';
    const g = canvas.getContext('2d');
    let pts = [], drawing = false;
    const out = h('div');
    const fb = feedback();

    function bg() {
      g.clearRect(0, 0, size, size);
      g.fillStyle = '#fbf6ea'; g.fillRect(0, 0, size, size);
      g.strokeStyle = 'rgba(80,60,40,.08)';
      for (let i = 30; i < size; i += 30) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, size); g.moveTo(0, i); g.lineTo(size, i); g.stroke(); }
    }
    function path(color, w) {
      g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)); g.stroke();
    }
    function pos(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * size / r.width, y: (e.clientY - r.top) * size / r.height }; }
    canvas.addEventListener('pointerdown', e => { drawing = true; pts = [pos(e)]; bg(); canvas.setPointerCapture(e.pointerId); out.innerHTML = ''; fb.className = 'feedback'; });
    canvas.addEventListener('pointermove', e => { if (!drawing) return; pts.push(pos(e)); bg(); path('#7a3b1d', 3); });
    canvas.addEventListener('pointerup', () => { if (!drawing) return; drawing = false; evaluate(); });
    bg();

    function evaluate() {
      if (pts.length < 25) { setFb(fb, 'info', 'Dibuja un círculo completo de un solo trazo.'); return; }
      const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
      const rad = pts.map(p => Math.hypot(p.x - cx, p.y - cy));
      const mr = rad.reduce((a, b) => a + b, 0) / rad.length;
      const sectors = new Set(pts.map(p => Math.floor(((Math.atan2(p.y - cy, p.x - cx) + Math.PI) / (2 * Math.PI)) * 12)));
      if (mr < 25 || sectors.size < 10) { setFb(fb, 'info', 'Eso no parece un círculo cerrado. ¡Prueba otra vez, más grande!'); return; }
      const sd = Math.sqrt(rad.reduce((a, r) => a + (r - mr) ** 2, 0) / rad.length);
      const score = Math.max(0, Math.min(99.9, 100 - (sd / mr) * 350));
      bg();
      g.strokeStyle = '#c9972b'; g.lineWidth = 2; g.setLineDash([6, 5]);
      g.beginPath(); g.arc(cx, cy, mr, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
      path('#7a3b1d', 3);
      setFb(fb, 'ok', `Tu círculo se parece un <strong>${score.toFixed(1)} %</strong> al círculo ideal (línea dorada). Mira dónde se desvía.`);
      out.innerHTML = '';
      out.append(
        R('Ahora piensa: **¿has visto alguna vez un círculo perfecto?** Ni en la pizarra, ni con compás, ni al microscopio: siempre hay imperfecciones. Y sin embargo **tú sabías que el tuyo no era perfecto**. ¿Contra qué lo comparabas?'),
        revealBox({ title: 'La Idea de círculo', body: [
          'Para medir la imperfección necesitas un **modelo perfecto** que nunca has visto con los ojos. Platón diría que lo conoces con la **razón**: es la **[[idea|Idea]]** de círculo, eterna e inmutable, de la que todos los círculos dibujados son copias imperfectas.',
          'Las matemáticas trabajan con esas Ideas (el «círculo» de los teoremas no es el de tu cuaderno). Por eso Platón puso sobre la Academia —según la tradición— que no entrara quien no supiera geometría.'
        ] }));
      ctx.complete();
    }
    return h('div', null, R('Con el dedo o el ratón, **dibuja el círculo más perfecto que puedas** de un solo trazo.'), h('div', { class: 'draw-wrap' }, canvas), fb, out);
  };

  /* ═════════ Carro alado ═════════ */
  function horse(x, y, fill, stroke) {
    const g = s('g', { fill, stroke, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
    [-24, -12, 14, 26].forEach(dx => g.append(s('line', { x1: x + dx, y1: y + 8, x2: x + dx + (dx > 0 ? 4 : -3), y2: y + 40, 'stroke-width': 6, fill: 'none' })));
    g.append(
      s('path', { d: `M${x - 32} ${y - 4} q-22 4 -18 30 q10 -18 24 -22z`, fill: 'none' }),
      s('ellipse', { cx: x, cy: y, rx: 38, ry: 19 }),
      s('path', { d: `M${x + 22} ${y - 10} L${x + 38} ${y - 46} L${x + 56} ${y - 38} L${x + 40} ${y - 2}z` }),
      s('path', { d: `M${x + 38} ${y - 46} L${x + 70} ${y - 34} L${x + 66} ${y - 22} L${x + 52} ${y - 30}z` }),
      s('path', { d: `M${x + 40} ${y - 46} l2 -10 l7 8z` }),
      s('path', { d: `M${x - 14} ${y - 16} q10 -34 38 -34 q-14 8 -8 22z`, fill: '#fff', 'stroke-width': 1.6 }));
    return g;
  }
  W.carro = (st, ctx) => {
    const sits = [
      { t: 'Mañana tienes un examen importante y tus amigos te invitan a una fiesta.',
        o: [['Voy a la fiesta y ya veré qué pasa.', [-10, 0, 20], 'Deseo sin freno: el caballo rebelde tira del carro.'],
            ['Estudio primero y, si me da tiempo, salgo un rato.', [20, 5, 0], 'La razón ordena y el deseo espera su turno.'],
            ['Les digo que no con firmeza, aunque se rían de mí.', [10, 20, -5], 'El valor respalda a la razón.']] },
      { t: 'Alguien se burla de un compañero en clase.',
        o: [['Me río también para no quedar mal.', [-5, -15, 10], 'Cobardía: el caballo noble se rinde.'],
            ['Me enciendo y le insulto.', [-15, 10, 5], 'Ira sin guía: valor sin razón.'],
            ['Defiendo al compañero y razono con el otro.', [15, 15, -5], 'Valor guiado por la razón: una acción justa.']] },
      { t: 'Has ahorrado algo de dinero y ves unas zapatillas carísimas.',
        o: [['Las compro sin pensarlo.', [-10, 0, 20], 'El deseo dirige.'],
            ['Compro algo útil y ahorro el resto.', [15, 0, -5], 'Templanza: moderación guiada por la razón.'],
            ['Renuncio a todo placer para siempre.', [5, 0, -20], 'Platón no pide aniquilar el deseo, sino ordenarlo (templanza ≠ asco).']] },
      { t: 'Te acusan injustamente de algo que no has hecho.',
        o: [['Me vengo difundiendo rumores sobre quien me acusa.', [-10, 5, 15], 'El resentimiento secuestra al carro.'],
            ['Defiendo mi inocencia con calma y con pruebas.', [15, 10, 0], 'Como Sócrates: argumentar sin perder la serenidad.'],
            ['Me callo por miedo y dejo que pase.', [0, -20, 5], 'Falta de valor.']] }
    ];
    const v = { r: 40, v: 30, d: 30 };
    let step = 0;
    const svg = s('svg', { viewBox: '0 0 360 190', class: 'chariot', role: 'img', 'aria-label': 'Carro alado con auriga y dos caballos' },
      s('defs', null, s('linearGradient', { id: 'cg', x1: 0, y1: 0, x2: 0, y2: 1 }, s('stop', { offset: '0', 'stop-color': '#ffe9b8' }), s('stop', { offset: '1', 'stop-color': '#f6c77a' }))),
      s('rect', { width: 360, height: 190, fill: 'url(#cg)', rx: 14 }),
      s('g', { id: 'carro-g', style: 'transform-origin:180px 120px; transition:transform .7s ease' },
        s('path', { d: 'M96 92 q-46 -34 -82 -6 q22 2 34 14 q-24 0 -38 16 q24 -2 40 6 q26 -2 46 -30z', fill: '#fff', stroke: '#8a6a4a', 'stroke-width': 1.5 }),
        s('line', { x1: 150, y1: 108, x2: 215, y2: 104, stroke: '#3b2a1c', 'stroke-width': 3 }),
        horse(228, 112, '#2f2a28', '#171210'),
        horse(262, 118, '#ffffff', '#3b2a1c'),
        s('rect', { x: 70, y: 104, width: 84, height: 24, rx: 7, fill: '#a26b36', stroke: '#3b2a1c', 'stroke-width': 2 }),
        s('circle', { cx: 100, cy: 140, r: 17, fill: 'none', stroke: '#3b2a1c', 'stroke-width': 3.5 }),
        s('circle', { cx: 100, cy: 140, r: 2.5, fill: '#3b2a1c' }),
        s('line', { x1: 100, y1: 123, x2: 100, y2: 157, stroke: '#3b2a1c', 'stroke-width': 2 }), s('line', { x1: 83, y1: 140, x2: 117, y2: 140, stroke: '#3b2a1c', 'stroke-width': 2 }),
        s('rect', { x: 100, y: 78, width: 22, height: 28, rx: 7, fill: '#7a3b1d' }),
        s('circle', { cx: 111, cy: 66, r: 11, fill: '#f1d2a8', stroke: '#3b2a1c', 'stroke-width': 2 }),
        s('path', { d: 'M121 86 L228 84', stroke: '#3b2a1c', 'stroke-width': 1.5, fill: 'none' }))
    );
    const bar = (k, label, color) => {
      const fill = h('i'); fill.style.background = color;
      const num = h('b');
      const row = h('div', { class: 'meter' }, h('span', null, label), h('div', { class: 'track' }, fill), num);
      row.update = () => { fill.style.width = Math.max(0, Math.min(100, v[k])) + '%'; num.textContent = Math.round(v[k]); };
      return row;
    };
    const mR = bar('r', 'Razón (auriga)', '#4a6fa5'), mV = bar('v', 'Valor (caballo noble)', '#c9972b'), mD = bar('d', 'Deseo (caballo rebelde)', '#a23b3b');
    const upd = () => {
      [mR, mV, mD].forEach(m => m.update());
      const tilt = Math.max(-18, Math.min(18, (v.d - v.r) * 0.35));
      svg.querySelector('#carro-g').style.transform = `rotate(${tilt}deg)`;
    };
    const scene = h('div', { class: 'scene' });
    const out = h('div');
    function next() {
      scene.innerHTML = '';
      if (step >= sits.length) return end();
      const sit = sits[step];
      scene.append(h('p', { class: 'situ' }, `Situación ${step + 1}/${sits.length}: ${sit.t}`));
      const opts = h('div', { class: 'options' });
      sit.o.forEach(o => opts.append(h('button', { class: 'option', type: 'button', onclick() {
        o[1].forEach((d, i) => { const k = ['r', 'v', 'd'][i]; v[k] += d; });
        upd(); step++;
        scene.innerHTML = '';
        scene.append(h('div', { class: 'feedback show info' }, o[2]), h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: next }, step >= sits.length ? 'Ver resultado' : 'Siguiente situación')));
      } }, o[0])));
      scene.append(opts);
    }
    function end() {
      const harmony = v.r >= v.v && v.v >= v.d;
      const txt = harmony
        ? '<strong>Tu alma está en armonía.</strong> La razón guía, el valor la secunda y el deseo obedece. Esa es la **justicia** individual.'
        : v.d > v.r ? '<strong>El caballo rebelde manda.</strong> Cuando el deseo domina, el alma se desequilibra: eso es lo que Platón llama la causa del error moral.'
          : '<strong>Tu alma no está del todo armonizada.</strong> Para Platón la razón debe dirigir y el valor ayudarla, no al revés.';
      out.append(h('div', { class: 'feedback show ' + (harmony ? 'ok' : 'info'), html: rich(txt) }),
        revealBox({ title: 'El mito del carro alado (Fedro)', body: [
          'Antes de nacer, el alma —un **carro alado** con un **auriga** (razón) y dos caballos: uno **noble** (el valor) y otro **rebelde** (el deseo)— giraba contemplando las Ideas. Un día el caballo rebelde desestabilizó el tiro: el alma cayó al mundo sensible y se **encarnó en un cuerpo**.',
          'Por eso para Platón el ser humano es **dualista**: un alma divina unida «accidentalmente» a un cuerpo mortal, que es su cárcel (*sôma* / *sêma*). Conocer y ser virtuoso es **recomponer el equilibrio del carro** para volver arriba.'
        ] }));
      ctx.complete();
    }
    upd(); next();
    return h('div', null, R('Eres **el auriga**. Cuatro situaciones cotidianas pondrán a prueba tu carro. **Observa cómo se inclina.**'),
      svg, h('div', { class: 'meters' }, mR, mV, mD), scene, out);
  };

  /* ═════════ Mito de Er ═════════ */
  W.er = (st, ctx) => {
    const lives = [
      { n: 'Un tirano todopoderoso', e: '👑', r: 'Elección precipitada. En el mito, un alma llegada del cielo, **sin filosofía**, elige la tiranía sin examinarla… y luego lo lamenta. Quien no ha aprendido a distinguir las vidas, elige mal aunque venga de la dicha.' },
      { n: 'Una vida de riqueza y honores', e: '🏆', r: 'Platón desconfía: honores y riquezas son valores de la timocracia y la oligarquía. No es la mejor vida si no la guía la razón.' },
      { n: 'La vida tranquila de un hombre corriente', e: '🏡', r: 'Es lo que elige **Ulises**, el último en el sorteo: tras sus penalidades, escoge «la existencia de un hombre común». Una elección sensata.' },
      { n: 'Una vida dedicada a buscar la verdad y la justicia', e: '🦉', r: '**La mejor elección.** Las mejores vidas son las que llevan al alma a practicar la justicia. El alma del filósofo, además, recibe su recompensa y retorna directamente al mundo de las Ideas.' }
    ];
    const out = h('div'), cards = h('div', { class: 'choices' });
    lives.forEach(l => cards.append(h('button', { class: 'choice', type: 'button', onclick(e) {
      cards.querySelectorAll('.choice').forEach(x => x.classList.remove('picked')); e.currentTarget.classList.add('picked');
      out.innerHTML = ''; out.append(h('div', { class: 'feedback show info', html: rich(l.r) }),
        revealBox({ title: 'Metempsicosis', body: ['Tras la muerte las almas son juzgadas, premiadas o castigadas, y **eligen una nueva vida** antes de beber del Leteo (el río del olvido) y reencarnarse. Solo el **filósofo**, que ha purificado su alma, evita el ciclo y regresa a las Ideas. Es la doctrina pitagórica de la **[[metempsicosis|transmigración]]**.'] }));
      ctx.complete();
    } }, h('span', { class: 'emo' }, l.e), l.n)));
    return h('div', null,
      R('Er, un guerrero muerto en combate, vuelve a la vida a los diez días y cuenta lo que ha visto en el más allá: **tres jueces** reparten premios y castigos; después las almas **sortean turno y eligen su próxima vida**. Un heraldo advierte: *«la elección es vuestra y el riesgo, irreparable»*.'),
      R('**Tu alma está en la pradera. Te toca elegir.**'), cards, out);
  };

  /* ═════════ El esclavo de Menón ═════════ */
  W.menon = (st, ctx) => {
    const U = 44;
    const stage = h('div', { class: 'menon' });
    const fig = h('div', { class: 'fig' });
    const text = h('div');
    let tried = new Set();

    function grid(n, hl) {
      const svg = s('svg', { viewBox: `0 0 ${n * U + 8} ${n * U + 8}`, class: 'geo', role: 'img', 'aria-label': `Cuadrado de ${n} por ${n}` });
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
        svg.append(s('rect', { x: 4 + i * U, y: 4 + j * U, width: U, height: U, fill: (i < hl && j < hl) ? '#f6c77a' : '#fff6e2', stroke: '#8a6a4a', 'stroke-width': 1.5 }));
      return svg;
    }
    function stageA() {
      fig.innerHTML = ''; text.innerHTML = '';
      fig.append(grid(2, 2));
      text.append(
        R('Sócrates le dibuja un cuadrado de **lado 2**: su área son **4** unidades cuadradas. Le pide: *«construye otro cuadrado con el **doble de área** (8)».* **¿Cuánto debe medir su lado?** (Haz tus pruebas.)'),
        h('div', { class: 'row' },
          [['Lado 3', 3], ['Lado 4', 4]].map(([lbl, n]) => h('button', { class: 'btn', type: 'button', onclick() { tryN(n); } }, lbl)),
          h('button', { class: 'btn ghost', type: 'button', onclick() { tryN(0); } }, 'No lo sé')),
        h('div', { class: 'out' }));
    }
    function tryN(n) {
      const out = text.querySelector('.out'); out.innerHTML = '';
      tried.add(n);
      if (n) {
        fig.innerHTML = ''; fig.append(grid(n, 2));
        out.append(h('div', { class: 'feedback show bad', html: rich(`Con lado ${n} el área es **${n * n}**, no 8. ${n === 4 ? '¡Es el cuádruple (16)!' : 'Te pasas (9) y no es doble exacto.'}`) }));
      } else out.append(h('div', { class: 'feedback show info', html: rich('Reconocer que no sabes es el primer paso: es la **ironía** socrática. El esclavo está en **aporía**.') }));
      if (tried.size >= 2 || tried.has(0)) out.append(h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: stageB }, 'Sócrates propone otro dibujo →')));
    }
    function stageB() {
      fig.innerHTML = ''; text.innerHTML = '';
      const found = new Set();
      const svg = s('svg', { viewBox: `0 0 ${4 * U + 8} ${4 * U + 8}`, class: 'geo', role: 'img', 'aria-label': 'Cuadrado de lado 4 con un cuadrado inclinado en su interior' });
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++)
        svg.append(s('rect', { x: 4 + i * U, y: 4 + j * U, width: U, height: U, fill: '#fff6e2', stroke: '#c8b79a', 'stroke-width': 1 }));
      svg.append(s('rect', { x: 4, y: 4, width: 2 * U, height: 2 * U, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 3 }));
      const P = (x, y) => `${4 + x * U},${4 + y * U}`;
      const tris = [['2,0 0,2 2,2'], ['2,0 4,2 2,2'], ['4,2 2,4 2,2'], ['2,4 0,2 2,2']].map(a => a[0].split(' ').map(p => P(...p.split(',').map(Number))).join(' '));
      const counter = h('b', null, '0');
      tris.forEach((pts, i) => {
        const p = s('polygon', { points: pts, class: 'tri', fill: 'rgba(122,59,29,.12)', stroke: '#7a3b1d', 'stroke-width': 2, tabindex: 0, role: 'button', 'aria-label': 'Triángulo ' + (i + 1),
          onclick() { if (found.has(i)) return; found.add(i); p.setAttribute('fill', '#e8833a'); counter.textContent = found.size; if (found.size === 4) stageC(); },
          onkeydown(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.dispatchEvent(new Event('click')); } } });
        svg.append(p);
      });
      fig.append(svg);
      text.append(R('Sócrates dibuja **cuatro cuadrados iguales al original** (un cuadrado grande de lado 4) y traza la **diagonal** de cada uno: aparece un cuadrado inclinado en el centro. Cada diagonal corta su cuadrado en dos triángulos iguales.'),
        R('**Pulsa los 4 triángulos** del cuadrado inclinado. Cada uno es *la mitad de un cuadrado de área 4*.'), h('p', { class: 'small' }, 'Triángulos marcados: ', counter, ' / 4'));
    }
    function stageC() {
      text.append(h('div', { class: 'feedback show ok', html: rich('**4 triángulos × 2 de área = 8.** ¡El cuadrado inclinado tiene exactamente el doble de área! Su lado es la **diagonal** del cuadrado original (√8 ≈ 2,83).') }),
        revealBox({ title: 'La clave de Platón', body: [
          'Observa: **Sócrates nunca le dijo la respuesta**; solo preguntó y dibujó. Y el esclavo, sin haber estudiado geometría, la descubre. Platón concluye: esa verdad **ya estaba en su alma**; la contempló antes de nacer. **Conocer es recordar** (*anámnesis*).'
        ] }));
      ctx.complete();
    }
    stageA();
    stage.append(fig, text);
    return h('div', null, R('Esta escena es del diálogo **Menón**: Sócrates le plantea un problema de geometría a un esclavo sin instrucción. **Ponte en su lugar.**'), stage);
  };

  /* ═════════ La caverna interactiva ═════════ */
  W.cueva = (st, ctx) => {
    const spots = [
      { x: 70, y: 255, n: 'Las sombras', sym: 'Lo único que ven los prisioneros: sombras de objetos y ecos de voces.', grado: 'Eikasía (imaginación) — conocimiento sensible inferior', dual: 'Mundo sensible · apariencias', c: '#e8833a' },
      { x: 215, y: 395, n: 'Los prisioneros encadenados', sym: 'Encadenados desde niños, mirando siempre al frente. Las cadenas son el cuerpo; su ceguera, la ignorancia.', grado: 'Hombre ignorante', dual: 'Antropológico (cuerpo) · Ético (ignorancia)', c: '#c9972b' },
      { x: 350, y: 292, n: 'Objetos tras la tapia y el fuego', sym: 'Figuras que pasan con objetos sobre una tapia, iluminadas por una hoguera. Son las cosas incompletas que ve el prisionero liberado.', grado: 'Pístis (creencia) — conocimiento sensible superior. Corresponde a la Física.', dual: 'Mundo sensible superior', c: '#d86d2a' },
      { x: 575, y: 300, n: 'La salida y el ascenso', sym: 'Subir es doloroso: la luz deslumbra y el prisionero no cree que lo de fuera sea más real. Representa la dialéctica ascendente y el esfuerzo de la educación.', grado: 'Dialéctica · reminiscencia', dual: 'Epistemológico: paso de los sentidos a la razón', c: '#5c8f6a' },
      { x: 700, y: 330, n: 'Las cosas a la luz de la luna', sym: 'Primeras cosas reales que ve el liberado, de noche, sin cegarse.', grado: 'Diánoia (razón discursiva) — conocimiento racional inferior. Corresponde a las Matemáticas.', dual: 'Mundo inteligible inferior', c: '#6c7fb8' },
      { x: 805, y: 85, n: 'El Sol', sym: 'La luz que hace visible todo y causa de todo lo que existe. Símbolo de la **Idea del Bien**.', grado: 'Nóesis (razón especulativa) — conocimiento racional superior. Corresponde a la Filosofía (dialéctica).', dual: 'Mundo inteligible superior · Ideas', c: '#e0a800' },
      { x: 520, y: 420, n: 'El regreso a la cueva', sym: 'El liberado vuelve para liberar a los demás: los prisioneros lo toman por loco y podrían matarlo, como a Sócrates.', grado: 'Deber del filósofo', dual: 'Político: el filósofo en la sociedad real · la utopía del gobierno de los sabios', c: '#a23b3b' }
    ];
    const seen = new Set();
    const panel = h('div', { class: 'cave-panel' }, h('p', { class: 'muted' }, 'Pulsa los puntos numerados para investigar cada elemento.'));
    const done = h('div');
    const svg = s('svg', { viewBox: '0 0 900 460', class: 'cave', role: 'img', 'aria-label': 'Corte de la caverna de Platón' },
      s('defs', null,
        s('linearGradient', { id: 'sky', x1: 0, y1: 0, x2: 0, y2: 1 }, s('stop', { offset: 0, 'stop-color': '#bfe3ff' }), s('stop', { offset: 1, 'stop-color': '#ffe9a8' })),
        s('radialGradient', { id: 'fire' }, s('stop', { offset: 0, 'stop-color': '#ffd27a', 'stop-opacity': 0.9 }), s('stop', { offset: 1, 'stop-color': '#ff7a00', 'stop-opacity': 0 }))),
      s('rect', { x: 0, y: 0, width: 900, height: 460, fill: 'url(#sky)' }),
      /* exterior */
      s('circle', { cx: 805, cy: 85, r: 34, fill: '#ffd447' }),
      ...[0, 45, 90, 135, 180, 225, 270, 315].map(a => s('line', { x1: 805 + Math.cos(a * Math.PI / 180) * 44, y1: 85 + Math.sin(a * Math.PI / 180) * 44, x2: 805 + Math.cos(a * Math.PI / 180) * 58, y2: 85 + Math.sin(a * Math.PI / 180) * 58, stroke: '#ffd447', 'stroke-width': 4, 'stroke-linecap': 'round' })),
      s('circle', { cx: 660, cy: 70, r: 16, fill: '#f4f1e6' }), s('circle', { cx: 668, cy: 66, r: 14, fill: '#cfe5f7' }),
      s('path', { d: 'M580 460 Q650 380 740 400 T900 380 V460Z', fill: '#7fa86a' }),
      s('ellipse', { cx: 770, cy: 430, rx: 70, ry: 14, fill: '#6fa6d4' }),
      s('g', { transform: 'translate(690,320)' }, s('rect', { x: 6, y: 20, width: 8, height: 40, fill: '#6b4a2a' }), s('circle', { cx: 10, cy: 12, r: 22, fill: '#4f8a4a' })),
      s('g', { transform: 'translate(840,360)' }, s('rect', { x: 0, y: 14, width: 34, height: 28, fill: '#c9a374' }), s('path', { d: 'M-4 14 L17 -6 L38 14Z', fill: '#a8452b' })),
      /* roca y cámara */
      s('path', { d: 'M0 0 H585 L610 150 Q620 460 600 460 H0Z', fill: '#1a130e' }),
      s('path', { d: 'M30 120 H515 Q560 125 580 170 L600 330 Q606 440 560 440 H30Z', fill: '#3a2c22' }),
      /* pared + sombras */
      s('rect', { x: 30, y: 170, width: 100, height: 200, fill: '#6b5440' }),
      s('g', { fill: '#1b140f' }, s('ellipse', { cx: 62, cy: 300, rx: 8, ry: 22 }), s('circle', { cx: 62, cy: 270, r: 8 }), s('path', { d: 'M82 330 q10 -40 25 -10 l8 -22 l8 24 q12 -14 8 8z' }), s('path', { d: 'M48 215 q16 -20 34 0 q-6 22 -17 22 q-12 0 -17 -22z' })),
      /* luz de la hoguera */
      s('polygon', { points: '460,350 130,180 130,350', fill: '#ffb347', opacity: 0.1 }),
      /* prisioneros */
      s('g', { fill: '#cdb99a' }, [170, 215, 260].map(x => s('g', null, s('circle', { cx: x, cy: 345, r: 10 }), s('rect', { x: x - 10, y: 355, width: 20, height: 40, rx: 8 }), s('line', { x1: x, y1: 395, x2: x, y2: 410, stroke: '#8a8a8a', 'stroke-width': 3 })))),
      s('line', { x1: 150, y1: 410, x2: 290, y2: 410, stroke: '#8a8a8a', 'stroke-width': 3 }),
      /* tapia con figuras */
      s('rect', { x: 320, y: 345, width: 110, height: 50, fill: '#7d6247' }),
      s('g', { fill: '#a98a64' }, [340, 385].map(x => s('g', null, s('circle', { cx: x, cy: 308, r: 8 }), s('rect', { x: x - 7, y: 316, width: 14, height: 30, rx: 5 }))), s('path', { d: 'M362 300 q-12 -26 4 -28 q18 2 8 28z' })),
      /* fuego */
      s('circle', { cx: 470, cy: 355, r: 54, fill: 'url(#fire)' }),
      s('path', { d: 'M470 395 q-24 -26 -4 -52 q6 18 14 12 q16 22 -10 40z', fill: '#ff9d2a' }), s('path', { d: 'M470 395 q-12 -14 -2 -28 q8 10 10 16 q-2 8 -8 12z', fill: '#ffe08a' }),
      /* flecha de ascenso */
      s('path', { d: 'M500 410 C540 400 570 330 600 250', fill: 'none', stroke: '#e0a800', 'stroke-width': 4, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }));
    const wrap = h('div', { class: 'cave-wrap' }, svg);
    spots.forEach((p, i) => {
      const b = h('button', { class: 'hotspot', type: 'button', 'aria-label': p.n, style: `left:${p.x / 9}%;top:${p.y / 4.6}%`, onclick() {
        wrap.querySelectorAll('.hotspot').forEach(x => x.classList.remove('active'));
        b.classList.add('active', 'seen'); seen.add(i);
        panel.innerHTML = '';
        panel.append(h('h4', null, `${i + 1}. ${p.n}`), h('p', { html: rich(p.sym) }),
          h('dl', null, h('dt', null, 'Grado / Nivel'), h('dd', null, p.grado), h('dt', null, 'Dualismo'), h('dd', null, p.dual)));
        panel.style.borderColor = p.c;
        if (seen.size === spots.length && !done.firstChild) { done.append(h('div', { class: 'feedback show ok' }, '¡Caverna completa! Has recorrido los cinco dualismos y los cuatro grados.')); ctx.complete(); }
      } }, i + 1);
      wrap.append(b);
    });
    return h('div', null,
      R('Unos prisioneros viven encadenados desde niños en una caverna y solo ven sombras. Uno es liberado y sube hacia la luz. **Investiga los 7 puntos** y descubre qué simboliza cada elemento.'),
      wrap, panel, done);
  };

  /* ═════════ Armonía del alma ═════════ */
  W.armonia = (st, ctx) => {
    const v = { r: 34, v: 33, d: 33 };
    const names = { r: 'Razón', v: 'Valor', d: 'Deseo' };
    const colors = { r: '#4a6fa5', v: '#c9972b', d: '#a23b3b' };
    const verdict = h('div', { class: 'feedback show info' });
    const ranges = {}, nums = {};
    let solved = false;
    function evalSoul() {
      const { r, v: va, d } = v;
      let kind = 'info', msg;
      if (r >= va && va >= d && r >= 40 && va >= 20 && d >= 10) {
        kind = 'ok'; msg = '**Alma justa.** La razón dirige (prudencia), el valor la secunda (fortaleza) y el deseo, sin desaparecer, obedece (templanza). De esa armonía surge la **[[justicia|justicia]]**.';
        if (!solved) { solved = true; ctx.complete(); }
      } else if (d > r && d > va) {
        msg = d >= 60 ? '**Alma tiránica.** El deseo lo domina todo: eso es lo que Platón ve en el tirano.' : '**Alma oligárquica / democrática.** Manda el deseo (dinero, libertad sin freno). Siempre que el deseo manda, el alma se desequilibra.';
      } else if (va > r && va >= d) {
        msg = '**Alma timocrática.** Manda el ardor y la ambición de honor, sin la guía de la razón.';
      } else if (d < 10) {
        msg = '**Deseo aplastado.** Platón no pide aniquilar el deseo, sino moderarlo: la **templanza** es medida, no ausencia.';
      } else if (va < 20) {
        msg = 'La razón está **sola**: sin el valor como aliado, el deseo acaba imponiéndose.';
      } else msg = 'Cerca… La razón debe dirigir con claridad (≥ 40) y el valor debe ir por delante del deseo.';
      verdict.className = 'feedback show ' + kind;
      verdict.innerHTML = rich(msg);
    }
    function onInput(k, val) {
      val = Math.round(val);
      const others = ['r', 'v', 'd'].filter(x => x !== k);
      const sumO = v[others[0]] + v[others[1]], rest = 100 - val;
      if (sumO === 0) { v[others[0]] = Math.floor(rest / 2); v[others[1]] = rest - v[others[0]]; }
      else { v[others[0]] = Math.round(v[others[0]] * rest / sumO); v[others[1]] = rest - v[others[0]]; }
      v[k] = val;
      Object.keys(v).forEach(x => { ranges[x].value = v[x]; nums[x].textContent = v[x]; });
      evalSoul();
    }
    const rows = ['r', 'v', 'd'].map(k => {
      const input = h('input', { type: 'range', min: 0, max: 100, value: v[k], 'aria-label': names[k] });
      input.style.accentColor = colors[k];
      ranges[k] = input; nums[k] = h('b', null, v[k]);
      input.addEventListener('input', () => onInput(k, +input.value));
      return h('label', { class: 'slider' }, h('span', null, names[k]), input, nums[k]);
    });
    evalSoul();
    return h('div', null,
      R('Tienes **100 puntos de energía** para repartir entre las tres partes de tu alma. Si subes una, bajan las otras. **Reto:** encuentra un reparto que dé como resultado un **alma justa**.'),
      h('div', { class: 'sliders' }, rows), verdict,
      h('p', { class: 'small muted' }, 'Pista: la razón debe ser la mayor, el valor la secunda y el deseo no desaparece.'));
  };

  /* ═════════ Calípolis ═════════ */
  W.calipolis = (st, ctx) => {
    const castas = {
      g: { n: 'Gobernantes-filósofos', alma: 'Racional', virtud: 'Prudencia', fn: 'Dirigir el Estado', c: '#4a6fa5' },
      c: { n: 'Guardianes', alma: 'Irascible', virtud: 'Fortaleza', fn: 'Defender la ciudad', c: '#c9972b' },
      p: { n: 'Productores', alma: 'Concupiscible', virtud: 'Templanza', fn: 'Satisfacer las necesidades materiales', c: '#a23b3b' }
    };
    const people = [
      { nombre: 'Lía', desc: 'Siempre pregunta «por qué». Le apasionan los problemas de lógica y mantiene la calma ante la tentación.', k: 'g' },
      { nombre: 'Marco', desc: 'Valiente y disciplinado. Se siente orgulloso cuando protege a los demás; ama el deporte y el entrenamiento.', k: 'c' },
      { nombre: 'Nora', desc: 'Le encanta comerciar, hacer cosas útiles y disfrutar de la buena mesa. Ahorra para su familia.', k: 'p' },
      { nombre: 'Hipólito', desc: 'Domina la geometría y la astronomía y cuestiona todo. Los negocios le aburren.', k: 'g' },
      { nombre: 'Aquiles', desc: 'Impulsivo y valeroso. No soporta ver una injusticia y busca el honor.', k: 'c' },
      { nombre: 'Eirene', desc: 'Hábil artesana: sus cerámicas se venden muy bien. Vive tranquila con su familia.', k: 'p' },
      { nombre: 'Darío', desc: 'Hijo de una gobernante-filósofa. Lo que más le atrae son los negocios y vivir cómodamente.', k: 'p', nota: 'La aristocracia platónica **no es hereditaria**: se accede por méritos y capacidades, no por nacimiento.' }
    ];
    let left = people.length;
    const grid = h('div', { class: 'people' }), out = h('div');
    people.forEach(p => {
      const msg = h('div', { class: 'pmsg' });
      const card = h('div', { class: 'person' }, h('b', null, p.nombre), h('p', null, p.desc), msg);
      const btns = h('div', { class: 'row' }, Object.entries(castas).map(([k, c]) => h('button', { class: 'btn small', type: 'button', onclick() {
        if (k === p.k) {
          btns.remove(); card.classList.add('ok'); card.style.borderColor = c.c;
          msg.innerHTML = rich(`✔ **${c.n}** · alma ${c.alma.toLowerCase()} · virtud: ${c.virtud}. ${p.nota || ''}`);
          left--; if (!left) finish();
        } else { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 400); msg.innerHTML = rich('Piensa: ¿qué parte del alma predomina en esta persona? (racional, irascible o concupiscible)'); }
      } }, c.n)));
      card.append(btns); grid.append(card);
    });
    function finish() {
      out.append(h('div', { class: 'feedback show ok', html: rich('**¡Ciudad organizada!** La justicia social consiste en la **armonía** de las tres castas, sin intromisión de unas en las funciones de otras, bajo la dirección de los gobernantes.') }),
        h('table', { class: 'tabla' }, h('thead', null, h('tr', null, ['Alma', 'Casta', 'Virtud', 'Función'].map(x => h('th', null, x)))),
          h('tbody', null, Object.values(castas).map(c => h('tr', null, h('td', null, c.alma), h('td', null, c.n), h('td', null, c.virtud), h('td', null, c.fn))))),
        revealBox({ title: 'Igualdad de oportunidades', body: ['Platón propone algo muy avanzado para su época: las **mujeres** tienen capacidades análogas a las de los hombres y pueden acceder, en igualdad, a todos los cargos del Estado (incluso guerrear). Lo que cuenta es el **alma**, no el sexo ni el linaje.'] }));
      ctx.complete();
    }
    return h('div', null,
      R('Eres el **Estado ideal** de Platón. Los niños se observan desde pequeños y la educación los destina a una casta según **el alma que predomina en ellos**. **Asigna a cada ciudadano a su casta.**'), grid, out);
  };

  /* ═════════ Debate ═════════ */
  W.debate = (st, ctx) => {
    const claims = [
      { t: 'Deberían gobernar quienes más saben, no quienes más votos consiguen.', p: 'Platón: sí. Como el timonel de un barco, el gobernante debe conocer el arte de gobernar.', c: 'Objeción: ¿quién decide quién sabe? Y ¿los expertos pueden gobernar sin rendir cuentas?' },
      { t: 'El Estado debe seleccionar a cada niño y educarlo según sus capacidades.', p: 'Platón: así se evita la injusticia de que ocupe un cargo quien no vale para él.', c: 'Objeción: ¿y la libertad individual? Es lo que hace al Estado platónico **totalitario**.' },
      { t: 'Los gobernantes no deberían tener propiedades ni familia propia para no corromperse.', p: 'Platón: sin ambición personal solo piensan en el bien común.', c: 'Objeción: anular la familia y la propiedad choca con derechos individuales básicos.' },
      { t: 'Hombres y mujeres pueden desempeñar los mismos cargos si tienen las mismas capacidades.', p: 'Platón: sí, la mujer es más débil físicamente, pero análoga en capacidades naturales.', c: 'Observación: ¡una propuesta adelantada a su tiempo! Aunque no cuestiona la esclavitud.' },
      { t: 'La democracia ateniense condenó a Sócrates, así que la democracia es un mal sistema.', p: 'Platón: la democracia degenera en anarquía y tiranía por la incapacidad de una mayoría no cualificada.', c: 'Objeción: la solución a los errores de la democracia, ¿es suprimirla? ¿Y quién vigila a los sabios?' }
    ];
    let answered = 0;
    const list = h('div', { class: 'claims' });
    const ta = h('textarea', { rows: 4, placeholder: 'Mi conclusión…' });
    ta.value = Store.getNote(ctx.id);
    const fin = h('div', { class: 'hidden' });
    claims.forEach(c => {
      const resp = h('div', { class: 'cresp hidden' }, h('p', null, h('b', null, 'Lo que diría Platón. '), c.p.replace(/^Platón: /, '')), h('p', null, h('b', null, 'Una objeción. '), c.c.replace(/^(Objeción|Observación): /, '')));
      let got = false;
      const opts = h('div', { class: 'likert' }, ['Muy en desacuerdo', 'En desacuerdo', 'Dudo', 'De acuerdo', 'Muy de acuerdo'].map((l, i) => h('button', { type: 'button', class: 'lk', onclick(e) {
        e.currentTarget.parentNode.querySelectorAll('.lk').forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on');
        resp.classList.remove('hidden');
        if (!got) { got = true; answered++; if (answered === claims.length) fin.classList.remove('hidden'); }
      } }, l)));
      list.append(h('div', { class: 'claim' }, h('p', null, h('b', null, c.t)), opts, resp));
    });
    const go = h('button', { class: 'btn primary', type: 'button', onclick() {
      if (ta.value.trim().length < 12) { toast('Escribe al menos una frase.'); return; }
      Store.setNote(ctx.id, { station: ctx.station.title, title: st.title, prompt: '¿Utopía o totalitarismo? Mi conclusión' }, ta.value.trim());
      go.disabled = true; ctx.complete();
    } }, 'Guardar mi conclusión');
    fin.append(R('**¿Utopía o totalitarismo?** Tras valorar las cinco ideas, escribe tu conclusión razonada.'), ta, h('div', { class: 'row' }, go));
    return h('div', null, R('Valora estas ideas del Estado platónico. Después de cada una verás **qué respondería Platón** y una **objeción**.'), list, fin);
  };

  /* ═════════ Examen final ═════════ */
  W.examen = (st, ctx) => {
    const root = h('div');
    function start() {
      const qs = shuffle(window.EXAM).slice(0, 10);
      let i = 0, score = 0;
      const wrong = [];
      function show() {
        root.innerHTML = '';
        if (i >= qs.length) return end();
        const q = qs[i];
        const opts = shuffle(q.o.map((t, k) => ({ t, k })));
        const fb = feedback();
        const list = h('div', { class: 'options' });
        opts.forEach((o, idx) => list.append(h('button', { class: 'option', type: 'button', onclick(e) {
          list.querySelectorAll('.option').forEach(x => x.disabled = true);
          const ok = o.k === q.c;
          e.currentTarget.classList.add(ok ? 'ok' : 'bad');
          if (!ok) { list.querySelectorAll('.option')[opts.findIndex(x => x.k === q.c)].classList.add('ok'); wrong.push(q.q); }
          else score++;
          setFb(fb, ok ? 'ok' : 'bad', (ok ? '<strong>¡Bien!</strong> ' : '<strong>No exactamente.</strong> ') + rich(q.w));
          fb.append(h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick() { i++; show(); } }, i + 1 >= qs.length ? 'Ver resultado' : 'Siguiente')));
        } }, h('span', { class: 'ol' }, String.fromCharCode(65 + idx)), o.t)));
        root.append(h('div', { class: 'progress-mini' }, h('i', { style: `width:${i / qs.length * 100}%` })), h('p', { class: 'small muted' }, `Pregunta ${i + 1} de ${qs.length}`), h('p', { class: 'q', html: rich(q.q) }), list, fb);
      }
      function end() {
        const pass = score >= 6;
        const best = Math.max(score, (Store.d.exam || 0));
        Store.d.exam = best; Store.save();
        root.append(h('div', { class: 'score' }, h('b', null, `${score}/${qs.length}`), h('span', null, pass ? '¡Has salido de la cueva!' : 'Todavía hay sombras…')),
          h('div', { class: 'feedback show ' + (pass ? 'ok' : 'info'), html: pass ? 'Superas la prueba (mínimo 6). Puedes repetirla para mejorar tu marca.' : 'Necesitas 6 para pasar. Repasa las estaciones y vuelve a intentarlo: las preguntas cambian.' }),
          wrong.length ? h('div', { class: 'reveal' }, h('h4', null, 'Para repasar'), h('ul', null, wrong.map(w => h('li', null, w)))) : null,
          h('div', { class: 'row' }, h('button', { class: 'btn', type: 'button', onclick: start }, 'Repetir con otras preguntas')));
        if (pass) ctx.complete();
      }
      show();
    }
    root.append(R('Diez preguntas al azar sobre todo lo descubierto. **Necesitas 6 aciertos** para pasar. Puedes repetirla las veces que quieras.'),
      h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: start }, 'Empezar la prueba')),
      Store.d.exam != null ? h('p', { class: 'small muted' }, `Tu mejor marca: ${Store.d.exam}/10`) : null);
    return root;
  };

  /* ═════════ Comentario de texto guiado ═════════ */
  W.comentario = (st, ctx) => {
    const c = window.COMENTARIO;
    const ta = h('textarea', { rows: 10, placeholder: 'Escribe tu comentario…' });
    ta.value = Store.getNote(ctx.id);
    const count = h('span', { class: 'small muted' }, '0 palabras');
    const go = h('button', { class: 'btn primary', type: 'button', disabled: true, onclick() {
      Store.setNote(ctx.id, { station: ctx.station.title, title: 'Comentario de texto', prompt: c.titulo }, ta.value.trim());
      go.disabled = true; ctx.complete(); toast('Comentario guardado en tu cuaderno ✍️');
    } }, 'Guardar mi comentario');
    const words = () => ta.value.trim().split(/\s+/).filter(Boolean).length;
    const upd = () => { const n = words(); count.textContent = n + ' palabras (mínimo 60)'; go.disabled = n < 60; };
    ta.addEventListener('input', upd); upd();
    return h('div', null,
      h('blockquote', { class: 'texto' }, h('b', null, c.titulo), h('p', null, c.texto)),
      h('p', { class: 'small muted' }, 'Paráfrasis fiel al contenido de la unidad. Para tu examen trabajarás con la traducción literal del texto.'),
      h('h4', null, 'Guía de comentario'), h('ol', { class: 'guia' }, c.guia.map(g => h('li', null, g))),
      ta, h('div', { class: 'row' }, go, count));
  };

  /* ═════════ Diploma ═════════ */
  W.diploma = (st, ctx) => {
    const name = h('input', { type: 'text', placeholder: 'Tu nombre', maxlength: 40, 'aria-label': 'Tu nombre' });
    name.value = Store.d.name || '';
    const out = h('div');
    function show() {
      out.innerHTML = '';
      ctx.complete();
      const total = window.App.totalSteps(), done = window.App.doneSteps();
      out.append(h('div', { class: 'diploma' },
        h('div', { class: 'dip-in' },
          h('small', null, 'Academia de Platón · Atenas'),
          h('h3', null, 'Prisionero liberado'),
          h('p', null, 'Se concede a'), h('div', { class: 'dip-name' }, name.value.trim()),
          h('p', null, `por haber salido de la caverna: ${done} de ${total} pasos completados`, Store.d.exam != null ? ` y ${Store.d.exam}/10 en la prueba final.` : '.'),
          h('p', { class: 'dip-q' }, '«Conocer es recordar.»'))),
        h('div', { class: 'row noprint' }, h('button', { class: 'btn primary', type: 'button', onclick() { window.print(); } }, 'Imprimir / guardar PDF'),
          h('button', { class: 'btn', type: 'button', onclick() { window.App.exportNotes(); } }, 'Descargar mi cuaderno (.txt)')));
    }
    return h('div', null, R('Último paso de la ascensión. **Escribe tu nombre** para generar tu diploma y descargar tu cuaderno de campo con todas tus respuestas.'),
      h('div', { class: 'row' }, name, h('button', { class: 'btn primary', type: 'button', onclick() {
        if (name.value.trim().length < 2) { toast('Escribe tu nombre.'); return; }
        Store.d.name = name.value.trim(); Store.save(); show();
      } }, 'Generar diploma')), out);
  };
})();

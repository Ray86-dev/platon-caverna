/* App: enrutado, portada, estaciones, glosario y cuaderno. */
(function () {
  'use strict';
  const { h, s, R, rich, toast, Store, T } = window.Engine;
  const STATIONS = window.STATIONS;
  const main = document.getElementById('app');
  const sid = (st, i) => `${st.id}-${i}`;

  /* ───────── progreso global ───────── */
  const totalSteps = () => STATIONS.reduce((a, st) => a + st.steps.length, 0);
  const doneSteps = () => STATIONS.reduce((a, st) => a + st.steps.filter((_, i) => Store.isDone(sid(st, i))).length, 0);
  const stationDone = st => st.steps.filter((_, i) => Store.isDone(sid(st, i))).length;
  const pct = () => Math.round(doneSteps() / totalSteps() * 100);

  function updateLight() {
    const p = doneSteps() / totalSteps();
    document.documentElement.style.setProperty('--light', p.toFixed(3));
    const label = document.getElementById('lightPct');
    if (label) label.textContent = pct() + '%';
    const fill = document.getElementById('sunFill');
    if (fill) fill.style.width = pct() + '%';
  }

  /* ───────── portada ───────── */
  function caveHero() {
    return s('svg', { viewBox: '0 0 800 360', class: 'hero-art', 'aria-hidden': 'true', preserveAspectRatio: 'xMidYMax slice' },
      s('defs', null,
        s('radialGradient', { id: 'hg' }, s('stop', { offset: 0, 'stop-color': '#ffd27a', 'stop-opacity': 0.95 }), s('stop', { offset: 1, 'stop-color': '#ff7a00', 'stop-opacity': 0 })),
        s('linearGradient', { id: 'beam', x1: 0, y1: 1, x2: 0, y2: 0 }, s('stop', { offset: 0, 'stop-color': '#ffe9a8', 'stop-opacity': 0.5 }), s('stop', { offset: 1, 'stop-color': '#ffe9a8', 'stop-opacity': 0 }))),
      /* luz que entra */
      s('polygon', { points: '560,0 760,0 640,360 520,360', fill: 'url(#beam)' }),
      s('g', { transform: 'translate(250 0)' },
      /* sombras bailando en la pared */
      s('g', { class: 'shadow-dance', fill: '#0b0806', opacity: 0.85 },
        s('path', { d: 'M90 120 q18 -50 36 0 q-4 40 -18 40 q-14 0 -18 -40z' }),
        s('path', { d: 'M180 190 q8 -30 28 -10 l12 -26 l8 30 q16 -10 10 16z' }),
        s('ellipse', { cx: 300, cy: 130, rx: 14, ry: 34 }), s('circle', { cx: 300, cy: 88, r: 12 })),
      /* fuego */
      s('circle', { cx: 420, cy: 300, r: 90, fill: 'url(#hg)', class: 'flicker' }),
      s('path', { d: 'M420 340 q-30 -34 -4 -66 q8 22 18 14 q20 28 -14 52z', fill: '#ff9d2a' }),
      /* prisioneros de espaldas */
      s('g', { fill: '#1a130e' }, [90, 150, 205].map(x => s('g', null, s('circle', { cx: x, cy: 295, r: 13 }), s('rect', { x: x - 13, y: 308, width: 26, height: 52, rx: 10 })))),
      s('rect', { x: -250, y: 352, width: 1100, height: 8, fill: '#0b0806' })));
  }

  function renderHome() {
    document.body.dataset.view = 'home';
    const p = pct();
    const first = STATIONS.find(st => stationDone(st) < st.steps.length) || STATIONS[0];
    const started = doneSteps() > 0;
    main.innerHTML = '';
    main.append(
      h('section', { class: 'hero' }, caveHero(),
        h('div', { class: 'hero-in' },
          h('p', { class: 'eyebrow' }, 'Historia de la Filosofía · 2.º Bachillerato'),
          h('h1', null, '¿Y si lo que ves no fuera ', h('em', null, 'lo real'), '?'),
          h('p', { class: 'lede' }, 'Eres un prisionero. Llevas toda tu vida mirando sombras en una pared. En esta aventura descubrirás, por ti mismo, el pensamiento de ', h('strong', null, 'Platón'), '… y sabrás por qué tiene sentido dar media vuelta.'),
          h('div', { class: 'row' },
            h('a', { class: 'btn primary lg', href: '#/e/' + first.id }, started ? 'Seguir ascendiendo' : 'Gírate y empieza'),
            h('a', { class: 'btn ghost light lg', href: '#como' , onclick(e) { e.preventDefault(); document.getElementById('como').scrollIntoView({ behavior: 'smooth' }); } }, 'Cómo funciona')))),
      h('section', { class: 'wrap', id: 'como' },
        h('h2', { class: 'sec' }, 'Aquí no se te explica: se te pregunta'),
        h('div', { class: 'how' },
          [['❓', 'Preguntas y pistas', 'Cada estación empieza con una pregunta. Si te atascas, pide una pista. Solo después verás qué pensó Platón.'],
           ['🧩', 'Retos', 'Clasifica, empareja, ordena, dibuja, conduce un carro… Equivocarte forma parte del método.'],
           ['📓', 'Cuaderno de campo', 'Lo que escribes se guarda en tu navegador y puedes descargarlo al final para entregarlo.']]
            .map(x => h('div', { class: 'how-card' }, h('span', null, x[0]), h('b', null, x[1]), h('p', null, x[2]))))),
      h('section', { class: 'wrap' },
        h('h2', { class: 'sec' }, 'El camino de ascenso'),
        h('p', { class: 'sub' }, 'Siete estaciones, de las sombras al Sol. Se recomienda seguir el orden, pero puedes entrar en la que quieras.'),
        h('ol', { class: 'path' }, STATIONS.map((st, k) => {
          const d = stationDone(st), n = st.steps.length;
          return h('li', { class: 'path-item' + (d === n ? ' done' : d ? ' going' : '') },
            h('a', { href: '#/e/' + st.id },
              h('span', { class: 'p-icon' }, st.icon),
              h('span', { class: 'p-body' },
                h('small', null, `Estación ${st.num} · ${st.subtitle}`),
                h('b', null, st.title),
                h('span', { class: 'p-obj' }, st.objectives.join(' · '))),
              h('span', { class: 'p-prog', 'aria-label': `${d} de ${n} completados` }, d === n ? '✓' : `${d}/${n}`)));
        }))),
      h('section', { class: 'wrap foot' },
        h('p', { class: 'small muted' }, 'Material elaborado a partir de la Unidad 1 («Los orígenes de la filosofía. El idealismo de Platón»). Los vídeos son enlaces a YouTube que se cargan solo si los pulsas.'),
        h('button', { class: 'linklike', type: 'button', onclick() {
          if (confirm('¿Borrar todo tu progreso y tu cuaderno en este navegador?')) { Store.reset(); renderRoute(); toast('Progreso reiniciado'); }
        } }, 'Reiniciar mi progreso')));
    updateLight();
    window.scrollTo(0, 0);
  }

  /* ───────── estación ───────── */
  function renderStation(id) {
    const idx = STATIONS.findIndex(x => x.id === id);
    if (idx < 0) { location.hash = '#/'; return; }
    const st = STATIONS[idx];
    document.body.dataset.view = 'station';
    main.innerHTML = '';
    const bar = h('i'); const prog = h('div', { class: 'st-prog' }, h('div', { class: 'track' }, bar), h('span'));
    const end = h('section', { class: 'step end hidden' });
    const list = h('div', { class: 'steps' });
    const wraps = [];

    function refresh(scrollTo) {
      const d = stationDone(st);
      bar.style.width = d / st.steps.length * 100 + '%';
      prog.lastChild.textContent = `${d} / ${st.steps.length}`;
      let firstUndone = st.steps.findIndex((_, i) => !Store.isDone(sid(st, i)));
      if (firstUndone < 0) firstUndone = st.steps.length;
      wraps.forEach((w, i) => {
        w.el.classList.toggle('hidden', i > firstUndone);
        w.el.classList.toggle('done', Store.isDone(sid(st, i)));
        w.el.classList.toggle('current', i === firstUndone);
      });
      end.classList.toggle('hidden', firstUndone < st.steps.length);
      updateLight();
      if (scrollTo != null) {
        const target = scrollTo < wraps.length ? wraps[scrollTo].el : end;
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
      }
    }

    st.steps.forEach((step, i) => {
      const stepId = sid(st, i);
      const ctx = {
        id: stepId, station: st,
        complete() {
          const was = Store.isDone(stepId);
          Store.setDone(stepId);
          if (!was) { refresh(i + 1); }
        }
      };
      const body = h('div', { class: 'body' });
      const el = h('section', { class: 'step', id: stepId },
        h('header', null,
          h('span', { class: 'num' }, i + 1),
          h('div', null, h('small', null, step.kicker || 'Paso'), h('h3', null, step.title)),
          h('span', { class: 'check', 'aria-label': 'Completado' }, '✓')),
        body);
      body.append(T[step.type](step, ctx));
      wraps.push({ el }); list.append(el);
    });

    const prev = STATIONS[idx - 1], next = STATIONS[idx + 1];
    end.append(h('h3', null, idx === STATIONS.length - 1 ? '¡Has salido de la caverna! 🌅' : `Estación ${st.num} superada`),
      R(idx === STATIONS.length - 1 ? 'Descarga tu diploma y tu cuaderno de campo arriba. Siguiente unidad del curso: **Aristóteles**.' : 'Has avanzado un grado más hacia la luz.'),
      h('div', { class: 'row' }, next ? h('a', { class: 'btn primary lg', href: '#/e/' + next.id }, `Siguiente: ${next.title} →`) : null,
        h('a', { class: 'btn ghost', href: '#/' }, 'Volver al mapa')));

    main.append(
      h('section', { class: 'st-hero', style: `--grade:${['#e8833a', '#d86d2a', '#6c7fb8', '#e0a800', '#5c8f6a', '#4a6fa5', '#e0a800'][idx]}` },
        h('div', { class: 'wrap' },
          h('a', { class: 'back', href: '#/' }, '← Mapa'),
          h('p', { class: 'eyebrow' }, `Estación ${st.num} de ${STATIONS.length} · ${st.subtitle}`),
          h('h1', null, h('span', { class: 'big-icon' }, st.icon), st.title),
          h('p', { class: 'lede', html: rich(st.epigraph) }),
          h('ul', { class: 'objs' }, st.objectives.map(o => h('li', null, o))),
          prog)),
      h('div', { class: 'wrap narrow' }, list, end,
        h('nav', { class: 'st-nav' }, prev ? h('a', { href: '#/e/' + prev.id }, '← ' + prev.title) : h('span'), next ? h('a', { href: '#/e/' + next.id }, next.title + ' →') : h('span'))));

    refresh();
    window.scrollTo(0, 0);
    // saltar al primer paso pendiente si ya había progreso
    const fu = st.steps.findIndex((_, i) => !Store.isDone(sid(st, i)));
    if (fu > 0) setTimeout(() => wraps[fu].el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }

  /* ───────── glosario y popover ───────── */
  const pop = h('div', { class: 'pop hidden', role: 'dialog' });
  document.body.append(pop);
  document.addEventListener('click', e => {
    const t = e.target.closest('.term');
    if (!t) { if (!e.target.closest('.pop')) pop.classList.add('hidden'); return; }
    const g = window.GLOSSARY[t.dataset.term];
    if (!g) return;
    pop.innerHTML = '';
    pop.append(h('b', null, g[0]), h('p', null, g[1]), h('button', { class: 'linklike', type: 'button', onclick() { openGlossary(t.dataset.term); pop.classList.add('hidden'); } }, 'Abrir glosario'));
    pop.classList.remove('hidden');
    const r = t.getBoundingClientRect();
    const w = Math.min(320, innerWidth - 24);
    pop.style.width = w + 'px';
    pop.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left)) + 'px';
    const below = r.bottom + 8, ph = pop.offsetHeight;
    pop.style.top = (below + ph > innerHeight ? Math.max(8, r.top - ph - 8) : below) + 'px';
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { pop.classList.add('hidden'); closeDrawer(); } });

  const drawer = document.getElementById('drawer');
  const dTitle = document.getElementById('drawerTitle'), dBody = document.getElementById('drawerBody');
  function openDrawer(title, content) {
    dTitle.textContent = title; dBody.innerHTML = ''; dBody.append(content);
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    document.getElementById('scrim').classList.add('open');
  }
  function closeDrawer() {
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
    document.getElementById('scrim').classList.remove('open');
  }
  function openGlossary(focus) {
    const q = h('input', { type: 'search', placeholder: 'Buscar término…', 'aria-label': 'Buscar en el glosario' });
    const list = h('dl', { class: 'gloss' });
    const entries = Object.entries(window.GLOSSARY).sort((a, b) => a[1][0].localeCompare(b[1][0], 'es'));
    function draw() {
      const f = q.value.trim().toLowerCase();
      list.innerHTML = '';
      entries.filter(([k, v]) => !f || (v[0] + ' ' + v[1]).toLowerCase().includes(f)).forEach(([k, v]) => {
        list.append(h('dt', { id: 'g-' + k }, v[0]), h('dd', null, v[1]));
      });
    }
    q.addEventListener('input', draw); draw();
    openDrawer('Glosario', h('div', null, q, list));
    if (focus) setTimeout(() => { const el = document.getElementById('g-' + focus); if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); } }, 80);
  }

  /* ───────── cuaderno ───────── */
  function collectNotes() {
    const out = [];
    STATIONS.forEach(st => st.steps.forEach((step, i) => {
      const n = Store.d.notes[sid(st, i)];
      if (n && n.text) out.push({ station: st.title, num: st.num, title: n.title, prompt: n.prompt, text: n.text });
    }));
    return out;
  }
  function exportNotes() {
    const notes = collectNotes();
    const strip = t => String(t || '').replace(/\*\*?/g, '').replace(/\[\[[a-z0-9_]+\|([^\]]+)\]\]/g, '$1');
    let txt = `CUADERNO DE CAMPO · Platón y la caverna\n${Store.d.name ? 'Alumno/a: ' + Store.d.name + '\n' : ''}Fecha: ${new Date().toLocaleDateString('es-ES')}\nProgreso: ${pct()}%${Store.d.exam != null ? ' · Prueba final: ' + Store.d.exam + '/10' : ''}\n${'='.repeat(60)}\n\n`;
    let cur = '';
    notes.forEach(n => {
      if (n.station !== cur) { cur = n.station; txt += `\n## Estación ${n.num}: ${cur}\n\n`; }
      txt += `▸ ${n.title}\n  Pregunta: ${strip(n.prompt)}\n  Respuesta: ${n.text}\n\n`;
    });
    if (!notes.length) txt += 'Todavía no has escrito nada.\n';
    const a = h('a', { href: URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })), download: 'cuaderno-platon.txt' });
    document.body.append(a); a.click(); a.remove();
  }
  function openNotes() {
    const notes = collectNotes();
    const box = h('div', null,
      h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: exportNotes }, 'Descargar (.txt)'),
        h('button', { class: 'btn', type: 'button', onclick() { window.print(); } }, 'Imprimir')),
      notes.length ? notes.map(n => h('article', { class: 'note' }, h('small', null, `Estación ${n.num} · ${n.station}`), h('b', null, n.title), h('p', { class: 'muted', html: rich(n.prompt) }), h('p', null, n.text)))
        : h('p', { class: 'muted' }, 'Aún no has escrito nada. Tus respuestas a las preguntas y a los vídeos aparecerán aquí.'));
    openDrawer('Mi cuaderno de campo', box);
  }

  document.getElementById('btnGloss').addEventListener('click', () => openGlossary());
  document.getElementById('btnNotes').addEventListener('click', openNotes);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('scrim').addEventListener('click', closeDrawer);

  /* ───────── router ───────── */
  function renderRoute() {
    closeDrawer(); pop.classList.add('hidden');
    const m = location.hash.match(/^#\/e\/([a-z]+)/);
    if (m) renderStation(m[1]); else renderHome();
  }
  window.addEventListener('hashchange', renderRoute);
  window.App = { totalSteps, doneSteps, exportNotes };
  renderRoute();
})();

/* Motor: helpers DOM, estado persistente y tipos de paso reutilizables. */
(function () {
  'use strict';

  /* ───────── helpers ───────── */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }
  const SVGNS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, ...kids) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }
  function rich(str) {
    return String(str)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[\[([a-z0-9_]+)\|([^\]]+)\]\]/g, (m, k, l) => `<button type="button" class="term" data-term="${k}">${l}</button>`);
  }
  const R = (str, tag = 'p', cls) => h(tag, { class: cls, html: rich(str) });
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function toast(msg) {
    const t = h('div', { class: 'toast', role: 'status' }, msg);
    document.body.append(t);
    setTimeout(() => t.classList.add('out'), 2200);
    setTimeout(() => t.remove(), 2700);
  }

  /* ───────── estado ───────── */
  const KEY = 'platon-cueva-v1';
  const Store = {
    d: { done: {}, notes: {}, exam: null, name: '' },
    load() {
      try { Object.assign(this.d, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* sin almacenamiento */ }
    },
    save() { try { localStorage.setItem(KEY, JSON.stringify(this.d)); } catch (e) { /* ignorar */ } },
    isDone(id) { return !!this.d.done[id]; },
    setDone(id) { this.d.done[id] = 1; this.save(); },
    note(id) { return this.d.notes[id] || ''; },
    setNote(id, meta, text) { this.d.notes[id] = Object.assign({}, meta, { text }); this.save(); },
    getNote(id) { return (this.d.notes[id] || {}).text || ''; },
    reset() { this.d = { done: {}, notes: {}, exam: null, name: '' }; this.save(); }
  };
  Store.load();

  /* ───────── tipos de paso ───────── */
  const T = {}; // T[type](step, ctx) → Element
  const W = {}; // W[name](step, ctx) → Element  (widgets)

  function feedback() { return h('div', { class: 'feedback', 'aria-live': 'polite' }); }
  function setFb(el, kind, html) {
    el.className = 'feedback show ' + kind;
    el.innerHTML = html;
  }
  function revealBox(rv) {
    return h('div', { class: 'reveal' },
      h('h4', null, rv.title),
      rv.body.map(p => R(p)));
  }

  /* — reflexión con pistas progresivas — */
  T.reflect = (st, ctx) => {
    const ta = h('textarea', { rows: 4, placeholder: st.placeholder || 'Escribe aquí tu respuesta…', 'aria-label': 'Tu respuesta' });
    ta.value = Store.getNote(ctx.id);
    const hintsBox = h('div', { class: 'hints' });
    let used = 0;
    const hintBtn = h('button', { class: 'btn ghost', type: 'button', onclick() {
      if (used < st.hints.length) {
        hintsBox.append(h('div', { class: 'hint', html: '💡 ' + rich(st.hints[used]) }));
        used++;
        if (used >= st.hints.length) hintBtn.disabled = true;
        hintBtn.textContent = used >= st.hints.length ? 'No quedan más pistas' : `Otra pista (${used}/${st.hints.length})`;
      }
    } }, 'Necesito una pista');
    const slot = h('div');
    const go = h('button', { class: 'btn primary', type: 'button', disabled: true, onclick() {
      Store.setNote(ctx.id, { station: ctx.station.title, title: st.title, prompt: st.prompt }, ta.value.trim());
      go.disabled = true; ta.readOnly = true;
      slot.append(revealBox(st.reveal));
      ctx.complete();
    } }, 'Comparar con Platón');
    ta.addEventListener('input', () => { go.disabled = ta.value.trim().length < 12 || ta.readOnly; });
    go.disabled = ta.value.trim().length < 12;
    return h('div', null, R(st.prompt), ta,
      h('div', { class: 'row' }, hintBtn, go),
      hintsBox, slot);
  };

  /* — quiz de respuesta única — */
  T.quiz = (st, ctx) => {
    const fb = feedback();
    const opts = shuffle(st.options.map((t, i) => ({ t, i })));
    let tries = 0, solved = false;
    const list = h('div', { class: 'options', role: 'group' });
    opts.forEach(o => {
      const b = h('button', { class: 'option', type: 'button', onclick() {
        if (solved) return;
        tries++;
        if (o.i === st.correct) {
          solved = true;
          b.classList.add('ok');
          list.querySelectorAll('.option').forEach(x => x.disabled = true);
          setFb(fb, 'ok', '<strong>¡Correcto!</strong> ' + rich(st.explain));
          ctx.complete();
        } else {
          b.classList.add('bad'); b.disabled = true;
          setFb(fb, 'bad', (st.feedback && st.feedback[o.i]) || 'No es esa. Mira las demás opciones' + (tries > 1 && st.hint ? ' — <em>Pista: ' + rich(st.hint) + '</em>' : '.'));
        }
      } }, h('span', { class: 'ol' }, String.fromCharCode(65 + opts.indexOf(o))), h('span', { html: rich(o.t) }));
      list.append(b);
    });
    return h('div', null, R(st.question), list, fb);
  };

  /* — emparejar — */
  T.match = (st, ctx) => {
    const fb = feedback();
    const right = shuffle(st.pairs.map((p, i) => ({ t: p[1], i })));
    let selL = null, left = st.pairs.length, errors = 0;
    const colL = h('div', { class: 'col' }), colR = h('div', { class: 'col' });
    const Lb = [], Rb = [];
    st.pairs.forEach((p, i) => {
      const b = h('button', { class: 'chip', type: 'button', html: rich(p[0]), onclick() {
        if (b.classList.contains('done')) return;
        Lb.forEach(x => x.classList.remove('sel')); b.classList.add('sel'); selL = i;
        fb.className = 'feedback';
      } });
      Lb.push(b); colL.append(b);
    });
    right.forEach(r => {
      const b = h('button', { class: 'chip', type: 'button', html: rich(r.t), onclick() {
        if (b.classList.contains('done')) return;
        if (selL == null) { setFb(fb, 'info', 'Primero elige un elemento de la columna izquierda.'); return; }
        if (r.i === selL) {
          b.classList.add('done'); Lb[selL].classList.remove('sel'); Lb[selL].classList.add('done');
          selL = null; left--;
          if (!left) {
            setFb(fb, 'ok', '<strong>¡Todo emparejado!</strong> ' + (st.after ? rich(st.after) : ''));
            ctx.complete();
          } else setFb(fb, 'ok', 'Bien. Quedan ' + left + '.');
        } else {
          errors++; b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400);
          setFb(fb, 'bad', 'Esa pareja no encaja' + (errors > 2 ? ' — piensa en lo que significa cada término.' : '. Inténtalo otra vez.'));
        }
      } });
      Rb.push(b); colR.append(b);
    });
    return h('div', null, R(st.prompt), h('div', { class: 'match' }, colL, colR), fb);
  };

  /* — clasificar (clic o arrastrar) — */
  T.sort = (st, ctx) => {
    const fb = feedback();
    const items = shuffle(st.items.map((it, i) => Object.assign({ i }, it)));
    let remaining = items.length, selected = null, errors = 0;
    const pool = h('div', { class: 'pool' });
    const cols = h('div', { class: 'buckets n' + st.buckets.length });
    const lists = {};

    function place(item, el, bid) {
      if (item.bucket === bid) {
        el.classList.remove('sel'); el.classList.add('placed'); el.draggable = false;
        lists[bid].append(el);
        if (item.why) el.append(h('small', null, item.why));
        selected = null; remaining--;
        if (!remaining) {
          setFb(fb, 'ok', '<strong>¡Clasificado!</strong> ' + (errors ? `(${errors} fallos) ` : 'Sin ningún fallo. ') + (st.after ? rich(st.after) : ''));
          ctx.complete();
        } else setFb(fb, 'ok', `Bien. Quedan ${remaining}.`);
      } else {
        errors++; el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400);
        setFb(fb, 'bad', 'Ahí no. Relee la tarjeta y piensa en lo que has descubierto' + (errors > 3 ? ' (consejo: usa las pistas bajo el nombre de cada columna).' : '.'));
      }
    }
    items.forEach(it => {
      const el = h('div', { class: 'card-item', tabindex: 0, role: 'button', draggable: true, html: rich(it.text) });
      const pick = () => {
        if (el.classList.contains('placed')) return;
        pool.querySelectorAll('.sel').forEach(x => x.classList.remove('sel'));
        el.classList.add('sel'); selected = { it, el };
      };
      el.addEventListener('click', pick);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      el.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', String(it.i)); pick(); });
      pool.append(el);
      it._el = el;
    });
    st.buckets.forEach(b => {
      const list = h('div', { class: 'blist' });
      lists[b.id] = list;
      const col = h('div', { class: 'bucket', tabindex: 0, role: 'button', 'aria-label': 'Colocar en ' + b.label,
        onclick() { if (selected) place(selected.it, selected.el, b.id); else setFb(fb, 'info', 'Primero pulsa una tarjeta.'); },
        ondragover(e) { e.preventDefault(); col.classList.add('over'); },
        ondragleave() { col.classList.remove('over'); },
        ondrop(e) {
          e.preventDefault(); col.classList.remove('over');
          const it = items.find(x => String(x.i) === e.dataTransfer.getData('text/plain'));
          if (it && !it._el.classList.contains('placed')) place(it, it._el, b.id);
        },
        onkeydown(e) { if ((e.key === 'Enter') && selected) place(selected.it, selected.el, b.id); }
      }, h('h5', null, b.label), b.hint ? h('em', null, b.hint) : null, list);
      cols.append(col);
    });
    return h('div', null, R(st.prompt), pool, cols, fb);
  };

  /* — ordenar — */
  T.order = (st, ctx) => {
    const fb = feedback();
    let order = shuffle(st.items.map((it, i) => i));
    if (order.every((v, i) => v === i)) order.reverse();
    const ul = h('ol', { class: 'order' });
    let tries = 0;
    function draw(marks) {
      ul.innerHTML = '';
      order.forEach((idx, pos) => {
        const it = st.items[idx];
        const li = h('li', { class: marks ? (marks[pos] ? 'ok' : 'bad') : '' },
          h('span', { class: 'pos' }, pos + 1),
          h('span', { class: 'txt', html: rich(it.text) }),
          h('span', { class: 'mv' },
            h('button', { type: 'button', 'aria-label': 'Subir', disabled: pos === 0, onclick() { swap(pos, pos - 1); } }, '▲'),
            h('button', { type: 'button', 'aria-label': 'Bajar', disabled: pos === order.length - 1, onclick() { swap(pos, pos + 1); } }, '▼')));
        if (marks && !marks[pos] && tries >= 2 && it.clue) li.append(h('small', { class: 'clue', html: '💡 ' + rich(it.clue) }));
        ul.append(li);
      });
    }
    function swap(a, b) { [order[a], order[b]] = [order[b], order[a]]; draw(); fb.className = 'feedback'; }
    const check = h('button', { class: 'btn primary', type: 'button', onclick() {
      tries++;
      const marks = order.map((idx, pos) => idx === pos);
      draw(marks);
      if (marks.every(Boolean)) {
        setFb(fb, 'ok', '<strong>¡Orden correcto!</strong> ' + (st.after ? rich(st.after) : ''));
        check.disabled = true; ctx.complete();
      } else setFb(fb, 'bad', `Hay ${marks.filter(x => !x).length} fuera de sitio` + (tries >= 2 ? ' (mira las pistas en rojo).' : '. Revisa el orden.'));
    } }, 'Comprobar orden');
    draw();
    return h('div', null, R(st.prompt), ul, h('div', { class: 'row' }, check), fb);
  };

  /* — cartas que se giran — */
  T.cards = (st, ctx) => {
    let seen = 0;
    const fb = feedback();
    const grid = h('div', { class: 'flipgrid' });
    st.cards.forEach(c => {
      const el = h('button', { class: 'flip', type: 'button', onclick() {
        if (!el.classList.contains('turned')) { el.classList.add('turned'); seen++; if (seen === st.cards.length) { setFb(fb, 'ok', 'Has descubierto todas las cartas.'); ctx.complete(); } }
        else el.classList.toggle('turned');
      } },
      h('span', { class: 'face front' }, h('small', null, c.front), c.title ? h('b', null, c.title) : null, h('i', null, 'Pulsa para girar')),
      h('span', { class: 'face back', html: rich(c.back) }));
      grid.append(el);
    });
    return h('div', null, R(st.prompt), grid, fb);
  };

  /* — vídeo (carga bajo demanda, privacidad) + nota — */
  T.video = (st, ctx) => {
    const list = h('div', { class: 'videos' });
    st.videos.forEach(key => {
      const v = window.VIDEOS[key];
      const box = h('div', { class: 'video' });
      const play = h('button', { class: 'vthumb', type: 'button', 'aria-label': 'Reproducir: ' + v.title, onclick() {
        box.innerHTML = '';
        box.append(h('iframe', { src: `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`, title: v.title, allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture', allowfullscreen: true, loading: 'lazy' }));
      } }, h('img', { src: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, alt: '', loading: 'lazy' }), h('span', { class: 'playicon' }, '▶'));
      box.append(play, h('div', { class: 'vmeta' }, h('b', null, v.title),
        h('a', { href: `https://www.youtube.com/watch?v=${v.id}`, target: '_blank', rel: 'noopener' }, 'Abrir en YouTube ↗')));
      list.append(box);
    });
    const ta = h('textarea', { rows: 3, placeholder: 'Escribe aquí…', 'aria-label': 'Tu nota' });
    ta.value = Store.getNote(ctx.id);
    const go = h('button', { class: 'btn primary', type: 'button', disabled: ta.value.trim().length < 12, onclick() {
      Store.setNote(ctx.id, { station: ctx.station.title, title: st.title, prompt: st.ask.replace(/\*/g, '') }, ta.value.trim());
      go.disabled = true; ctx.complete(); toast('Anotado en tu cuaderno ✍️');
    } }, 'Guardar en mi cuaderno');
    ta.addEventListener('input', () => { go.disabled = ta.value.trim().length < 12; });
    return h('div', null, h('p', { class: 'small muted' }, 'Pulsa la miniatura para verlo aquí. Elige el que prefieras; no hace falta ver todos.'), list,
      R(st.ask), ta, h('div', { class: 'row' }, go));
  };

  /* — texto de lectura — */
  T.read = (st, ctx) => h('div', null, (st.body || []).map(p => R(p)),
    h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick(e) { e.target.disabled = true; ctx.complete(); } }, 'Continuar')));

  T.widget = (st, ctx) => {
    const fn = W[st.name];
    if (!fn) return h('p', null, 'Widget no disponible: ' + st.name);
    return fn(st, ctx);
  };

  window.Engine = { h, s, R, rich, shuffle, toast, Store, T, W, setFb, feedback, revealBox };
})();

/* ==========================================================================
   Mandarin Maverick – Präsentationssteuerung
   Gehört zu theme.css. Erwartet im Dokument:
     .mm-stage#mm-stage  mit .mm-slide-Kindern (jeweils mit data-title)
     .mm-chrome          mit .mm-ui#mm-ui und nav.mm-nav#mm-nav (leer)
     .mm-navtip#mm-navtip  leer, wird hier gefüllt
     .mm-laser#mm-laser  optional

   Bedienung: → / ← / Leertaste, Pos1 / Ende, I springt ins Inhalts-
   verzeichnis, L schaltet den roten Cursorpunkt ab bzw. wieder an.

   Taste R öffnet das Rednerfenster (rednerfenster.js).

   Die Rednernotizen (Taste N) stehen in rednernotizen.js; sie hängen sich
   selbst in die Folien ein und räumen selbst wieder auf.
   ========================================================================== */

(function () {
  const stage = document.getElementById('mm-stage');
  if (!stage) return;

  const nav    = document.getElementById('mm-nav');
  const navtip = document.getElementById('mm-navtip');
  const laser  = document.getElementById('mm-laser');
  const slides = [...stage.querySelectorAll('.mm-slide')];

  const RECHTE = '© 2026 Mandarin Maverick · Alle Rechte vorbehalten';
  const TOC_TITEL = 'Inhaltsverzeichnis';

  let index = 0;

  /* Die Folie bleibt 1920 × 1080 und wird als Ganzes eingepasst, damit alle
     Maße aus Kap. 6.1 unverändert in px gelten.

     Eingepasst wird nicht in das ganze Fenster, sondern in den Raum über der
     Bedienleiste: Deren Höhe wird gemessen und abgezogen. Sonst läge die
     Fußzeile jeder Folie — und bei hohen Bildern auch deren Unterkante —
     hinter den Schaltflächen. Die Folie wird dadurch um wenige Prozent
     kleiner; verdeckte Inhalte wären der größere Schaden. */
  const chrome = document.querySelector('.mm-chrome');
  const LUFT = 14;   /* px zwischen Folienunterkante und Leiste */

  function fit() {
    const leiste = chrome ? chrome.getBoundingClientRect().height + LUFT : 0;
    const hoehe  = Math.max(240, window.innerHeight - leiste);
    const scale  = Math.min(window.innerWidth / 1920, hoehe / 1080);
    stage.style.setProperty('--mm-scale', scale);
    stage.style.setProperty('--mm-buehne-mitte', `${Math.round(hoehe / 2)}px`);
  }

  /* ------------------------------------------------------------------ *
   * Rechtevermerk und Seitenzahl
   * ------------------------------------------------------------------ */

  /* Der Vermerk entsteht hier und nicht im Markup: So trägt ihn jede Folie,
     auch jede neu ergänzte, ohne dass er siebzigmal im Dokument steht. */
  slides.forEach(slide => {
    if (slide.querySelector('.mm-copyright')) return;
    const c = document.createElement('span');
    c.className = 'mm-copyright';
    c.textContent = RECHTE;
    slide.append(c);
  });

  /* Seitenzahl im Fuß: „Seite n von m“. Sie entsteht hier, damit sie beim
     Umstellen oder Ergänzen von Folien nicht von Hand nachgezogen werden
     muss. Die Titel- und die Abschlussfolie tragen keinen Fuß. */
  slides.forEach((slide, i) => {
    const footer = slide.querySelector('.mm-footer');
    if (!footer) return;
    let field = footer.querySelector('.mm-pageno');
    if (!field) {
      const spans = footer.querySelectorAll('span');
      field = spans[spans.length - 1];
      if (!field) {
        field = document.createElement('span');
        footer.append(field);
      }
      field.classList.add('mm-pageno');
    }
    field.textContent = `Seite ${i + 1} von ${slides.length}`;
  });

  /* ------------------------------------------------------------------ *
   * Punktleiste mit einer einzigen Textmarke
   * ------------------------------------------------------------------ */

  /* Früher hing der Folientitel als ::after am jeweiligen Punkt. An den
     äußeren Punkten ragte er dabei über den Fensterrand hinaus und war dort
     nicht mehr lesbar. Jetzt gibt es eine Marke für alle Punkte; sie wird
     über dem angefahrenen Punkt platziert und schlägt am Rand an. */
  function zeigeMarke(dot, i) {
    if (!navtip) return;
    navtip.innerHTML = '';
    const nr = document.createElement('span');
    nr.className = 'nr';
    nr.textContent = `Folie ${i + 1} von ${slides.length}`;
    navtip.append(document.createTextNode(dot.dataset.title), nr);
    navtip.classList.add('is-on');

    /* Erst einblenden, dann messen: vorher ist die Breite 0. */
    const rand = 12;
    const punkt = dot.getBoundingClientRect();
    const marke = navtip.getBoundingClientRect();

    let x = punkt.left + punkt.width / 2 - marke.width / 2;
    x = Math.max(rand, Math.min(x, window.innerWidth - marke.width - rand));

    /* Waagerecht über dem Punkt, senkrecht über der ganzen Bedienleiste:
       Läge die Marke nur über dem Punkt, verdeckte sie bei umbrechender
       Punktleiste die Steuerleiste darüber. */
    const chrome = dot.closest('.mm-chrome') || dot.parentElement;
    const oben = chrome.getBoundingClientRect().top;

    navtip.style.transform =
      `translate(${Math.round(x)}px, ${Math.round(oben - marke.height - 10)}px)`;
  }

  function versteckeMarke() {
    if (navtip) navtip.classList.remove('is-on');
  }

  const dots = slides.map((slide, i) => {
    if (!nav) return null;
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.dataset.title = slide.dataset.title || `Folie ${i + 1}`;
    dot.setAttribute('aria-label', dot.dataset.title);
    dot.addEventListener('click', () => show(i));
    dot.addEventListener('mouseenter', () => zeigeMarke(dot, i));
    dot.addEventListener('focus',      () => zeigeMarke(dot, i));
    dot.addEventListener('mouseleave', versteckeMarke);
    dot.addEventListener('blur',       versteckeMarke);
    nav.append(dot);
    return dot;
  });

  /* ------------------------------------------------------------------ *
   * Blättern
   * ------------------------------------------------------------------ */

  const prevBtn  = document.getElementById('mm-prev');
  const nextBtn  = document.getElementById('mm-next');
  const tocBtn   = document.getElementById('mm-toc');
  const countBox = document.getElementById('mm-count');

  const tocIndex = slides.findIndex(s => s.dataset.title === TOC_TITEL);

  function show(next) {
    index = Math.max(0, Math.min(slides.length - 1, next));
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      /* Verlassene Folie zurücksetzen, damit Aufdeckkarten, Lesekästen und
         die aufklappbaren Wegkarten beim erneuten Aufrufen wieder zu sind. */
      if (!active) {
        slide.querySelectorAll('.mm-reveal.is-open').forEach(r => setReveal(r, false));
        slide.querySelectorAll('.mm-lk').forEach(closeLk);
        slide.querySelectorAll('.mm-weg-karte.is-open').forEach(k => setWegKarte(k, false));
      }
    });
    dots.forEach((dot, i) => dot && dot.setAttribute('aria-current', String(i === index)));

    if (prevBtn)  prevBtn.disabled = index === 0;
    if (nextBtn)  nextBtn.disabled = index === slides.length - 1;
    if (countBox) countBox.textContent = `${index + 1} / ${slides.length}`;
    /* Auf dem Inhaltsverzeichnis selbst führt der Rücksprung nirgendwohin. */
    if (tocBtn)   tocBtn.disabled = index === tocIndex;

    location.hash = index === 0 ? '' : `#${index + 1}`;

    /* Für rednerfenster.js: Folienwechsel melden. */
    document.dispatchEvent(new CustomEvent('mm-folie', { detail: { index } }));
  }
  window.mmZeige = show;

  if (prevBtn) prevBtn.addEventListener('click', () => show(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(index + 1));
  if (tocBtn && tocIndex >= 0) tocBtn.addEventListener('click', () => show(tocIndex));
  if (tocBtn && tocIndex < 0)  tocBtn.hidden = true;

  /* Sprung auf eine Folie über ihren data-title. Das Inhaltsverzeichnis
     nennt das Ziel beim Namen und nicht bei der Nummer — so bleibt es
     richtig, wenn Folien dazukommen oder wegfallen. */
  function goto(titel) {
    const ziel = slides.findIndex(s => s.dataset.title === titel);
    if (ziel >= 0) show(ziel);
    else console.warn('Sprungziel nicht gefunden:', titel);
  }

  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => goto(el.dataset.goto));
  });

  /* ------------------------------------------------------------------ *
   * Aufdeckkarten (Click-to-Reveal)
   * ------------------------------------------------------------------ */

  function setReveal(el, open) {
    el.classList.toggle('is-open', open);
    el.setAttribute('aria-expanded', String(open));
  }

  /* Lösungen, die im PDF vollständig sein müssen, gehören laut Kap. 6.3 auf
     eine eigene Folie – diese Karten sind Gesprächsanlass im Vortrag. */
  document.querySelectorAll('.mm-reveal').forEach(el => {
    el.setAttribute('aria-expanded', 'false');
    el.addEventListener('click', () => setReveal(el, !el.classList.contains('is-open')));
  });

  /* ------------------------------------------------------------------ *
   * Lesekasten „zusätzliche Info“
   * ------------------------------------------------------------------ */

  /* Zwei Ebenen, zwei Schalter — beide öffnen und schließen auf demselben
     Weg: erster Klick auf, zweiter Klick zu. Ebene 1 zeigt sich zusätzlich
     beim Überfahren; ein Klick hält sie fest. */
  const HOVER_NACHLAUF = 260;   /* ms, siehe theme.css Abschnitt 8 */

  const MEHR_AUF = 'Klicke hier für vertiefende Informationen';
  const MEHR_ZU  = 'Vertiefende Informationen schließen';

  function closeLk(lk) {
    lk.classList.remove('is-open', 'is-hover', 'is-tief');
    const btn = lk.querySelector('.mm-lk-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    const mehr = lk.querySelector('.lk-mehr');
    if (mehr) {
      mehr.textContent = MEHR_AUF;
      mehr.setAttribute('aria-expanded', 'false');
    }
  }

  document.querySelectorAll('.mm-lk').forEach(lk => {
    const btn  = lk.querySelector('.mm-lk-btn');
    const pop  = lk.querySelector('.mm-lk-pop');
    const mehr = lk.querySelector('.lk-mehr');
    if (!btn || !pop) return;

    if (!pop.id) pop.id = `lk-pop-${Math.random().toString(36).slice(2, 8)}`;
    btn.setAttribute('aria-controls', pop.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.title = 'Erster Klick öffnet, zweiter Klick schließt';

    /* Bedienhinweis in den Kopf des Kastens — hier gesetzt, damit er in
       allen Kästen gleich lautet und keiner vergessen wird. */
    if (!pop.querySelector('.lk-hinweis')) {
      const hinweis = document.createElement('p');
      hinweis.className = 'lk-hinweis';
      hinweis.innerHTML = mehr
        ? '<b>1. Klick</b> auf „zusätzliche Info“ öffnet den Kasten, ' +
          '<b>2. Klick</b> schließt ihn wieder — ebenso die Vertiefung unten.'
        : '<b>1. Klick</b> auf „zusätzliche Info“ öffnet den Kasten, ' +
          '<b>2. Klick</b> schließt ihn wieder.';
      const h3 = pop.querySelector('h3');
      if (h3) h3.after(hinweis); else pop.prepend(hinweis);
    }

    function setOpen(open) {
      lk.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) lk.classList.add('is-hover');
      /* Schließt der Kasten, schließt auch die Vertiefung — sonst stünde
         sie beim nächsten Öffnen unvermittelt wieder offen da. */
      if (!open) setTief(false);
    }

    function setTief(open) {
      lk.classList.toggle('is-tief', open);
      if (mehr) {
        mehr.textContent = open ? MEHR_ZU : MEHR_AUF;
        mehr.setAttribute('aria-expanded', String(open));
      }
    }

    /* Die Schaltfläche oben rechts öffnet und schließt den Kasten ganz. */
    btn.addEventListener('click', () => setOpen(!lk.classList.contains('is-open')));

    /* Der Hinweis unten links öffnet und schließt die Vertiefung. */
    if (mehr) {
      mehr.setAttribute('aria-controls', pop.id);
      mehr.setAttribute('aria-expanded', 'false');
      mehr.title = 'Erster Klick öffnet, zweiter Klick schließt';
      mehr.addEventListener('click', (event) => {
        event.stopPropagation();
        const auf = !lk.classList.contains('is-tief');
        setTief(auf);
        /* Wer die Vertiefung aufschlägt, will lesen — der Kasten bleibt
           dann stehen, auch wenn der Cursor ihn verlässt. */
        if (auf) setOpen(true);
      });
    }

    /* Nachlauf: Der Kasten bleibt kurz stehen, wenn der Cursor ihn verlässt.
       Sonst fällt er beim Queren des Spalts zwischen Schaltfläche und Kasten
       zu, und der Hinweis unten links wäre nicht erreichbar. */
    let timer = null;
    lk.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      lk.classList.add('is-hover');
    });
    lk.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!lk.classList.contains('is-open')) lk.classList.remove('is-hover');
      }, HOVER_NACHLAUF);
    });

    /* Tastaturweg: Fokus zeigt Ebene 1 genau wie der Cursor. */
    lk.addEventListener('focusin',  () => lk.classList.add('is-hover'));
    lk.addEventListener('focusout', () => {
      if (!lk.classList.contains('is-open')) lk.classList.remove('is-hover');
    });

    const title = lk.closest('.mm-slide').querySelector('.mm-slide-title');
    if (title) {
      title.classList.add('has-lk');
      title.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        lk.classList.add('is-hover');
      });
      title.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (!lk.classList.contains('is-open')) lk.classList.remove('is-hover');
        }, HOVER_NACHLAUF);
      });
      /* Der Titel ist auch ein Schalter: Klick hält den Kasten fest. */
      title.addEventListener('click', () => {
        setOpen(!lk.classList.contains('is-open'));
      });
    }
  });

  /* ------------------------------------------------------------------ *
   * Großbild — kleine Bilder beim Überfahren groß zeigen
   * ------------------------------------------------------------------ */

  /* Eine Tafel je Folie, die beim Überfahren einer .mm-zoom-Figur dieselbe
     Abbildung groß in der Mitte der Inhaltszone zeigt. Die Tafel liegt in
     der Folie, damit sie mitskaliert, und nimmt keine Zeigerereignisse an —
     sonst verlöre die kleine Figur den Cursor und die Lupe flackerte. */
  document.querySelectorAll('.mm-zoom').forEach(figur => {
    const bild = figur.querySelector('img');
    if (!bild) return;

    const folie = figur.closest('.mm-slide');
    let tafel = folie.querySelector(':scope > .mm-grossbild');
    if (!tafel) {
      tafel = document.createElement('figure');
      tafel.className = 'mm-grossbild';
      tafel.setAttribute('aria-hidden', 'true');
      tafel.append(document.createElement('img'), document.createElement('figcaption'));
      folie.append(tafel);
    }

    figur.addEventListener('mouseenter', () => {
      const gross = tafel.querySelector('img');
      gross.src = bild.currentSrc || bild.src;
      gross.alt = bild.alt || '';
      /* Unterschrift: in Figuren <figcaption>, in den Wegkarten .bu — dort
         ist <figcaption> im Inneren einer Schaltfläche nicht erlaubt. */
      const text = figur.querySelector('figcaption, .bu');
      tafel.querySelector('figcaption').innerHTML = text ? text.innerHTML : '';
      tafel.classList.add('is-on');
    });

    figur.addEventListener('mouseleave', () => tafel.classList.remove('is-on'));
  });

  /* ------------------------------------------------------------------ *
   * Zeitleiste — eine Marke, eine Karte
   * ------------------------------------------------------------------ */

  document.querySelectorAll('.mm-tl').forEach(tl => {
    const marks = [...tl.querySelectorAll('.mm-tl-mark')];
    const cards = [...tl.querySelectorAll('.mm-tl-card')];
    if (!marks.length) return;

    function waehle(id) {
      marks.forEach(m => {
        const an = m.dataset.tl === id;
        m.classList.toggle('is-on', an);
        m.setAttribute('aria-pressed', String(an));
      });
      cards.forEach(c => c.classList.toggle('is-on', c.id === id));
    }

    marks.forEach(m => {
      m.type = 'button';
      m.addEventListener('click', () => waehle(m.dataset.tl));
      /* Beim Überfahren schon zeigen: Im Vortrag zählt jeder Klick weniger. */
      m.addEventListener('mouseenter', () => waehle(m.dataset.tl));
    });

    waehle(marks[0].dataset.tl);
  });

  /* ------------------------------------------------------------------ *
   * Kategorienweg — Karten klappen auf und wieder zu
   * ------------------------------------------------------------------ */

  function setWegKarte(karte, open) {
    karte.classList.toggle('is-open', open);
    karte.setAttribute('aria-expanded', String(open));
  }

  document.querySelectorAll('.mm-weg').forEach(weg => {
    const karten = [...weg.querySelectorAll('.mm-weg-karte')];
    karten.forEach(karte => {
      karte.setAttribute('aria-expanded', 'false');
      karte.addEventListener('click', () => {
        const auf = !karte.classList.contains('is-open');
        /* Immer nur eine Karte offen — zwei überlagern einander sonst. */
        karten.forEach(k => setWegKarte(k, false));
        setWegKarte(karte, auf);
      });
    });
  });

  /* ------------------------------------------------------------------ *
   * Dokument öffnen und drucken
   * ------------------------------------------------------------------ */

  /* Das Dokument wird in einem eigenen Fenster geöffnet; sobald es steht,
     wird der Druckdialog gerufen. Bei PDF-Dateien überlassen manche Browser
     das Drucken ihrem eigenen Betrachter und lassen den Aufruf ins Leere
     laufen — deshalb steht auf den Schaltflächen der Hinweis auf ⌘ P. */
  document.querySelectorAll('[data-print]').forEach(el => {
    el.addEventListener('click', () => {
      /* Ohne „noopener“, denn sonst gäbe window.open null zurück und der
         Druckaufruf hätte kein Fenster. Das Ziel ist eine eigene Datei. */
      const fenster = window.open(el.dataset.print, '_blank');
      if (!fenster) return;
      fenster.addEventListener('load', () => {
        try { fenster.focus(); fenster.print(); } catch (fehler) { /* Betrachter druckt selbst */ }
      });
    });
  });

  /* ------------------------------------------------------------------ *
   * Tastatur
   * ------------------------------------------------------------------ */

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.mm-lk').forEach(closeLk);
      document.querySelectorAll('.mm-weg-karte.is-open')
              .forEach(k => setWegKarte(k, false));
      return;
    }
    if (event.target instanceof Element &&
        event.target.closest('.mm-reveal, .mm-lk, .mm-weg-karte, .mm-tl-mark') &&
        (event.key === ' ' || event.key === 'Enter')) return;

    switch (event.key) {
      case 'ArrowRight': case ' ': case 'PageDown': show(index + 1); break;
      case 'ArrowLeft':  case 'PageUp':            show(index - 1); break;
      case 'Home':                                 show(0); break;
      case 'End':                                  show(slides.length - 1); break;
      case 'i': case 'I':
        if (tocIndex >= 0) show(tocIndex);
        break;
      case 'l': case 'L':
        /* Punkt aus, Systemzeiger an — und zurück. */
        document.body.classList.toggle('laser-off');
        break;
      default: return;
    }
    event.preventDefault();
  });

  /* ------------------------------------------------------------------ *
   * Cursorpunkt
   * ------------------------------------------------------------------ */

  /* Der Cursorpunkt folgt der Maus. Über klickbaren Flächen wird er zum
     Ring, weil der Systemzeiger verborgen ist und sonst nichts mehr anzeigt,
     dass sich dort etwas anklicken lässt. */
  if (laser) {
    const KLICKBAR = 'button, a, .mm-reveal, .mm-lk-btn, .lk-mehr, .mm-nav button, ' +
                     '.mm-ui button, .mm-toc-item, .mm-tl-mark, .mm-weg-karte, ' +
                     '.mm-action, .mm-rn-btn, .mm-slide-title.has-lk';

    document.addEventListener('pointermove', (event) => {
      laser.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      const ziel = event.target;
      const heiss = ziel instanceof Element && ziel.closest(KLICKBAR) !== null;
      laser.classList.toggle('is-hot', heiss);
    });
  }

  window.addEventListener('resize', fit);

  /* Die Punktleiste bricht bei schmalem Fenster um und wird dabei höher.
     Dann muss die Bühne neu eingepasst werden, sonst geriete die Folie doch
     wieder unter die Leiste. */
  if (chrome && 'ResizeObserver' in window) {
    new ResizeObserver(fit).observe(chrome);
  }

  fit();

  const start = parseInt(location.hash.slice(1), 10);
  show(Number.isFinite(start) ? start - 1 : 0);
})();

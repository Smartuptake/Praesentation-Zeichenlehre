/* ==========================================================================
   Mandarin Maverick – Quiz-Maschine
   Gehört zu quiz.css. Jede Quizseite legt vor dem Einbinden dieser Datei ein
   Objekt QUIZ an:

     const QUIZ = {
       titel:       'Quiz 1 · Die Folien',
       untertitel:  'Fragt ab, was auf den Folien selbst steht.',
       stufe:       1,                      // 1 bis 3, für die Punktanzeige
       fragen: [ … ]
     };

   FRAGETYPEN

     mc          Mehrfachauswahl
                 { typ:'mc', frage, optionen:[…], richtig:[0,2], erklaerung }
                 Mehrere Indizes in „richtig“ ergeben eine Mehrfachantwort;
                 die Maschine schaltet dann selbsttätig auf Kästchen um.

     rf          Richtig oder falsch
                 { typ:'rf', frage, richtig:true, erklaerung }

     luecke      Lückentext. Im Satz steht ___ für die Lücke.
                 { typ:'luecke', satz:'… ___ …', loesung:['a','b'], erklaerung }
                 Verglichen wird nachsichtig: Groß- und Kleinschreibung,
                 Leerzeichen und Ton­zeichen des Pinyin bleiben außer Betracht.

     reihenfolge Elemente in die richtige Ordnung bringen. „elemente“ steht
                 bereits richtig; die Maschine mischt für die Anzeige.
                 { typ:'reihenfolge', frage, elemente:[…], erklaerung }

     zuordnung   Karten – mit oder ohne Bild – auf Felder ziehen.
                 { typ:'zuordnung', frage, ziele:[…],
                   karten:[{ bild, alt, text, ziel }], erklaerung }

   Alles ist auch ohne Ziehen bedienbar: Die Reihenfolge lässt sich über die
   Pfeilschaltflächen ändern, die Zuordnung über Antippen der Karte und
   anschließendes Antippen des Feldes.
   ========================================================================== */

(function () {
  /* Die Quizdateien legen QUIZ mit „const“ an. Eine solche Bindung hängt
     nicht am window-Objekt, ist aber als freie Variable erreichbar — daher
     die Abfrage über typeof statt über window.QUIZ. */
  const daten = typeof QUIZ !== 'undefined' ? QUIZ
              : (typeof window.QUIZ !== 'undefined' ? window.QUIZ : null);
  if (!daten) { console.error('Kein QUIZ-Objekt gefunden.'); return; }

  const ARTNAME = {
    mc:          'Mehrfachauswahl',
    rf:          'Richtig oder falsch',
    luecke:      'Lückentext',
    reihenfolge: 'Reihenfolge',
    zuordnung:   'Zuordnung'
  };

  const haupt = document.getElementById('q-fragen');
  const zustand = [];          /* je Frage: { frage, knoten, lies(), pruefe() } */
  let ausgewertet = false;

  /* ------------------------------------------------------------------ *
   * Hilfsmittel
   * ------------------------------------------------------------------ */

  function el(tag, klasse, text) {
    const k = document.createElement(tag);
    if (klasse) k.className = klasse;
    if (text !== undefined) k.textContent = text;
    return k;
  }

  /* Die Fragetexte enthalten Hanzi und Pinyin in eigenen Elementen; sie
     kommen als fertiges Markup aus den Quizdateien und werden deshalb als
     HTML eingesetzt. Fremde Eingaben laufen hier nicht durch. */
  function html(tag, klasse, markup) {
    const k = document.createElement(tag);
    if (klasse) k.className = klasse;
    if (markup !== undefined) k.innerHTML = markup;
    return k;
  }

  function mischen(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* Beim Lückentext soll nicht die Rechtschreibung des Pinyin über Recht und
     Unrecht entscheiden: Tonzeichen, Groß- und Kleinschreibung sowie
     doppelte Leerzeichen bleiben unberücksichtigt. */
  function normal(text) {
    return String(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')   /* Tonzeichen des Pinyin */
      .toLowerCase()
      .replace(/[„“"'’.,;:!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ------------------------------------------------------------------ *
   * Fragetypen
   * ------------------------------------------------------------------ */

  function baueMc(frage, karte, nr) {
    const mehrfach = frage.richtig.length > 1;
    if (mehrfach) {
      karte.append(el('p', 'q-hinweis', 'Mehrere Antworten sind richtig.'));
    }

    const box = el('div', 'q-optionen');
    /* Die Reihenfolge bleibt, wie sie in der Quizdatei steht: Bei manchen
       Fragen bauen die Antworten aufeinander auf. */
    const felder = frage.optionen.map((text, i) => {
      const label = el('label', 'q-option');
      const eingabe = document.createElement('input');
      eingabe.type = mehrfach ? 'checkbox' : 'radio';
      eingabe.name = `f${nr}`;
      eingabe.value = String(i);
      const beschriftung = html('span', null, text);
      label.append(eingabe, beschriftung);
      eingabe.addEventListener('change', () => {
        box.querySelectorAll('.q-option').forEach(o =>
          o.classList.toggle('gewaehlt', o.querySelector('input').checked));
      });
      box.append(label);
      return { label, eingabe };
    });
    karte.append(box);

    return {
      beantwortet: () => felder.some(f => f.eingabe.checked),
      pruefe() {
        const gewaehlt = felder
          .map((f, i) => (f.eingabe.checked ? i : -1))
          .filter(i => i >= 0);
        const soll = frage.richtig.slice().sort();
        const ist  = gewaehlt.slice().sort();

        felder.forEach((f, i) => {
          f.eingabe.disabled = true;
          if (frage.richtig.includes(i)) f.label.classList.add('loesung');
          else if (f.eingabe.checked)    f.label.classList.add('daneben');
        });

        return ist.length === soll.length && ist.every((v, i) => v === soll[i]);
      }
    };
  }

  function baueRf(frage, karte, nr) {
    const box = el('div', 'q-rf');
    const felder = [true, false].map(wert => {
      const label = el('label', 'q-option');
      const eingabe = document.createElement('input');
      eingabe.type = 'radio';
      eingabe.name = `f${nr}`;
      eingabe.value = String(wert);
      label.append(eingabe, el('span', null, wert ? 'Richtig' : 'Falsch'));
      eingabe.addEventListener('change', () => {
        box.querySelectorAll('.q-option').forEach(o =>
          o.classList.toggle('gewaehlt', o.querySelector('input').checked));
      });
      box.append(label);
      return { label, eingabe, wert };
    });
    karte.append(box);

    return {
      beantwortet: () => felder.some(f => f.eingabe.checked),
      pruefe() {
        const gewaehlt = felder.find(f => f.eingabe.checked);
        felder.forEach(f => {
          f.eingabe.disabled = true;
          if (f.wert === frage.richtig)   f.label.classList.add('loesung');
          else if (f.eingabe.checked)     f.label.classList.add('daneben');
        });
        return !!gewaehlt && gewaehlt.wert === frage.richtig;
      }
    };
  }

  function baueLuecke(frage, karte) {
    const satz = el('p', 'q-luecke-satz');
    const teile = frage.satz.split('___');
    const eingabe = document.createElement('input');
    eingabe.type = 'text';
    eingabe.autocomplete = 'off';
    eingabe.spellcheck = false;
    eingabe.setAttribute('aria-label', 'Lücke ausfüllen');

    satz.append(html('span', null, teile[0]), eingabe,
                html('span', null, teile[1] || ''));
    karte.append(satz);

    return {
      beantwortet: () => eingabe.value.trim() !== '',
      pruefe() {
        eingabe.disabled = true;
        const gegeben = normal(eingabe.value);
        return gegeben !== '' && frage.loesung.some(l => normal(l) === gegeben);
      },
      loesungstext: () => frage.loesung[0]
    };
  }

  function baueReihenfolge(frage, karte) {
    karte.append(el('p', 'q-hinweis',
      'Ziehen oder die Pfeile benutzen — oben steht das Früheste.'));

    const liste = el('div', 'q-reihe');
    let gezogen = null;

    function neuNummerieren() {
      [...liste.children].forEach((zeile, i) => {
        zeile.querySelector('.platz').textContent = `${i + 1}.`;
        const [hoch, runter] = zeile.querySelectorAll('.schub button');
        hoch.disabled   = i === 0;
        runter.disabled = i === liste.children.length - 1;
      });
    }

    /* Gemischt anzeigen — aber nie zufällig schon richtig. */
    let reihenfolge = mischen(frage.elemente);
    let versuche = 0;
    while (versuche++ < 20 &&
           reihenfolge.every((v, i) => v === frage.elemente[i])) {
      reihenfolge = mischen(frage.elemente);
    }

    reihenfolge.forEach(text => {
      const zeile = el('div', 'q-reihe-zeile');
      zeile.draggable = true;
      zeile.append(el('span', 'griff', '⠿'), el('span', 'platz'),
                   html('span', 'inhalt', text));

      const schub = el('div', 'schub');
      const hoch   = el('button', null, '▲');
      const runter = el('button', null, '▼');
      hoch.type = runter.type = 'button';
      hoch.setAttribute('aria-label', 'nach oben');
      runter.setAttribute('aria-label', 'nach unten');
      hoch.addEventListener('click', () => {
        if (ausgewertet) return;
        const vor = zeile.previousElementSibling;
        if (vor) { liste.insertBefore(zeile, vor); neuNummerieren(); }
      });
      runter.addEventListener('click', () => {
        if (ausgewertet) return;
        const nach = zeile.nextElementSibling;
        if (nach) { liste.insertBefore(nach, zeile); neuNummerieren(); }
      });
      schub.append(hoch, runter);
      zeile.append(schub);

      zeile.addEventListener('dragstart', ereignis => {
        if (ausgewertet) { ereignis.preventDefault(); return; }
        gezogen = zeile;
        zeile.classList.add('zieht');
        ereignis.dataTransfer.effectAllowed = 'move';
        /* Ohne Nutzlast bricht Firefox das Ziehen ab. */
        ereignis.dataTransfer.setData('text/plain', '');
      });
      zeile.addEventListener('dragend', () => {
        gezogen = null;
        zeile.classList.remove('zieht');
        liste.querySelectorAll('.ueber').forEach(z => z.classList.remove('ueber'));
        neuNummerieren();
      });
      zeile.addEventListener('dragover', ereignis => {
        if (!gezogen || gezogen === zeile) return;
        ereignis.preventDefault();
        zeile.classList.add('ueber');
      });
      zeile.addEventListener('dragleave', () => zeile.classList.remove('ueber'));
      zeile.addEventListener('drop', ereignis => {
        if (!gezogen || gezogen === zeile) return;
        ereignis.preventDefault();
        zeile.classList.remove('ueber');
        /* Vor oder hinter die Zeile, je nachdem, aus welcher Richtung
           gezogen wurde. */
        const nachUnten = gezogen.compareDocumentPosition(zeile) &
                          Node.DOCUMENT_POSITION_FOLLOWING;
        liste.insertBefore(gezogen, nachUnten ? zeile.nextSibling : zeile);
        neuNummerieren();
      });

      liste.append(zeile);
    });

    neuNummerieren();
    karte.append(liste);

    return {
      beantwortet: () => true,
      pruefe() {
        const ist = [...liste.children].map(z =>
          z.querySelector('.inhalt').innerHTML);
        liste.querySelectorAll('[draggable]').forEach(z => { z.draggable = false; });
        liste.querySelectorAll('.schub button').forEach(b => { b.disabled = true; });
        return ist.every((v, i) => v === frage.elemente[i]);
      },
      loesungstext: () => frage.elemente
        .map((t, i) => `${i + 1}. ${t.replace(/<[^>]+>/g, '')}`).join(' · ')
    };
  }

  function baueZuordnung(frage, karte) {
    karte.append(el('p', 'q-hinweis',
      'Karte auf das passende Feld ziehen — oder Karte antippen und dann das Feld.'));

    const vorrat = el('div', 'q-vorrat');
    const ziele  = el('div', 'q-ziele');
    let gewaehlteKarte = null;

    function karteAblegen(chip, behaelter) {
      if (ausgewertet) return;
      behaelter.append(chip);
      chip.classList.remove('gewaehlt');
      gewaehlteKarte = null;
    }

    mischen(frage.karten).forEach((k, i) => {
      const chip = el('div', 'q-chip');
      chip.draggable = true;
      chip.dataset.ziel = k.ziel;
      chip.dataset.nr = String(i);
      if (k.bild) {
        const bild = document.createElement('img');
        bild.src = k.bild;
        bild.alt = k.alt || '';
        chip.append(bild);
      }
      chip.append(html('span', null, k.text || k.alt || ''));

      chip.addEventListener('dragstart', ereignis => {
        if (ausgewertet) { ereignis.preventDefault(); return; }
        ereignis.dataTransfer.effectAllowed = 'move';
        ereignis.dataTransfer.setData('text/plain', chip.dataset.nr);
        chip.classList.add('zieht');
      });
      chip.addEventListener('dragend', () => chip.classList.remove('zieht'));

      /* Antippen statt ziehen — für Tablet und Zeigefinger. */
      chip.addEventListener('click', () => {
        if (ausgewertet) return;
        if (gewaehlteKarte === chip) {
          chip.classList.remove('gewaehlt');
          gewaehlteKarte = null;
          return;
        }
        if (gewaehlteKarte) gewaehlteKarte.classList.remove('gewaehlt');
        gewaehlteKarte = chip;
        chip.classList.add('gewaehlt');
      });

      vorrat.append(chip);
    });

    const felder = frage.ziele.map(name => {
      const feld = el('div', 'q-ziel');
      feld.dataset.name = name.replace(/<[^>]+>/g, '').trim();
      feld.append(html('span', 'marke', name));

      feld.addEventListener('dragover', ereignis => {
        if (ausgewertet) return;
        ereignis.preventDefault();
        feld.classList.add('ueber');
      });
      feld.addEventListener('dragleave', () => feld.classList.remove('ueber'));
      feld.addEventListener('drop', ereignis => {
        ereignis.preventDefault();
        feld.classList.remove('ueber');
        const nr = ereignis.dataTransfer.getData('text/plain');
        const chip = karte.querySelector(`.q-chip[data-nr="${nr}"]`);
        if (chip) karteAblegen(chip, feld);
      });
      feld.addEventListener('click', () => {
        if (gewaehlteKarte) karteAblegen(gewaehlteKarte, feld);
      });

      ziele.append(feld);
      return feld;
    });

    /* Zurück in den Vorrat ziehen. */
    vorrat.addEventListener('dragover', ereignis => {
      if (ausgewertet) return;
      ereignis.preventDefault();
    });
    vorrat.addEventListener('drop', ereignis => {
      ereignis.preventDefault();
      const nr = ereignis.dataTransfer.getData('text/plain');
      const chip = karte.querySelector(`.q-chip[data-nr="${nr}"]`);
      if (chip) karteAblegen(chip, vorrat);
    });
    vorrat.addEventListener('click', ereignis => {
      if (gewaehlteKarte && ereignis.target === vorrat) {
        karteAblegen(gewaehlteKarte, vorrat);
      }
    });

    karte.append(vorrat, ziele);

    return {
      beantwortet: () => vorrat.querySelectorAll('.q-chip').length === 0,
      pruefe() {
        karte.querySelectorAll('.q-chip').forEach(c => { c.draggable = false; });
        return felder.every(feld => {
          const drin = [...feld.querySelectorAll('.q-chip')];
          return drin.length === 1 && drin[0].dataset.ziel === feld.dataset.name;
        }) && vorrat.querySelectorAll('.q-chip').length === 0;
      },
      loesungstext: () => frage.karten
        .map(k => `${(k.text || k.alt || '').replace(/<[^>]+>/g, '')} → ${k.ziel}`)
        .join(' · ')
    };
  }

  const BAUER = {
    mc: baueMc,
    rf: baueRf,
    luecke: baueLuecke,
    reihenfolge: baueReihenfolge,
    zuordnung: baueZuordnung
  };

  /* ------------------------------------------------------------------ *
   * Aufbau der Seite
   * ------------------------------------------------------------------ */

  document.title = `${daten.titel} · Mandarin Maverick`;
  const kopfTitel = document.getElementById('q-titel');
  const kopfText  = document.getElementById('q-untertitel');
  const kopfStufe = document.getElementById('q-stufe');
  if (kopfTitel) kopfTitel.textContent = daten.titel;
  if (kopfText)  kopfText.textContent  = daten.untertitel || '';
  if (kopfStufe) {
    for (let i = 1; i <= 3; i++) {
      kopfStufe.append(el('i', i <= daten.stufe ? 'voll' : null));
    }
    kopfStufe.append(el('span', null,
      ['leicht', 'mittel', 'schwer'][daten.stufe - 1] || ''));
  }

  daten.fragen.forEach((frage, nr) => {
    const karte = el('section', 'q-frage');
    karte.id = `frage-${nr + 1}`;

    const kopfzeile = el('div', 'q-kopfzeile');
    kopfzeile.append(el('span', 'q-nr', `Frage ${nr + 1} von ${daten.fragen.length}`),
                     el('span', 'q-art', ARTNAME[frage.typ] || frage.typ));
    karte.append(kopfzeile);

    /* Beim Lückentext trägt der Satz selbst die Frage. */
    if (frage.typ !== 'luecke' || frage.frage) {
      karte.append(html('p', 'q-text', frage.frage || 'Fülle die Lücke.'));
    }

    const bauer = BAUER[frage.typ];
    if (!bauer) { console.warn('Unbekannter Fragetyp:', frage.typ); return; }
    const teil = bauer(frage, karte, nr);

    haupt.append(karte);
    zustand.push({ frage, karte, teil });
  });

  /* ------------------------------------------------------------------ *
   * Auswerten
   * ------------------------------------------------------------------ */

  const knopfAus  = document.getElementById('q-auswerten');
  const knopfNeu  = document.getElementById('q-neu');
  const ergebnis  = document.getElementById('q-ergebnis');
  const balken    = document.getElementById('q-balken');
  const offen     = document.getElementById('q-offen');

  function zaehleOffen() {
    if (!offen || ausgewertet) return;
    const n = zustand.filter(z => !z.teil.beantwortet()).length;
    offen.textContent = n === 0
      ? 'Alle Fragen bearbeitet.'
      : `Noch ${n} von ${zustand.length} offen.`;
  }

  haupt.addEventListener('change', zaehleOffen);
  haupt.addEventListener('input',  zaehleOffen);
  haupt.addEventListener('click',  () => setTimeout(zaehleOffen, 0));
  zaehleOffen();

  function auswerten() {
    if (ausgewertet) return;
    ausgewertet = true;

    let treffer = 0;
    zustand.forEach(z => {
      const richtig = z.teil.pruefe();
      if (richtig) treffer++;
      z.karte.classList.add(richtig ? 'richtig' : 'falsch');

      const urteil = el('div', 'q-urteil');
      urteil.append(el('span', 'zeichen', richtig ? '✓' : '✕'));

      let text = z.frage.erklaerung || '';
      if (!richtig && z.teil.loesungstext) {
        text = `<strong>Richtig wäre:</strong> ${z.teil.loesungstext()}. ${text}`;
      }
      urteil.append(html('span', 'text', text));
      z.karte.append(urteil);
    });

    const anteil = Math.round((treffer / zustand.length) * 100);
    if (ergebnis) {
      ergebnis.innerHTML =
        `<span class="zahl">${treffer} von ${zustand.length}</span> richtig — ${anteil} %` +
        (anteil === 100 ? ' · <span class="strong">alles getroffen</span>'
         : anteil >= 70 ? ' · gut'
         : anteil >= 40 ? ' · noch etwas nachlesen'
                        : ' · die Folien noch einmal durchgehen');
    }
    if (balken) balken.firstElementChild.style.width = `${anteil}%`;
    if (offen)  offen.textContent = '';
    if (knopfAus) knopfAus.hidden = true;
    if (knopfNeu) knopfNeu.hidden = false;

    const ersteFalsche = zustand.find(z => z.karte.classList.contains('falsch'));
    if (ersteFalsche) ersteFalsche.karte.scrollIntoView({ block: 'center' });
  }

  if (knopfAus) knopfAus.addEventListener('click', auswerten);
  if (knopfNeu) knopfNeu.addEventListener('click', () => location.reload());
})();

/* ==========================================================================
   Mandarin Maverick – Rednerfenster (Referentenansicht)
   Gehört zu deck.js, rednernotizen.js und theme.css (Abschnitt 14).

   Taste R oder die Schaltfläche „Rednerfenster“ öffnet dieselbe Präsentation
   ein zweites Mal, mit „?redner“ in der Adresse. Dieses Fenster zeigt
   aktuelle Folie, nächste Folie, Rednernotizen, Uhrzeit und Stoppuhr.

   GEBRAUCH MIT BEAMER
     Beamer als „erweiterten Schreibtisch“ einstellen (nicht spiegeln).
     Präsentation im Vollbild auf den Beamer, Rednerfenster auf den Laptop.
     Geblättert werden kann in beiden Fenstern, das andere zieht mit.
     Solange das Rednerfenster offen ist, verschwindet der Knopf
     „Rednernotizen“ von den Beamerfolien.

   Abgleich über postMessage zwischen Hauptfenster und Rednerfenster. Das
   geht auch bei Dateien direkt vom Drive (file://), anders als
   BroadcastChannel. Beide Fenster müssen auf demselben Rechner laufen.
   ========================================================================== */

(function () {
const stage = document.getElementById('mm-stage');
if (!stage) return;

const slides = [...stage.querySelectorAll('.mm-slide')];
const istRedner = new URLSearchParams(location.search).has('redner');
const aktuell = () => slides.findIndex(s => s.classList.contains('is-active'));

let partner = null;            /* im Hauptfenster: das Rednerfenster */
let vonAussen = false;         /* Wechsel kam vom anderen Fenster */

function ziel() {
  const w = istRedner ? window.opener : partner;
  return w && !w.closed ? w : null;
}

function sende(nachricht) {
  const w = ziel();
  if (w) w.postMessage(Object.assign({ mm: 'rf' }, nachricht), '*');
}

window.addEventListener('message', (event) => {
  const d = event.data;
  if (!d || d.mm !== 'rf') return;
  if (!istRedner && event.source) {
    partner = event.source;
    document.body.classList.add('mm-rf-verbunden');
  }
  if (typeof d.nr === 'number' && d.nr !== aktuell() && window.mmZeige) {
    /* Fremden Wechsel nicht zurückmelden — sonst schaukeln sich beide
       Fenster beim schnellen Blättern gegenseitig auf. */
    vonAussen = true;
    try { window.mmZeige(d.nr); } finally { vonAussen = false; }
  }
});

document.addEventListener('mm-folie', (event) => {
  if (!vonAussen) sende({ nr: event.detail.index });
  if (istRedner) zeichne(event.detail.index);
});

/* ------------------------------------------------------------------ *
 * Hauptfenster: öffnen und Verbindung halten
 * ------------------------------------------------------------------ */
if (!istRedner) {
  function oeffne() {
    const basis = location.href.split('#')[0].split('?')[0];
    const w = window.open(`${basis}?redner#${aktuell() + 1}`, 'mm-rednerfenster',
                          'width=1440,height=880');
    if (w) {
      partner = w;
      document.body.classList.add('mm-rf-verbunden');
      w.focus();
    }
  }

  const ui = document.getElementById('mm-ui');
  if (ui) {
    const knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.className = 'mm-ui-btn mm-rf-oeffnen';
    knopf.textContent = 'Rednerfenster';
    knopf.title = 'Öffnet die Referentenansicht in einem eigenen Fenster (Taste R)';
    knopf.addEventListener('click', oeffne);
    ui.append(knopf);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'r' && event.key !== 'R') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;   /* ⌘R = neu laden */
    oeffne();
    event.preventDefault();
  });

  /* Geschlossenes Rednerfenster bemerken: Notizknopf kommt zurück. */
  setInterval(() => {
    if (partner && partner.closed) {
      partner = null;
      document.body.classList.remove('mm-rf-verbunden');
    }
  }, 1500);
  return;
}

/* ------------------------------------------------------------------ *
 * Rednerfenster
 * ------------------------------------------------------------------ */
document.body.classList.add('mm-rf', 'laser-off');
document.title = 'Rednerfenster – ' + document.title;

const rf = document.createElement('div');
rf.className = 'rf';
rf.innerHTML = `
  <header class="rf-kopf">
    <span class="rf-nr"></span>
    <span class="rf-titel"></span>
    <span class="rf-uhr" title="Uhrzeit"></span>
    <span class="rf-zeit" title="Stoppuhr seit dem Öffnen">0:00</span>
    <button type="button" class="rf-btn rf-neu" title="Stoppuhr auf 0 setzen">Stoppuhr ↺</button>
  </header>
  <section class="rf-links">
    <div class="rf-label">Jetzt auf dem Beamer</div>
    <div class="rf-bild rf-jetzt"></div>
    <div class="rf-steuer">
      <button type="button" class="rf-btn rf-zurueck">◀ zurück</button>
      <button type="button" class="rf-btn rf-weiter">weiter ▶</button>
      <span class="rf-hinweis">Pfeiltasten blättern · Aufdeckkarten und Lesekästen im Beamerfenster bedienen</span>
    </div>
  </section>
  <section class="rf-rechts">
    <div class="rf-label">Nächste Folie</div>
    <div class="rf-bild rf-naechste"></div>
    <div class="rf-label rf-label-notiz">Rednernotizen
      <span class="rf-groesse">
        <button type="button" class="rf-btn rf-klein" title="Schrift kleiner (−)">A−</button>
        <button type="button" class="rf-btn rf-gross" title="Schrift größer (+)">A+</button>
      </span>
    </div>
    <div class="rf-notizen"></div>
  </section>`;
document.body.append(rf);

const $ = sel => rf.querySelector(sel);

function bild(box, i) {
  box.innerHTML = '';
  if (i < 0 || i >= slides.length) {
    box.classList.add('is-leer');
    box.textContent = 'Ende der Präsentation';
    return;
  }
  box.classList.remove('is-leer');
  const innen = document.createElement('div');
  innen.className = 'rf-innen';
  const kopie = slides[i].cloneNode(true);
  kopie.classList.add('is-active');
  kopie.removeAttribute('id');
  kopie.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  innen.append(kopie);
  box.append(innen);
  innen.style.transform = `scale(${box.clientWidth / 1920})`;
}

function zeichne(i) {
  if (i < 0) return;
  const folie = slides[i];
  $('.rf-nr').textContent = `Folie ${i + 1} von ${slides.length}`;
  $('.rf-titel').textContent = folie.dataset.title || '';
  bild($('.rf-jetzt'), i);
  bild($('.rf-naechste'), i + 1);
  const pop = folie.querySelector('.mm-rn-pop');
  const notizen = $('.rf-notizen');
  notizen.innerHTML = '';
  if (pop) {
    const liste = pop.querySelector('ul, .rn-leer');
    if (liste) notizen.append(liste.cloneNode(true));
  }
  notizen.scrollTop = 0;
  $('.rf-zurueck').disabled = i === 0;
  $('.rf-weiter').disabled = i === slides.length - 1;
}

$('.rf-zurueck').addEventListener('click', () => window.mmZeige(aktuell() - 1));
$('.rf-weiter').addEventListener('click', () => window.mmZeige(aktuell() + 1));

/* Schriftgröße der Notizen, gemerkt über das Neuladen hinaus. */
let groesse = parseInt(localStorage.getItem('mm-rf-groesse'), 10) || 26;
function setzeGroesse(px) {
  groesse = Math.max(16, Math.min(48, px));
  rf.style.setProperty('--rf-notiz', `${groesse}px`);
  try { localStorage.setItem('mm-rf-groesse', groesse); } catch (e) { /* egal */ }
}
setzeGroesse(groesse);
$('.rf-klein').addEventListener('click', () => setzeGroesse(groesse - 2));
$('.rf-gross').addEventListener('click', () => setzeGroesse(groesse + 2));
document.addEventListener('keydown', (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === '+') setzeGroesse(groesse + 2);
  else if (event.key === '-') setzeGroesse(groesse - 2);
});

/* Uhrzeit und Stoppuhr */
let start = Date.now();
$('.rf-neu').addEventListener('click', () => { start = Date.now(); tick(); });
function tick() {
  const jetzt = new Date();
  $('.rf-uhr').textContent = jetzt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const s = Math.floor((Date.now() - start) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, sek = s % 60;
  $('.rf-zeit').textContent = (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) +
                              `:${String(sek).padStart(2, '0')}`;
}
tick();
setInterval(tick, 1000);

/* Hallo an das Hauptfenster: auch nach dessen Neuladen findet es so das
   Rednerfenster wieder und blendet den Notizknopf auf dem Beamer aus. */
setInterval(() => sende({ hallo: true }), 2000);

window.addEventListener('resize', () => zeichne(aktuell()));
zeichne(aktuell());
sende({ nr: aktuell() });
})();

/* ==========================================================================
   Mandarin Maverick – Zusatzbausteine (28.11.2026)
   Gehört zu theme.css Abschnitt 13 und deck.js.

   1  Klickfenster   .mm-ov-btn[data-ov] öffnet .mm-ov#id; Schließen über
                     den Knopf „× Schließen“, einen zweiten Klick auf den
                     Auslöser, Esc oder den Folienwechsel.
   2  Bildzonen      .mm-hot > .mm-hot-zone: Überfahren zeigt die Erklärung,
                     ein Tipp (Tablet) hält sie fest.
   3  Zerlegung      Folien „Bedeutungstragende Bestandteile I/II“: Jedes
                     Beispielzeichen der dritten Spalte zeigt beim Überfahren
                     Signifikum + Phonetikum (Daten: zerlegung-daten.js).
   ========================================================================== */
(function () {
  const stage = document.getElementById('mm-stage');
  if (!stage) return;

  /* 1 ---------------------------------------------------------------- */
  function setOv(ov, auf) {
    ov.classList.toggle('is-open', auf);
    document.querySelectorAll(`[data-ov="${ov.id}"]`)
      .forEach(b => b.setAttribute('aria-expanded', String(auf)));
  }
  document.querySelectorAll('.mm-ov').forEach(ov => {
    const zu = document.createElement('button');
    zu.type = 'button';
    zu.className = 'mm-ov-zu';
    zu.textContent = '× Schließen';
    ov.querySelector('.mm-ov-box').prepend(zu);
    zu.addEventListener('click', () => setOv(ov, false));
    /* Klick auf den abgedunkelten Rand schließt ebenfalls. */
    ov.addEventListener('click', e => { if (e.target === ov) setOv(ov, false); });
  });
  document.querySelectorAll('.mm-ov-btn').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const ov = document.getElementById(btn.dataset.ov);
      if (ov) setOv(ov, !ov.classList.contains('is-open'));
    });
  });

  /* 2 ---------------------------------------------------------------- */
  document.querySelectorAll('.mm-hot-zone').forEach(z => {
    z.tabIndex = 0;
    z.addEventListener('click', () => {
      const an = !z.classList.contains('is-on');
      z.parentElement.querySelectorAll('.mm-hot-zone').forEach(o => o.classList.remove('is-on'));
      z.classList.toggle('is-on', an);
    });
  });

  /* 3 ---------------------------------------------------------------- */
  const Z = window.MM_ZERLEGUNG || {};
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  function karte(z, d) {
    let bau;
    if (d.typ === 'Phonogramm') {
      bau = `<div class="zl-formel"><span class="zl-gross">${z}</span> =
        <span class="zl-sig">${d.sig.teil}</span> +
        <span class="zl-phon">${d.phon.teil}</span></div>
        <p><span class="zl-sig-t">Signifikum ${d.sig.teil}</span> ${esc(d.sig.de)} — gibt das Bedeutungsfeld</p>
        <p><span class="zl-phon-t">Phonetikum ${d.phon.teil}</span> <i>${d.phon.py}</i> — gibt den Laut
        (${d.phon.passt === 'gleich' ? 'klingt gleich' : d.phon.passt === 'ähnlich' ? 'klingt ähnlich' : 'passt heute nicht mehr'})</p>`;
    } else {
      bau = `<div class="zl-formel"><span class="zl-gross">${z}</span> =
        ${d.teile.map(t => `<span class="zl-sig">${t.teil}</span>`).join(' + ')}</div>
        <p>${d.teile.map(t => `<b>${t.teil}</b> ${esc(t.de)}`).join(' · ')}</p>
        <p class="zl-hin">Kein Phonogramm: zusammengesetzte Bedeutung (<span class="hanzi">会意</span>), kein Lautgeber.</p>`;
    }
    return `<div class="zl-kopf"><span class="pinyin">${d.py}</span> · ${esc(d.de)}</div>${bau}` +
      (d.hinweis ? `<p class="zl-hin">${esc(d.hinweis)}</p>` : '');
  }
  stage.querySelectorAll('.mm-slide').forEach(folie => {
    if (!/^Bedeutungstragende Bestandteile/.test(folie.dataset.title || '')) return;
    folie.querySelectorAll('tbody tr, tr').forEach(tr => {
      const td = tr.querySelectorAll('td')[2];
      if (!td) return;
      const sp = td.querySelector('.hanzi') || td;
      const zeichen = [...sp.textContent].filter(c => c.trim());
      sp.innerHTML = zeichen.map(c => Z[c]
        ? `<span class="mm-zl" tabindex="0">${c}<span class="mm-zl-pop">${karte(c, Z[c])}</span></span>`
        : c).join(' ');
    });
    folie.querySelectorAll('.mm-zl').forEach(s => s.addEventListener('click', () => {
      const an = !s.classList.contains('is-on');
      folie.querySelectorAll('.mm-zl.is-on').forEach(o => o.classList.remove('is-on'));
      s.classList.toggle('is-on', an);
    }));
  });

  /* Aufräumen beim Folienwechsel und mit Esc. */
  function alleZu(nurInaktiv) {
    stage.querySelectorAll('.mm-slide').forEach(f => {
      if (nurInaktiv && f.classList.contains('is-active')) return;
      f.querySelectorAll('.mm-ov.is-open').forEach(o => setOv(o, false));
      f.querySelectorAll('.is-on').forEach(o => o.classList.remove('is-on'));
    });
  }
  document.addEventListener('mm-folie', () => alleZu(true));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') alleZu(false); });
})();

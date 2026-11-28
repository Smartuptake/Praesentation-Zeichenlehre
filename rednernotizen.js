/* ==========================================================================
   Mandarin Maverick – Rednernotizen
   Gehört zu theme.css (Abschnitt 8a) und deck.js.

   Auf jeder Folie sitzt oben links neben der Bildmarke die Schaltfläche
   „Rednernotizen“. Ein Klick klappt Stichphrasen auf: was der Vortragende
   zu dieser Folie sagen soll. Zweiter Klick schließt wieder, ebenso Esc
   und der Wechsel auf eine andere Folie. Die Taste N tut dasselbe.

   Der Kasten ist Vortragswerkzeug, kein Folieninhalt: Er liegt über der
   Folie und erscheint nicht im PDF-Export.

   ACHTUNG — er liegt auf der Folie und wird bei einem Beamer mit-
   projiziert. Wer die Notizen für sich behalten will, öffnet die
   Präsentation auf einem zweiten Gerät oder blickt nur kurz hinein.

   PFLEGE
     Die Notizen stehen unten als NOTIZEN-Objekt, mit dem data-title der
     Folie als Schlüssel — derselbe Schlüssel wie im Inhaltsverzeichnis.
     Wer eine Folie ergänzt, trägt hier einen Eintrag mit ihrem data-title
     nach; fehlt er, steht im Kasten ein Hinweis darauf.

     Zielgruppe der Formulierungen: Chinesischlernende der gymnasialen
     Oberstufe und Studierende im Anfangssemester.
   ========================================================================== */

(function () {
const NOTIZEN = {
  "Titel": [
    "Begrüßung — heute geht es um die Entstehung der Schrift allgemein und um Herkunft und Bauplan der chinesischen Schrift",
    "Versprechen: Nach diesem Vortrag haben Sie ein wesentlich klareres Bild der chinesischen Schriftzeichen — wie sie zusammengesetzt sind und wie sie geschrieben werden",
    "Damit ist der Vortrag ein guter Einstieg: Am Ende gibt es Zugang zu Schriftzeichen-Übungsblättern und zum Material der neuen HSK-Prüfungen 3.0 (Wort-, Zeichen- und Grammatiklisten, Musterprüfungen), in denen die Schriftzeichen eine zentrale Rolle spielen",
    "Zwei Teile: erst die Schrift der Menschheit, dann die chinesischen Zeichen im Einzelnen",
    "Organisatorisches: Zwischenfragen jederzeit; Reader und Übungsblatt gibt es am Schluss"
  ],

  "Inhaltsverzeichnis": [
    "Den Bogen zeigen: von den ersten Ritzmarken bis zum Nachschlagen im Papierwörterbuch",
    "Erste Hälfte weltgeschichtlich, zweite Hälfte chinesisch — beides hängt zusammen",
    "Akt V hat zwei Teile: Va die chinesischen Entwicklungsstufen, Vb die Zeitleiste, die alle Schriften des Vortrags auf eine Achse legt",
    "Herzstück ist Akt VII: die Bildungsarten der Zeichen 六书 liùshū — dort entscheidet sich das Verstehen",
    "Hinweis: jede Zeile ist anklickbar, wir springen bei Bedarf zurück",
    "Am Ende Zusammenfassung, drei Quizze, HSK-Material und Übungsblätter zum Mitnehmen"
  ],

  "Jiǎhú-Schrift": [
    "Provokativ einsteigen: Ist das hier die älteste Schrift der Welt?",
    "Fundort genau nennen: die jungsteinzeitliche Siedlung Jiǎhú im Kreis Wǔyáng, Provinz Hénán (südwestlich von Zhèngzhōu), ca. 6600 v. Chr.",
    "Die rund 16 Zeichen sind eingeritzt — vor allem in Schildkrötenpanzer, die als Grabbeigaben (wohl Rasseln mit Steinchen darin) neben Toten lagen, dazu einzelne Zeichen auf Knochen und Steingeräten. Keine Gefäße mit Zeichenreihen, keine Texte",
    "Betonen: einzelne Marken sind noch keine Schrift",
    "Die vier Kriterien ausführlich: (1) ein fester, begrenzter Zeichenvorrat, den alle Schreiber gleich verwenden · (2) Bindung an eine bestimmte Sprache — jedes Zeichen steht für ein Wort oder einen Laut dieser Sprache, man kann den Text also vorlesen · (3) Zeichenreihen — Zeichen werden zu Sätzen aneinandergereiht, die Reihenfolge trägt Bedeutung · (4) regelhafte Wiederholung — dasselbe Zeichen kehrt in verschiedenen Texten mit derselben Bedeutung wieder",
    "Jiǎhú erfüllt allenfalls Kriterium 1 ansatzweise — es gibt keine Reihen, keine Wiederholungen, keine erkennbare Sprache",
    "„Über 5000 Jahre Lücke“ heißt genau: Zwischen Jiǎhú (ca. 6600 v. Chr.) und den Orakelknochen (ca. 1250 v. Chr.) liegen gut 5300 Jahre, in denen sich keine durchgehende Kette nachweisen lässt. Es wurde nicht gar nichts gefunden — es gibt dazwischen vereinzelte Topfmarken (Bànpō, ca. 4500 v. Chr.; Dàwènkǒu, ca. 2800 v. Chr.; ein mit Pinsel geschriebenes Zeichen in Táosì, ca. 2000 v. Chr.) —, aber kein Fund verbindet sie zu einer Entwicklungslinie und keiner erfüllt die vier Kriterien",
    "Deshalb lässt sich nicht behaupten, die chinesische Schrift stamme von Jiǎhú ab",
    "Merksatz setzen: Zeichen sind älter als Schrift"
  ],

  "Vinča-Zeichen": [
    "Zweiter Fall, dieselbe Frage — diesmal in Südosteuropa, auf dem Balkan",
    "Auf die Karte zeigen: Die Vinča-Kultur (ca. 5400–4500 v. Chr.) lag an der mittleren Donau — heutiges Serbien, Westrumänien (Banat, Siebenbürgen), Teile Bulgariens, Bosniens und Ungarns",
    "Die Fundorte: namengebend ist Vinča-Belo Brdo an der Donau, 14 km östlich von Belgrad; der berühmteste Einzelfund stammt aus Tărtăria in Siebenbürgen (Rumänien)",
    "85 % der Funde tragen nur ein einziges Zeichen: keine Reihe, kein Satz",
    "Was stattdessen wahrscheinlich ist: Ornament = schmückendes Muster ohne Sprachinhalt, wie ein Zickzack-Rand auf einem Topf · Besitzermarke = Zeichen, das zeigt, wem ein Gefäß gehört oder aus welcher Werkstatt es stammt, vergleichbar einem Hausmarken- oder Töpferzeichen · Kultzeichen = religiöses Symbol auf Figuren und Opfergefäßen, das eine Gottheit oder ein Ritual anzeigt — alle drei bedeuten etwas, bilden aber keine Sprache ab",
    "Tărtăria-Täfelchen: drei kleine Tontäfelchen (wenige Zentimeter groß), 1961 vom Archäologen Nicolae Vlassa in Tărtăria (Rumänien) gefunden — zwei rechteckig, eines rund, mit eingeritzten Zeichen, die auf den ersten Blick an sumerische Schrift erinnern",
    "„Spektakulär“, weil sie nach der Datierung des Fundzusammenhangs (ca. 5300 v. Chr.) rund 2000 Jahre älter wären als die Keilschrift — dann läge die älteste Schrift in Europa",
    "„Beweisschwach“, weil (1) die Fundschicht unklar dokumentiert ist und die Täfelchen selbst nicht datiert werden können — datiert wurden nur Knochen aus derselben Grube, (2) sie nur wenige Zeichen tragen, die sich nicht wiederholen und nicht lesen lassen, (3) die Ähnlichkeit mit Sumerisch eine äußerliche ist. Mit so wenig Material lässt sich nicht prüfen, ob Sprache aufgeschrieben ist",
    "Zwischenergebnis für beide Folien: ohne Sprachbindung keine Schrift"
  ],

  "Mesopotamien und Ägypten": [
    "Jetzt kommt echte Schrift — und sie entsteht gleich zweimal",
    "Keilschrift bei den Sumerern ca. 3300 v. Chr. (Stadt Uruk im Süden des heutigen Irak), Hieroglyphen in Ägypten ca. 3200 v. Chr.",
    "Der Auslöser ist unromantisch: In Uruk leben um 3300 v. Chr. Zehntausende Menschen. Tempel und Palast sammeln Getreide, Vieh, Bier und Textilien ein, lagern sie und verteilen sie als Lohn wieder",
    "Besitz: Wem gehört welches Feld, welche Herde? · Abgaben: Wer hat wie viel geliefert, wer schuldet noch? · Verwaltung: Wer bekommt wie viel Gerste als Tagesration? — das kann niemand mehr im Kopf behalten",
    "Vorstufe waren Zählsteine (Tonmarken) in Tonkugeln; daraus werden Zahl- und Warenzeichen auf Tontafeln: „5 Schafe — Tempel der Inanna“. Die ältesten Tafeln sind Quittungen und Listen",
    "Nicht die Dichtung steht am Anfang, sondern die Buchhaltung",
    "„Drei bis vier unabhängige Erfindungen“ heißt: Nur an drei oder vier Orten der Welt haben Menschen die Idee Schrift selbst entwickelt, ohne ein Vorbild zu kennen — Mesopotamien, wahrscheinlich Ägypten, China und Mittelamerika (Maya). Bei Ägypten streitet man, ob es die Idee aus Mesopotamien übernommen hat, daher „drei bis vier“",
    "„Alles andere sind Übernahmen“ heißt: Alle übrigen Schriften der Welt — unser Alphabet, Arabisch, Indisch, Japanisch, Koreanisch — sind entstanden, weil ein Volk die Schrift eines anderen kennenlernte und für die eigene Sprache umbaute. China gehört also zu dem kleinen Kreis der echten Erfinder",
    "Karten kurz zeigen: Ägypten am Nil, Mesopotamien zwischen Euphrat und Tigris"
  ],

  "Keilschrift: Technik": [
    "Die Technik erklärt die Form: auf die Zeichnung zeigen — das Ende eines Schilfrohrs ist schräg abgeschnitten, sodass eine dreieckige Spitze mit scharfer Kante entsteht",
    "Diese Spitze wird in feuchten Ton gedrückt, nicht gezogen: die Ecke macht einen dreieckigen Kopf, die Kante einen schmalen Schwanz — so entsteht der „Keil“",
    "Wichtig: das Material zwingt zur Form — zieht man Linien oder Bögen, wirft der weiche Ton Wülste auf. Also setzt man nur gerade Keile in wenigen Richtungen; aus den Bildzeichen werden Keilgruppen",
    "Rechensystem: Die Sumerer zählen im Sechzigersystem mit eigenen Zahlzeichen (Keil = 1, Winkelhaken = 10); auf Tafeln stehen Rechnungen für Felder, Rationen und Mengen",
    "Zahlungsmittel: Es gibt noch keine Münzen — gezahlt wird mit abgewogenem Silber und mit Gerste; die Tafeln halten fest, wer wie viel Silber oder Gerste gab oder bekam",
    "Darlehen und Zinsen: Ein Bauer leiht im Frühjahr Gerste oder Silber und gibt nach der Ernte mehr zurück — üblich sind etwa 20 % bei Silber und 33 % bei Gerste; die Tafel ist der Schuldschein mit Namen, Menge, Zins, Termin und Zeugen",
    "Eigentumsurkunden: Kaufverträge über Felder, Häuser, Sklaven — mit Siegelabrollung der Beteiligten als „Unterschrift“",
    "Vorgriff erklärt: Wie hier der Ton die Form der Zeichen bestimmt, bestimmt in China später der weiche Pinsel auf Papier die Form — runde Linien werden zu Strichen mit dickem Anfang und spitzem Ende. Merke: Werkzeug und Beschreibstoff formen jede Schrift",
    "Wenn Zeit ist — Sechzigersystem: Die Sumerer zählen nicht in Zehnern, sondern in Sechzigern (60 lässt sich durch 2, 3, 4, 5, 6, 10, 12, 15, 20 und 30 teilen — praktisch zum Aufteilen). Über Babylonier und Griechen haben wir es geerbt: 1 Stunde = 60 Minuten, 1 Minute = 60 Sekunden, der Kreis hat 360 Grad (6 × 60). Jede Uhr ist also ein Stück sumerische Mathematik"
  ],

  "Hieroglyphen": [
    "Wortbedeutung auflösen: griechisch hieros „heilig“ + glyphein „einmeißeln, einritzen“ — also „heilige eingemeißelte Zeichen“. Die Griechen sahen sie nur an Tempeln, daher der Name",
    "Die ägyptische Eigenbezeichnung ist stärker: medu netjer, „Gottesworte“",
    "Thot: der ägyptische Gott der Schrift, der Weisheit und des Mondes, dargestellt mit dem Kopf eines Ibis (eines Wasservogels mit langem gebogenem Schnabel) oder als Pavian; er ist der Schreiber der Götter. Nach dem Mythos hat er die Schrift erfunden und den Menschen geschenkt — daher „Gabe des Gottes Thot“. Die Schreiber verehrten ihn als ihren Schutzgott",
    "Erst Monumentalschrift: Tempelwände, Obelisken, Sarkophage",
    "„Adressat sind die Götter“: Die Inschriften sollten nicht von Menschen gelesen werden (kaum jemand konnte lesen), sondern wirken. Man teilte den Göttern mit, was der König für sie getan hat (Opfer, Tempelbau, Siege), bat um Schutz und ewiges Leben, und im Grab sorgten Name und Opferliste dafür, dass der Tote im Jenseits weiterlebt und versorgt wird — das geschriebene Wort galt als wirksam",
    "Das Missverständnis: Viele glauben, jede Hieroglyphe sei ein kleines Bild, das zeigt, was gemeint ist — eine Eule heißt „Eule“. Falsch: Die meisten Hieroglyphen stehen für Laute. Die Eule steht meist einfach für den Laut m",
    "Vorbereiten, was auf der nächsten Folie kommt — die Zeichen tragen auch Lautwerte. Auf die Beispielreihe zeigen: Mund = Laut r, Wasser = Laut n, Haus = Lautgruppe pr. „Lautwert“ ist der Laut, den ein Zeichen beim Lesen bekommt, unabhängig von seinem Bild"
  ],

  "Vom Bild zum Laut": [
    "Der entscheidende gedankliche Schritt der ganzen Schriftgeschichte: Ein Zeichen bedeutet nicht mehr nur ein Ding, sondern einen Klang. Erst damit kann man alles aufschreiben, was man sagen kann — auch Wörter, die man nicht zeichnen kann",
    "„Der Verwaltungsdruck erzwingt Tempo“: Für jedes Wort ein eigenes Bild bräuchte Tausende Zeichen und viel Zeit; Namen von Personen, Zahlwörter oder Verben wie „gehen“ kann man kaum zeichnen. Mit Zeichen für Laute kommt man mit wenigen Zeichen aus und schreibt jedes Wort",
    "Beispiel Lautwert: Das Bild Haus heißt ägyptisch per (Konsonanten pr). Dieses Zeichen wird nun auch für das Verb „pri — herausgehen“ benutzt, nur weil es gleich klingt. Das Haus hat jetzt einen Lautwert: pr",
    "Doppelnatur am Bild auf der Folie: dasselbe Hauszeichen einmal als Bild (Haus), einmal als Laut (pr) im Wort „herausgehen“ — dahinter ein Deutzeichen (laufende Beine), damit man weiß: es geht um eine Bewegung",
    "Rebusprinzip in einem Satz: Man schreibt ein Wort mit Bildern von Dingen, die gleich klingen, und meint nur den Klang. Deutsches Beispiel auf der Folie: Ei + Meer = Eimer — der Eimer hat weder mit Ei noch mit Meer zu tun",
    "Damit lassen sich Namen schreiben — Beispiel: Der Name Kleopatra lässt sich nicht zeichnen; die Ägypter schreiben ihn mit Lautzeichen k-l-i-o-p-a-d-r-a. Genau daran hat Champollion 1822 die Hieroglyphen entziffert",
    "Chinesisches Beispiel für Lehrkräfte: 柏林 Bólín „Zypresse + Wald“ ist einfach der Klang von Berlin",
    "Merken: dieselbe Doppelnatur — Bild und Laut — kehrt später bei den chinesischen Phonogrammen wieder (妈 = Frau als Sinn + 马 als Laut)"
  ],

  "Hieratisch und demotisch": [
    "„Register“ meint hier: Gebrauchsebene einer Schrift — dieselbe Schrift in verschiedenen Formen für verschiedene Zwecke, so wie wir Druckschrift, Schreibschrift und Kurznotizen gleichzeitig benutzen. Deshalb „drei Register, nicht drei Epochen“: Sie lösen einander nicht ab, sie bestehen nebeneinander",
    "Hieroglyphisch: die sorgfältige Bildform — in Stein gemeißelt oder bemalt, für Tempel, Gräber, Königsinschriften; langsam und feierlich",
    "Hieratisch (griech. „priesterlich“): die mit dem Binsenpinsel auf Papyrus geschriebene Kursive derselben Zeichen — für Verwaltung, Briefe, religiöse Texte; schnell, Bilder zu Kürzeln verschliffen",
    "Demotisch (griech. „volkstümlich“): ab ca. 650 v. Chr. noch stärker verkürzte Schreibschrift für Alltag, Verträge, Gerichtsakten — kaum noch Bild zu erkennen. Auf dem Stein von Rosette steht derselbe Text in Hieroglyphen, Demotisch und Griechisch",
    "Auf die Tabelle zeigen: Zeile für Zeile dasselbe Zeichen, links als Bild, rechts immer stärker abgeschliffen",
    "Regel dahinter: Funktionsvielfalt erzeugt Stilvielfalt. Beispiel aus dem Alltag: Wer einen Glückwunsch schreibt, schreibt schön; wer einen Einkaufszettel schreibt, kritzelt; wer ein Formular ausfüllt, schreibt in Druckbuchstaben — derselbe Mensch, dieselbe Schrift, drei Formen, weil drei Zwecke",
    "Direkt auf China vorausweisen: Siegelschrift (feierlich, Siegel und Inschriften) entspricht den Hieroglyphen, Kanzleischrift (Akten der Beamten) dem Hieratischen, die Kursive (schnelle Handschrift) dem Demotischen — China wird genau dasselbe tun",
    "Preis des Tempos: die Bildhaftigkeit geht verloren"
  ],

  "Papyrus: Herstellung": [
    "Kurzer Materialexkurs — der Beschreibstoff formt die Schrift mit",
    "Wie er das tut: Auf glattem Papyrus gleitet der Binsenpinsel mit Tinte — man kann zügig in einem Zug schreiben, Bögen und Verbindungen entstehen. In Stein muss jede Linie gemeißelt werden, in Ton gedrückt. Ein glatter Stoff begünstigt also eine schnelle, runde Kursive (Hieratisch), ein harter eine eckige Monumentalschrift",
    "Herstellung in drei Schritten: schälen und zerfasern, kreuzweise legen, pressen und trocknen",
    "Papyrus bleibt drei Jahrtausende der Schreibstoff des Mittelmeerraums",
    "Vergleichspunkt China — Bambus: Bambusrohr wird in schmale Streifen (Bambusstreifen 竹简 zhújiǎn) gespalten, getrocknet und senkrecht mit Pinsel und Tusche beschrieben, eine Zeichenspalte pro Streifen; die Streifen werden mit Schnüren zu einer Rolle gebunden. Daher schreibt man Chinesisch traditionell von oben nach unten und die Spalten von rechts nach links",
    "Seide: Seidenstoff (帛 bó) wird wie ein Tuch beschrieben — leicht, aufrollbar, auch für Karten und Bilder, aber teuer. Wie Seide entsteht: Die Raupe des Seidenspinners frisst Maulbeerblätter und spinnt sich in einen Kokon aus einem einzigen, bis zu 1 km langen Faden; die Kokons werden in heißem Wasser gelöst, die Fäden abgewickelt, gesponnen und gewebt",
    "Schließlich Papier — Akt VI"
  ],

  "Papyrus: Blatt": [
    "„Das fertige Blatt“ meint: das Ergebnis der Herstellung von der vorigen Folie — ein fertiger Bogen Papyrus, bereit zum Beschreiben",
    "Auf die Detailaufnahme zeigen: Man sieht die beiden Faserlagen — oben waagerecht, darunter senkrecht. Sie entstehen, weil die Streifen kreuzweise gelegt und gepresst werden",
    "Schreibrichtung folgt der Faserlage: Beschrieben wird zuerst die Seite mit den waagerechten Fasern — der Pinsel läuft mit den Fasern und bleibt nicht hängen",
    "Mehrere Bogen werden aneinandergeklebt zu Rollen von mehreren Metern Länge",
    "Überleitung: „leicht, tragbar, exportierbar“ heißt — eine Papyrusrolle wiegt fast nichts, eine Tontafel mit derselben Textmenge kiloweise; Papyrus kann man aufrollen, mitnehmen, per Schiff verschicken. Ägypten exportierte Papyrus in den ganzen Mittelmeerraum (die Stadt Byblos gab dem griechischen Wort für Buch, biblos, den Namen). Mit dem Stoff reisen Texte und Schriften — genau das braucht das Alphabet auf der nächsten Folie"
  ],

  "Ugarit und die Phönizier": [
    "Die dritte große Idee nach Bild und Laut: das Alphabet — ein Zeichen für einen einzelnen Laut",
    "Ugarit um 1400 v. Chr. — Hafenstadt an der syrischen Küste; dort schrieb man ein Alphabet aus 30 Keilschriftzeichen in Ton",
    "Verbreitet wird das Alphabet von den Phöniziern, einem Seefahrer- und Handelsvolk aus den Städten Tyros, Sidon und Byblos (heutiger Libanon)",
    "22 Zeichen, ausschließlich Konsonanten: Abjad (nach den ersten Buchstaben ʾalif, bā, ǧīm, dāl) heißt eine Schrift, die nur Mitlaute schreibt; die Vokale ergänzt der Leser aus dem Zusammenhang. Deutsches Beispiel: „Hs“ kann Haus, Hase, Hose heißen — der Satz entscheidet. Arabisch und Hebräisch funktionieren bis heute so",
    "Die Pointe genauer: Das Alphabet wurde nicht von den Phöniziern erfunden, und es war auch nicht sofort das beste System. Es verbreitete sich, weil phönizische Kaufleute überall im Mittelmeer Handel trieben, Niederlassungen gründeten (Karthago) und Verträge und Rechnungen schreiben mussten. Ihre Handelspartner — Griechen, Aramäer, später Römer — lernten die Schrift im Geschäft kennen und übernahmen sie. Die Handelsrouten auf der Karte sind die Wege des Alphabets"
  ],

  "Ugaritische Zeichentafel": [
    "Der eigentliche Fund sind Schülertäfelchen: kleine Tontafeln, auf denen Schreiberlehrlinge in Ugarit die Zeichen der Reihe nach übten — Schulhefte aus Ton",
    "Abecedarium (Mehrzahl Abecedarien) heißt eine Liste aller Buchstaben in ihrer festen Reihenfolge — wie unser „ABC“, das Kinder aufsagen",
    "„Feste Reihenfolge“: Die Schüler schrieben nicht durcheinander, sondern immer gleich: ʾa – b – g – d – h – w … Dieselbe Folge haben das Phönizische (aleph, bet, gimel, dalet), das Griechische (alpha, beta, gamma, delta) und unser A, B, C, D",
    "Warum das zählt: lernbar — man kann das Alphabet aufsagen und abhaken; prüfbar — der Lehrer sieht sofort, ob ein Zeichen fehlt; sortierbar — Namen, Listen, Wörterbücher lassen sich nach der Reihenfolge ordnen (Telefonbuch, Lexikon)",
    "Die Brücke konkret: Tausende chinesische Zeichen haben keine natürliche Reihenfolge — es gibt kein „ABC der Zeichen“. Deshalb erfand man Radikale: Bestandteile wie 氵 Wasser oder 亻 Mensch, nach denen Zeichen in Gruppen sortiert werden; innerhalb der Gruppe ordnet man nach der Zahl der übrigen Striche. So kann man 河 (Fluss) unter 氵 finden. Die Radikale sind das chinesische Ersatz-ABC — Akt IX",
    "Auf das Beispielwort zeigen: Die Ugariter schrieben den Namen ihrer eigenen Stadt mit vier Zeichen: ʾu – g – r – t = Ugarit. Man liest von links nach rechts; die Vokale außer dem u am Anfang muss der Leser ergänzen"
  ],

  "Ausbreitung des Alphabets": [
    "Um 800 v. Chr. übernehmen die Griechen das phönizische System",
    "Warum ein Alphabet Vokale braucht: Im Griechischen tragen die Vokale viel Bedeutung, Wörter beginnen und enden oft mit Vokalen (z. B. „eu“, „aiei“). Nur mit Konsonanten wäre der Text mehrdeutig — „Hs“ für Haus, Hase, Hose. Die Griechen nehmen phönizische Zeichen für Laute, die es im Griechischen nicht gibt, und machen Vokale daraus: aleph wird A, he wird E, jod wird I",
    "Erst damit ist es ein Alphabet im engeren Sinne: jeder Laut, Konsonant wie Vokal, hat ein Zeichen; man kann auch unbekannte Wörter richtig vorlesen",
    "Die Buchstabennamen verraten die Herkunft: Die Phönizier benannten jeden Buchstaben nach einem Wort, das mit diesem Laut anfängt, und das Zeichen war ursprünglich ein Bild dieses Wortes — ʾaleph „Rind“ war ein Rinderkopf mit Hörnern (dreht man unser A um, sieht man noch die Hörner), bet „Haus“ war ein Hausgrundriss (daraus wurde B)",
    "Daher das Wort Alphabet: Die Griechen übernahmen die Namen, ohne ihre Bedeutung zu kennen — alpha (aus aleph) + beta (aus bet) = Alphabet, also einfach die ersten beiden Buchstaben, so wie wir „das ABC“ sagen",
    "Der Weg nach Westen heißt: von der Levante (Libanon) über das Meer nach Griechenland, von dort nach Italien zu den Etruskern, von denen die Römer ihr lateinisches Alphabet übernehmen; mit dem Römischen Reich und der Kirche kommt es nach Mittel- und Westeuropa — zu uns",
    "Warum 26: Das lateinische Alphabet hatte 23 Buchstaben; im Mittelalter wurden aus I das J und aus V das U und W abgeleitet = 26. Für jedes deutsche Wort reichen sie, weil sich das Deutsche mit rund 40 Lauten darstellen lässt und Kombinationen (sch, ch, ei) und Zusatzzeichen (ä, ö, ü, ß) den Rest erledigen. 24 würden auch gehen — die Zahl ist historisch gewachsen, nicht geplant",
    "Vergleichsmaßstab für die nächste Folie: 26 Zeichen bei uns gegen Tausende im Chinesischen"
  ],

  "Alphabet und Zeichenschrift": [
    "„Zwei Wege, ein Ziel“ heißt: Beide Systeme machen gesprochene Sprache sichtbar — das Alphabet schreibt den Klang in Einzellauten auf, die Zeichenschrift schreibt Bedeutungseinheiten mit je einer Silbe auf. Unterschiedlicher Weg, gleiches Ziel: Was man sagt, kann ein anderer lesen",
    "Hohe Einstiegsleichtigkeit des Alphabets: Wer die 26 Buchstaben und ihre Laute kennt — in wenigen Monaten gelernt —, kann jedes Wort vorlesen, auch ein unbekanntes",
    "Chinesisch ist morphosyllabisch: morpho- = Morphem, syllabisch = Silbe. Ein Zeichen schreibt genau eine Silbe, und diese Silbe ist meist zugleich ein Morphem",
    "Silbe gegen Morphem: Eine Silbe ist eine Klangeinheit (Hau-ses: zwei Silben). Ein Morphem ist die kleinste Einheit mit Bedeutung (Haus + -es: zwei Morpheme, -es zeigt den Genitiv). Im Deutschen fallen beide oft auseinander: „Tomate“ hat drei Silben, aber nur ein Morphem. Im Chinesischen fallen sie zusammen: 电脑 diànnǎo = 电 Elektrizität (eine Silbe, eine Bedeutung) + 脑 Gehirn",
    "Das Beispiel „Häuschen“ erklärt: Haus + -chen (Verkleinerung) + Umlaut — Silben (Häus-chen) und Bedeutungsteile (Haus | chen) decken sich nicht genau. Im Chinesischen „fiele das auseinander“ heißt: Dort hätte jeder Bedeutungsteil sein eigenes Zeichen und seine eigene Silbe, z. B. 小房子 xiǎo fángzi = klein + Haus",
    "Der große Vorteil der Zeichenschrift: dialektübergreifend lesbar — Mandarin und Kantonesisch klingen sehr verschieden, teilen aber die Schrift: 我 heißt wǒ oder ngo, bedeutet aber überall „ich“",
    "221 v. Chr. 书同文 shū tóng wén — „die Schrift (书) gleich (同) machen (文 Schriftzeichen)“: Kaiser Qin Shi Huang ordnet nach der Reichseinigung eine einheitliche Schrift für alle an; Vorgriff auf die Siegelschrift"
  ],

  "Die chinesische Schrift 文字": [
    "Kernaussage in einem Satz: die älteste ununterbrochen gebrauchte Schrift der Welt",
    "Gut 3200 Jahre lückenlos belegt — seit den Orakelknochen des 13. Jh. v. Chr.",
    "Ist das schon Schrift? Ja — alle vier Kriterien sind erfüllt: (1) ein fester Zeichenvorrat von rund 4500 Zeichen, (2) Bindung an die altchinesische Sprache — die Texte lassen sich als Sätze lesen, (3) Zeichenreihen mit Grammatik, etwa „Frage: Wird es morgen regnen?“, (4) dieselben Zeichen kehren auf Tausenden Knochen mit derselben Bedeutung wieder. Die Orakelknochenschrift ist schon ein voll ausgebildetes System — ihre Anfänge müssen also älter sein",
    "Unterschied zu Keilschrift und Hieroglyphen betonen: die sind ausgestorben und mussten im 19. Jahrhundert mühsam entziffert werden",
    "Warum sie ausstarben: Die Keilschrift wurde vom Aramäischen verdrängt — einem Alphabet mit 22 Zeichen, das Perser und Händler für ihr Großreich nutzten; um Christi Geburt schrieb sie kaum noch jemand. Die Hieroglyphen endeten, als Ägypten griechisch, römisch und christlich wurde; die Kopten schrieben mit griechischen Buchstaben, die Tempel wurden geschlossen (letzte Inschrift 394 n. Chr.)",
    "Warum die chinesische Schrift überlebte: (1) Die Sprache selbst blieb erhalten und entwickelte sich weiter, (2) der Staat brauchte über 2000 Jahre lang Beamte, die über Prüfungen in der Schrift ausgewählt wurden, (3) die Klassiker des Konfuzius waren in ihr geschrieben, (4) selbst Eroberer wie Mongolen und Mandschu übernahmen die chinesische Verwaltung und Schrift, (5) die Schrift verband Sprecher verschiedener Dialekte — ein Wechsel hätte das Reich sprachlich zerrissen",
    "Das Wort 文字 wénzì selbst zerlegen: 文 wén war ursprünglich das Bild eines Menschen mit Tätowierung auf der Brust — daher „Muster, Linien, Zeichnung“ und dann „einfaches Zeichen“, das nicht weiter zerlegbar ist (z. B. 木, 女). 字 zì ist ein Kind 子 unter einem Dach 宀 — „Kinder bekommen, sich vermehren“: Zeichen, die aus der Verbindung einfacher Zeichen „geboren“ werden (z. B. 林, 好). Xu Shen schrieb um 100 n. Chr.: Erst zeichnete man die Formen nach — das sind 文; dann verbanden sich Form und Laut — das sind 字",
    "Damit ist der Übergang zum zweiten Teil des Vortrags gesetzt"
  ],

  "Wörterbücher und Zeichenzahlen": [
    "Die Angstfrage vorwegnehmen: Wie viele Zeichen muss ich lernen?",
    "Der Bestand wächst historisch, der Gebrauch nicht — große Wörterbücher wie 中华字海 sammeln über 85.000 Zeichen, gebraucht werden heute nur rund 15 %",
    "Was mit den übrigen 85 % ist: (1) Varianten — dasselbe Zeichen in alten oder regionalen Schreibweisen (异体字), (2) Zeichen für Dinge, die es nicht mehr gibt, etwa alte Ritualgefäße, Pferdefarben, Kleidungsstücke, (3) seltene Orts-, Familien- und Personennamen, (4) Fehlschreibungen und Einmalbildungen, die einmal in einem Text standen und von Wörterbüchern aufgenommen wurden",
    "Warum es sie trotzdem gibt: Wörterbücher wollen alles verzeichnen, was je geschrieben wurde — damit man alte Texte, Inschriften, Ahnen- und Ortsnamen lesen kann; Computer brauchen sie, um Namen in Ausweisen richtig zu schreiben. Sie leben im Archiv, nicht im Alltag — wie bei uns Wörter aus Mittelalter-Urkunden im Grimm’schen Wörterbuch",
    "Für den Alltag genügen 3000–5000 Zeichen",
    "Entlastung geben: kein Mensch lernt den Gesamtbestand, auch kein Muttersprachler",
    "Die Wörterbücher zeigen — den kleinen Taschenband anfassen lassen, wenn vorhanden"
  ],

  "Orakelknochenschrift 甲骨文": [
    "Jetzt der älteste gesicherte Beleg — 甲骨文 jiǎgǔwén (甲 Panzer, 骨 Knochen, 文 Schrift), ab ca. 1250 v. Chr., Hauptstadt Yīn bei Ānyáng (Provinz Hénán)",
    "Träger nennen: Schildkrötenpanzer (Bauchschild) und Rinderschulterblätter, geritzt",
    "Wahrsagerei heißt hier: Der König der Shang-Dynastie befragt die Ahnen und Götter, bevor er etwas entscheidet — Wird es regnen? Wird die Ernte gut? Soll ich in den Krieg ziehen? Wird die Königin einen Sohn gebären? Ist der Zahnschmerz ein Fluch eines Ahnen?",
    "Der Ablauf: (1) Auf der Rückseite des Knochens werden Mulden gebohrt, (2) ein Wahrsager hält einen glühenden Stab hinein, (3) durch die Hitze springt der Knochen mit einem Knacken in ⊢-förmigen Rissen, (4) König oder Wahrsager deuten die Risse als Ja oder Nein, Glück oder Unglück, (5) neben die Risse wird geritzt: Datum, Name des Wahrsagers, die Frage, oft die Deutung und manchmal, was tatsächlich geschah. So sind es Protokolle eines Staatsorakels",
    "Etwa 4500 verschiedene Zeichen belegt, rund ein Drittel sicher gelesen",
    "Pointe mit dem Beispiel auf der Folie: Viele heutige Zeichen erkennt man in ihrer Urform — 日 Sonne als Kreis mit Punkt, 月 Mond als Sichel, 人 Mensch als Seitenansicht, 山 Berg mit drei Gipfeln, 水 Wasser als fließende Linie, 马 Pferd mit Mähne und Beinen",
    "Fundgeschichte: Bauern in Ānyáng pflügten seit Langem Knochen aus und verkauften sie an Apotheken als „Drachenknochen“ (龙骨 lónggǔ) — gemahlen galten sie in der traditionellen Medizin als Heilmittel. 1899 bemerkte der Gelehrte Wáng Yìróng, der wegen Malaria solche Medizin kaufte, die eingeritzten Zeichen und erkannte eine uralte Schrift. Bis dahin wurden also Zeugnisse der ältesten chinesischen Schrift als Pulver gegessen"
  ],

  "Bronzeschrift 金文": [
    "金文 jīnwén (金 Metall, Bronze) — Schrift auf rituellen Bronzegefäßen, Glocken 钟 zhōng und Opferkesseln 鼎 dǐng, vor allem in der Zhou-Zeit",
    "„Mitgegossen, nicht geritzt“ heißt: Die Schrift wird nicht nachträglich in das fertige harte Metall gekratzt, sondern schon in die Gussform eingearbeitet — wenn die flüssige Bronze hineinläuft, entstehen die Zeichen gleich mit",
    "Deshalb runde, volle Striche von ungleicher Breite — wieder formt das Material die Schrift: Die Zeichen wurden in weichen Ton modelliert, nicht in harten Knochen geritzt",
    "Den Gussweg Schritt für Schritt (Kasten auf der Folie): (1) Modell: Aus Ton wird das Gefäß in voller Form nachgebildet · (2) Mantel: Um das Modell wird Ton gelegt, getrocknet und in Teilen abgenommen — das ist die äußere Form · (3) Kern: Das Modell wird um die Wandstärke abgeschabt und bleibt als Innenkern stehen · (4) Die Zeichen werden in den Ton geschnitten — also ausgeschnitten, eingeritzt oder als kleine Tonplatte eingesetzt; „seitenverkehrt“, weil die Form ein Spiegelbild ist, wie ein Stempel · (5) Mantel und Kern werden zusammengesetzt, in den Spalt läuft flüssige Bronze",
    "Die Schrift entsteht mit dem Gefäß, nicht danach — das ist der Merksatz",
    "„Auf Dauer angelegt“: Bronze rostet kaum und zerbricht nicht wie Bambus; die Gefäße standen im Ahnentempel und wurden vererbt. Viele Inschriften enden deshalb mit der Formel 子子孙孙永宝用 zǐzǐ sūnsūn yǒng bǎo yòng: „Mögen Söhne und Enkel es für immer als Schatz gebrauchen.“",
    "Beispiel Rechtsdokument: Die Schale 散氏盘 Sǎnshì pán (ca. 9. Jh. v. Chr.) hält einen Grenzvertrag fest: Das Land Ze tritt dem Land San Felder ab; die Grenzpunkte werden aufgezählt, die Beamten schwören, bei Vertragsbruch Strafe zu zahlen — eine Grundbuchurkunde in Bronze",
    "Beispiel Botschaft an die Ahnen: Der Kessel 大盂鼎 Dà Yú dǐng (ca. 1000 v. Chr.): Der König verleiht dem Beamten Yu Land, Leute und Ehrengewänder; Yu lässt den Kessel gießen, um seinem verstorbenen Großvater davon zu berichten und ihn zu ehren",
    "Beispiel Geschichtsquelle: Das Gefäß 利簋 Lì guǐ berichtet, dass König Wu am Morgen des Tages jiǎzǐ den Shang-Staat besiegte (1046 v. Chr.) — bestätigt die Überlieferung"
  ],

  "Siegelschrift 篆书": [
    "Das Problem: In der Zeit der Streitenden Reiche (475–221 v. Chr.) gibt es sieben Staaten (Qin, Chu, Qi, Yan, Han, Zhao, Wei). Jeder hat eigene Schreiber, eigene Schulen, eigene Gewohnheiten — dasselbe Zeichen hat in Chu andere Bestandteile oder Striche als in Qin, Teile werden verschoben, weggelassen oder durch andere ersetzt. Beispiel: das Zeichen für „Pferd“ 马 kommt in jedem Staat in einer anderen Form vor",
    "Folge: Ein Beamter aus Qi konnte eine Akte aus Chu nur mühsam lesen — für ein geeintes Reich untragbar",
    "221 v. Chr. Reichseinigung durch den Staat Qin, König Zheng nennt sich Qin Shi Huang, Erster Kaiser — auf die Karte zeigen: aus sieben Staaten wird ein Reich",
    "„Erste Schriftreform der Geschichte“ heißt: Zum ersten Mal schreibt ein Staat per Gesetz vor, wie jedes Zeichen auszusehen hat. Reformiert wird die Vielfalt: Der Kanzler Li Si nimmt die Schrift des Staates Qin, die große Siegelschrift 大篆 dàzhuàn, vereinfacht und vereinheitlicht sie zur kleinen Siegelschrift 小篆 xiǎozhuàn; alle regionalen Formen der anderen Staaten werden verboten",
    "Zugleich vereinheitlicht Qin Maße, Gewichte, Münzen und die Spurbreite der Wagen — die Schrift gehört in dasselbe Paket",
    "Merkmale zeigen: gleich starke Linien, streng symmetrisch, senkrecht ausgerichtet",
    "Bis heute in Gebrauch — auf jedem Künstlersiegel",
    "Rückbezug: Das ist das 书同文 shū tóng wén, „die Schrift vereinheitlichen“, das auf der Folie „Zwei Wege, ein Ziel“ (Alphabet und Zeichenschrift) schon genannt wurde — hier sieht man, wie es umgesetzt wurde"
  ],

  "Die vier Schriftstile der Han-Zeit": [
    "Die Han-Zeit (206 v. Chr. – 220 n. Chr.) bringt das Repertoire — die Auswahl an Schriftstilen —, mit dem bis heute geschrieben wird: Jeder Chinese, jede Schriftart im Computer greift auf diese vier Stile zurück",
    "Vier Namen mit ihrer Funktion koppeln heißt: zu jedem Stil sagen, wofür er gebraucht wurde — 隶书 lìshū für die Akten der Verwaltung, 楷书 kǎishū für Druck und Schule, 行书 xíngshū für die persönliche Handschrift, 草书 cǎoshū für die Kunst",
    "Wichtig: sie lösen einander nicht ab, sie treten nebeneinander",
    "Die Abbildung lesen: dieselben vier Zeichen 金生麗水 (Gold entsteht im Fluss Li) fünfmal — von links nach rechts: Siegel-, Kanzlei-, Regel-, Halbkursiv-, Grasschrift (geprüft: links stehen 麗 und 水 noch in Siegelform); mit dem Cursor über eine Spalte fahren zeigt Name und Merkmale",
    "Siegelschrift 篆书: gleichmäßig, rund, symmetrisch, feierlich",
    "Kanzleischrift 隶书: breit, flach, mit „Schwalbenschwanz“-Enden, kräftig",
    "Regelschrift 楷书: klar, eckig, jeder Strich einzeln — ordentlich",
    "Halbkursivschrift 行书: fließend, verbunden, zügig — persönlich",
    "Grasschrift 草书: stark verkürzt, schwungvoll, expressiv — schwer lesbar",
    "Publikumsfrage: Welchen Stil würden Sie am ehesten lesen können?"
  ],

  "Der Entwicklungsstrang": [
    "Die Übersichtsfolie — hier läuft alles Bisherige zusammen",
    "Ein Zeichen durch alle Stufen verfolgen: von 甲骨文 bis 简体字",
    "Zwei Bewegungen benennen: weniger Bildhaftigkeit, mehr Schreibtempo",
    "„Und trotzdem bleibt der Bauplan erkennbar“ heißt: Auch wenn die Form sich ändert, bleiben die Bestandteile dieselben und an derselben Stelle. Beispiel: 休 ausruhen ist in jeder Stufe Mensch 亻 + Baum 木 — auf den Orakelknochen als Männchen an einem Baum, heute als zwei Striche und ein 木",
    "„Deshalb lohnt die Etymologie“: Etymologie ist die Lehre von der Herkunft der Zeichen. Weil der Bauplan erhalten bleibt, kann man bei fast jedem heutigen Zeichen zurückverfolgen, woraus es entstanden ist — und es sich dadurch viel leichter merken als durch bloßes Abmalen",
    "Kurz innehalten lassen; das ist ein guter Moment für Zwischenfragen"
  ],

  "Eine Bronzeinschrift": [
    "Ein Beispiel in Ruhe ansehen — volle, runde Striche von ungleicher Breite",
    "Typische Inhalte nennen: Belehnungen (der König überträgt einem Gefolgsmann Land, Leute oder ein Amt; der Belehnte schuldet dafür Treue und Kriegsdienst — wie im europäischen Lehnswesen)",
    "Feldzüge: Ein Adliger lässt nach einem Sieg ein Gefäß gießen und beschreibt darauf, gegen wen er gekämpft hat, wie viele Gefangene oder wie viel Beute er gemacht hat und welche Belohnung ihm der König gab — Kriegsbericht und Ruhmesurkunde zugleich",
    "Widmungen an die Ahnen: Das Gefäß wird einem verstorbenen Vater oder Großvater gewidmet und im Ahnenkult benutzt",
    "Den zitierten Text kurz vorlesen — Wagen, Pferde, Jagd des Fürsten",
    "Deutlich machen: das ist keine Literatur, sondern beurkundete Erinnerung"
  ],

  "Siegelschrift im Bild": [
    "Blick auf die Linienführung lenken: überall gleich stark, kein Druckwechsel",
    "Streng, symmetrisch, in ein gedachtes Rechteck gesetzt",
    "Grund: gemeißelt, nicht geschrieben — der Meißel kennt keine Druckmodulation",
    "Überleitung: sobald der Pinsel übernimmt, ändert sich das Bild vollständig"
  ],

  "Kanzleischrift 隶书": [
    "Der große Umbruch heißt 隶变 lìbiàn — der Bruch zwischen alter und neuer Schrift",
    "Merkmale: geschwungene Führung, verdickte Strichenden, breitere Proportion",
    "Ab hier sind die Zeichen für heutige Leser grundsätzlich entzifferbar",
    "Ursache wieder das Material: der Pinsel erlaubt Druck und Schwung",
    "Warum Verwaltung: Das geeinte Reich der Qin und Han hat Zehntausende Beamte, die Steuerlisten, Gesetze, Berichte und Anordnungen auf Bambusstreifen schreiben. Die feierliche Siegelschrift mit ihren runden, gleichmäßigen Linien ist dafür viel zu langsam. Die Schreiber (隶 lì = niedere Beamte, Amtsdiener) begradigen die Bögen und zerlegen sie in schnelle gerade Pinselstriche — daher der Name „Schrift der Amtsdiener“",
    "Also: Schnelligkeit schlägt Repräsentation — im Büro zählt, dass die Akte fertig wird, nicht dass sie feierlich aussieht"
  ],

  "Halbkursivschrift 行书": [
    "„Die Striche gehen ineinander über, ohne die Struktur aufzugeben“ — auf das Vergleichsbild zeigen: 永和九年, die ersten vier Zeichen des berühmten Lántíng-Vorworts, oben in Regelschrift, unten in Halbkursive",
    "Erklären an 永: In der Regelschrift setzt der Pinsel bei jedem Strich ab; in der Halbkursive läuft er vom Ende eines Strichs gleich in den nächsten weiter — eine dünne Verbindungslinie entsteht, zwei Striche werden zu einem Zug. Trotzdem stehen alle Bestandteile am selben Platz: Man erkennt das Zeichen noch",
    "Das ist die Alltagshandschrift — vergleichbar unserer Schreibschrift, in der die Buchstaben verbunden werden",
    "Noch gut lesbar, aber schon deutlich schneller",
    "Das große Bild: das Lántíng-Vorwort 兰亭序 des Kalligraphen Wáng Xīzhī (353 n. Chr.) — das berühmteste Werk der Halbkursive",
    "Hinweis für Lernende: so sieht die Handschrift aus, die man in China wirklich vorfindet"
  ],

  "Regelschrift 楷书": [
    "Die Form, die im Unterricht gelernt wird — eckig, klar, vollständig",
    "Jeder Strich ist einzeln gesetzt und einzeln erkennbar",
    "Grundlage aller Drucktypen und aller Lehrbücher",
    "Merksatz: Erst 楷书 sicher, dann darf man kursiv werden"
  ],

  "Grasschrift 草书": [
    "Die höchste kalligraphische Kunstform — und die schwierigste",
    "Ganze Komponenten schrumpfen zu einem Schnörkel",
    "Auf die Grafik zeigen: Links 之 in Regelschrift mit nummerierten Strichen; Mitte dieselben Striche als Bewegungsspur — die grauen gestrichelten Linien sind die Wege, die der Pinsel in der Luft zwischen zwei Strichen zurücklegt; rechts die Spur in einem Zug geschrieben, so wie die Grasschrift es tut",
    "„Über die Bewegungsspur, nicht über die Form entziffern“ heißt: Ein Grasschrift-Zeichen sieht dem gedruckten Zeichen oft kaum ähnlich. Man erkennt es, indem man nachvollzieht, in welcher Reihenfolge und Richtung der Pinsel gelaufen ist — die Schleifen sind die sichtbar gewordenen Luftwege",
    "Genau hier zahlt sich die richtige Strichfolge aus: Wer die Strichfolge kennt, kennt die Spur — und kann die Schleifen zurück in Striche übersetzen. Wer Zeichen in falscher Reihenfolge schreibt, findet in der Grasschrift keinen Anfang",
    "Der Vorgriff auf Akt VIII stimmt: dort geht es um Grundstriche und Strichfolge",
    "Ehrlich sein: das liest auch in China nicht jeder"
  ],

  "Welcher Stil wofür?": [
    "Zusammenfassung der Stile — jeder behält bis heute eine Funktion",
    "Durchgehen: 篆书 Siegel und Titel · 楷书 Druck und Schule · 行书 Alltag · 草书 Kunst",
    "Der europäische Vergleich auf der Folie: dasselbe Wort in vier Stilen — Fraktur (gebrochene Schrift, bis 1941 in Deutschland üblich, heute auf Bierflaschen und Zeitungsköpfen), Antiqua (die runde Schrift dieses Textes), Kursive (schräge Auszeichnung, z. B. für Buchtitel), Schreibschrift (verbundene Handschrift). Wir lesen alle vier — und benutzen jede für einen anderen Zweck",
    "„Missverständnis ausräumen“: Manche denken, Siegel- oder Kanzleischrift seien „altes Chinesisch“, das niemand mehr benutzt, und nur die Regelschrift sei „richtig“. Falsch: Alle Stile sind in Gebrauch — Siegelschrift auf Stempeln, Kanzleischrift auf Ladenschildern und Neujahrssprüchen, Kursiven in Handschrift und Kunst. Es gibt keine „veraltete“ chinesische Schrift, nur verschiedene Werkzeuge für verschiedene Zwecke — wie bei uns Fraktur und Antiqua"
  ],

  "Altertum und Moderne": [
    "Der Bogen von 古文 gǔwén bis zur Bildschirmschrift",
    "Dieselben Zeichen, neue Träger: Stein, Bronze, Papier, Pixel",
    "Am Bildschirm entstehen neue Schriftschnitte — die Entwicklung läuft weiter",
    "Pointe: eine 3200 Jahre alte Schrift ist heute vollständig digital"
  ],

  "Zeitleiste der Schriften": [
    "Die Zeitachse als Ordnungshilfe anbieten — sie zeigt die Reihenfolge, nicht die Abstände",
    "Marken der Reihe nach anfahren und je einen Satz sagen",
    "Kernkriterium wiederholen — „Schrift bildet Sprache ab, nicht Dinge“: Eine Zeichnung von einem Pferd zeigt ein Pferd, das jeder in jeder Sprache erkennt — das ist keine Schrift. Schrift liegt erst vor, wenn man den Text vorlesen kann, Wort für Wort, in einer bestimmten Sprache: „Der König befahl, drei Pferde zu opfern.“ Das kann man nicht zeichnen, nur schreiben",
    "Das Fragezeichen bei „Zeichenschrift (Jiǎhú) ? ca. 6600 v. Chr.“ bedeutet: Es ist nicht gesichert, ob das überhaupt Schrift ist — die Marken erfüllen die Kriterien nicht. Die Jahreszahl ist sicher, die Einordnung als Schrift nicht",
    "Sichtbar machen, wie spät die chinesische Schrift einsetzt — und wie lange sie durchhält",
    "Zwischenfrage: Welche Schrift war am längsten in Gebrauch? Lösung: Die Keilschrift (ca. 3300 v. Chr. bis 1. Jh. n. Chr., gut 3300 Jahre) und die Hieroglyphen (ca. 3200 v. Chr. bis 394 n. Chr., gut 3500 Jahre) waren länger in Gebrauch als die chinesische bisher — aber sie sind ausgestorben. Die chinesische Schrift (seit ca. 1250 v. Chr., gut 3200 Jahre) ist die älteste, die heute noch benutzt wird — und läuft weiter"
  ],

  "Pinsel und Papier": [
    "Wieder die Leitfrage: Womit wird geschrieben — und was macht das mit der Schrift?",
    "Der Pinsel erlaubt Druckmodulation: dünn und dick im selben Strich",
    "Erst dadurch werden Kalligraphie und die charakteristischen Strichenden möglich",
    "Wann wurde Papier erfunden? Die ältesten Papierfunde stammen aus dem 2. Jahrhundert v. Chr. (Fàngmǎtān bei Tiānshuǐ mit einer gezeichneten Landkarte, Bàqiáo bei Xī’ān) — also rund 200 Jahre vor Cài Lún",
    "Richtigstellung: Cài Lún, ein Beamter am Kaiserhof, hat das Papier um 105 n. Chr. nicht erfunden, sondern standardisiert: Er verbesserte das Rezept — billige Rohstoffe wie Rinde, Lumpen, alte Netze —, legte das Verfahren schriftlich fest und ließ es in den kaiserlichen Werkstätten einheitlich anwenden; so wurde Papier gleichbleibend gut und in großer Menge herstellbar",
    "Rückbezug — dreimal derselbe Mechanismus: der Stoff bestimmt die Form. Ton (ab ca. 3300 v. Chr.): das Rohr drückt Keile → Keilschrift · Stein (ab ca. 3200 v. Chr.): der Meißel schlägt Bilder → Hieroglyphen, Papyrus (ab ca. 3000 v. Chr.) mit Binse → schnelle Kursive · Papier (ab ca. 200 v. Chr., standardisiert 105 n. Chr.) mit weichem Pinsel → dicke und dünne Striche, Kanzlei-, Regel- und Kursivschrift"
  ],

  "Papierherstellung": [
    "Kurz die Rohstoffe nennen — die nächste Folie zeigt sie im Bild: Hanf, alte Lumpen, Fischnetze, Baumrinde, Bast des Maulbeerbaums",
    "Fünf Schritte anhand der Bilder durchgehen: ernten, kochen, schöpfen, pressen, trocknen",
    "Der Witz des Verfahrens: aus Abfall wird ein hochwertiger Schreibstoff",
    "Papier ist billig und leicht — Schrift wird damit massenhaft möglich"
  ],

  "Die vier Schätze": [
    "文房四宝 wénfáng sìbǎo — die vier Schätze des Studierzimmers",
    "Der Reihe nach benennen: 笔 bǐ Pinsel · 墨 mò Tusche · 纸 zhǐ Papier · 砚 yàn Reibstein",
    "Pinsel: die Spitze aus Tierhaar — Ziegenhaar (weich), Wiesel- oder Marderhaar (elastisch, 狼毫 lángháo), Kaninchenhaar (kräftig), oft gemischt; der Stiel meist aus Bambus, bei edlen Pinseln auch aus Holz, Horn, Jade oder Porzellan",
    "Tusche: Ruß (aus verbranntem Kiefernholz oder Öl) wird mit tierischem Leim gemischt, oft mit Duftstoffen wie Moschus oder Kampfer, in Formen gepresst und getrocknet — so entsteht der feste Tuschestab",
    "Reibstein: ein flacher Stein mit Mulde, meist aus feinkörnigem Schiefer oder Tonstein; am berühmtesten der 端砚 duānyàn aus Zhàoqìng (Provinz Guǎngdōng). Auf ihm wird der Tuschestab mit etwas Wasser gerieben, bis flüssige Tusche entsteht",
    "Kurz erklären, wie Tusche gerieben wird — das Reiben ist Teil der Konzentration",
    "Bis heute die Grundausstattung der Kalligraphie",
    "Wenn ein Set vorhanden ist: herumgeben lassen"
  ],

  "Kreation und Transformation": [
    "Kapiteltrenner — kurz durchatmen lassen",
    "Ansage: Ab jetzt geht es nicht mehr um Geschichte, sondern um den Bauplan",
    "Die Leitfrage nennen: Wie entsteht ein Zeichen — und wie kann man es sich erschließen?",
    "Ankündigen: sechs Bildungsarten, aber nur vier sind wirklich wichtig"
  ],

  "Piktogramme 象形": [
    "Kategorie 1 — 象形 xiàngxíng, „die Form abbilden“",
    "Entstehung: der Umriss eines Gegenstands wird nachgezeichnet",
    "Beispiele an der Tafel entwickeln lassen: 人 · 雨 · 刀 · 木",
    "Anteil nennen und relativieren: nur 2–4 % der Zeichen",
    "Warum keine genaue Zahl: (1) Es hängt davon ab, welchen Zeichenbestand man zählt — die 9353 Zeichen des Shuōwén (dort rund 360 Piktogramme ≈ 4 %) oder ein heutiges Wörterbuch mit 10.000–20.000 Zeichen (dann eher 2 %); (2) die Forscher sind sich bei manchen Zeichen nicht einig, ob sie Bild oder Zusammensetzung sind. Konkret: Es geht um etwa 300–600 Zeichen",
    "„Die produktivsten Bausteine“ heißt: Aus diesen wenigen Bildzeichen werden fast alle anderen Zeichen gebaut — 木 steckt in 林 森 桌 椅 树 und Hunderten weiteren, 人/亻 in 你 他 休 做. Wer die Piktogramme kennt, kennt die Bausteine des ganzen Systems",
    "Warnung vor dem verbreiteten Irrtum: Chinesisch ist keine Bilderschrift"
  ],

  "Ideogramme 指事": [
    "Kategorie 2 — 指事 zhǐshì, „auf Tatbestände deuten“",
    "Der Unterschied zum Piktogramm in einem Satz: Das Piktogramm bildet ein Ding ab (木 zeigt den Baum); das Ideogramm macht auf etwas aufmerksam, das man nicht zeichnen kann — es markiert eine Stelle oder eine Vorstellung (本 markiert die Wurzel am Baum, 上 zeigt „oben“). Statt „hinzeigen“ also: „mit einem Zeichen auf etwas deuten, markieren“",
    "Einfache Fälle zuerst: 一 二 三, dann 上 und 下 an der gedachten Grundlinie",
    "Feinere Fälle: 末 Ende · 勿 Fähnchen zum Abwinken · 中 Pfeil und Scheibe",
    "Anteil: unter 1 % — klein, aber didaktisch unentbehrlich"
  ],

  "Striche als Indikatoren": [
    "Das Prinzip an einem einzigen Zeichenpaar vorführen: 木 → 本 běn Wurzel und 木 → 末 mò Wipfel, Spitze",
    "Auf die Position des Strichs zeigen — unten die Wurzel, oben der Wipfel (Achtung: 末 mò mit langem oberem Strich, nicht 未 wèi)",
    "Drittes Beispiel 刀 dāo „Messer“ → 刃 rèn „Klinge, Schneide“: Ein kurzer Punkt-Strich wird genau dorthin gesetzt, wo das Messer scharf ist — er zeigt: Gemeint ist nicht das ganze Messer, sondern nur seine scharfe Kante",
    "Merksatz: die Lage des Strichs trägt die Bedeutung — der Zusatzstrich hat selbst keine Bedeutung, erst seine Stelle am Grundzeichen sagt, welcher Teil gemeint ist: unten = Wurzel, oben = Wipfel, an der Klinge = Schneide",
    "Übungsimpuls: Wo müsste ein Strich sitzen, der den Stamm markiert? Auflösung auf der Folie: in der Mitte — 朱 zhū, ursprünglich „Stamm“ (heute „zinnoberrot“). Und „Ast“? Dafür gibt es kein Strich-Zeichen: 枝 zhī ist ein Phonogramm aus 木 (Sinn) + 支 zhī (Laut)"
  ],

  "Zeichen verknüpfen": [
    "Überleitung zur dritten Methode: bestehende Zeichen verbinden",
    "„Kein Laut ist im Spiel“ heißt nicht, dass das Zeichen nicht ausgesprochen wird — natürlich hat 休 eine Aussprache (xiū). Gemeint ist: Die Bestandteile liefern nur ihre Bedeutung, keinen Hinweis auf die Aussprache. 休 = Mensch 亻 + Baum 木 → „ausruhen“; aber weder rén noch mù klingt wie xiū. Man kann die Aussprache aus den Teilen nicht ableiten",
    "Das neue Zeichen trägt die Bedeutungen der Bestandteile in sich",
    "„Damit ist die nächste Kategorie vorbereitet“: Die nächste Folie zeigt 会意 huìyì, die vereinigten Bedeutungen — genau diese Art von Zeichen. Und der Gegensatz „nur Bedeutung, kein Laut“ bereitet die übernächste wichtige Kategorie vor, die Phonogramme, bei denen ein Teil den Laut liefert"
  ],

  "Vereinigte Bedeutungen 会意": [
    "Kategorie 3 — 会意 huìyì, die Bedeutungen addieren sich",
    "Die Karten einzeln anklicken und raten lassen, bevor die Auflösung erscheint",
    "亻+ 木 = 休 xiū ausruhen · 女 + 子 = 好 hǎo gut",
    "禾 + 火 = 秋 qiū Herbst: 禾 hé ist die Getreidepflanze, genauer die reife Hirse- oder Reisähre mit hängendem Kopf (Getreide heißt allgemein 谷物 gǔwù oder 粮食 liángshi). Getreide + Feuer: Im Herbst ist das Korn reif und wird geerntet; danach brannte man die Stoppeln auf den Feldern ab — oder: das Korn ist reif wie vom Feuer „gelb gebrannt“",
    "夕 + 口 = 名 míng Name: 夕 xī ist der Abend, die Dämmerung (ein Halbmond); 口 der Mund. Die Deutung des Shuōwén: Im Dunkeln kann man den anderen nicht sehen — also ruft man mit dem Mund seinen Namen, damit er weiß, wer kommt. Der Name ist das, was man ruft, wenn das Sehen nicht mehr reicht",
    "Anteil nennen: nur rund 2,8 % — die Kategorie ist einprägsamer als sie häufig ist",
    "Ehrlich bleiben: manche Deutungen sind nachträglich hineingelesen"
  ],

  "Neue Wörter ohne neue Zeichen": [
    "Die zentrale Unterscheidung setzen: 字 zì ist das Zeichen, 词 cí ist das Wort",
    "Für jedes neue Konzept ein neues Zeichen wäre möglich — aber nicht sinnvoll",
    "Stattdessen werden bekannte Zeichen kombiniert",
    "Am Beispiel zeigen: 电 + 话 = Telefon · 电 + 脑 = Computer · 火 + 车 = Zug",
    "Die gute Nachricht für Lernende: Der Wortschatz wächst schneller als die Zeichenzahl"
  ],

  "Phonetikum und Signifikum": [
    "Jetzt kommt die wichtigste Folie des ganzen Vortrags — warum: Rund 90 % aller Zeichen sind nach diesem einen Prinzip gebaut. Wer es verstanden hat, kann neun von zehn Zeichen zerlegen, sich merken und oft Bedeutungsfeld und Aussprache erraten. Alles, was vorher kam, war Vorbereitung (Bild und Laut in Ägypten, Piktogramme als Bausteine); alles, was danach kommt (Radikale, Wörterbuch), baut darauf auf",
    "Die Formel an die Tafel: Zeichen C = Signifikum B + Phonetikum A",
    "女 gibt das Bedeutungsfeld, 马 gibt nur den Klang — zusammen 妈 mā",
    "Ausdrücklich sagen: Das Pferd hat mit der Mutter nichts zu tun",
    "Zeit lassen — hier entscheidet sich, ob der Rest verstanden wird"
  ],

  "Phonogramme in der Anwendung": [
    "Das Prinzip gegenprobieren: ein Radikal, zwei verschiedene Lautgeber",
    "沐 mù baden — Wasser gibt den Sinn, 木 mù den Laut",
    "淋 lín begießen — dasselbe Wasser, aber 林 lín gibt den Laut",
    "Merksatz: Das Bedeutungsfeld bleibt, der Lautgeber entscheidet über die Aussprache",
    "Einschränkung „ungefähr“: Der Lautgeber verrät die heutige Aussprache oft nicht genau, sondern nur ähnlich — gleiche Silbe mit anderem Ton, gleicher Auslaut mit anderem Anlaut. Beispiele: 青 qīng → 请 qǐng (anderer Ton), 晴 qíng, 猜 cāi (ganz anders), 精 jīng (anderer Anlaut)",
    "„Die Sprache hat sich verändert“: Die Zeichen wurden vor rund 3000 Jahren gebildet, als das Chinesische anders klang. Damals reimten sich Lautgeber und Zeichen; seitdem haben sich die Laute verschoben, die Zeichen aber nicht. Beispiel: 江 jiāng „Strom“ hat den Lautgeber 工 gōng — im Altchinesischen klangen beide ähnlich (etwa kroŋ und koŋ), heute nicht mehr. Ebenso 海 hǎi mit dem Lautgeber 每 měi. Vergleich Deutsch: Wir schreiben „Knie“ mit k, weil man es früher sprach",
    "Trotzdem: In rund einem Viertel bis einem Drittel der Fälle stimmt die Silbe noch; meist hilft der Lautgeber zumindest beim Merken"
  ],

  "Phonogramme 形声": [
    "Die Zahl groß stehen lassen: rund 90 % aller Zeichen",
    "„Neun von zehn Zeichen enthalten eine Lautkomponente“ — an den Beispielen auf der Folie: 妈 mā = 女 Frau + 马 mǎ · 河 hé Fluss = 氵 Wasser + 可 kě · 饭 fàn Essen = 饣 Nahrung + 反 fǎn · 请 qǐng bitten = 讠 Sprache + 青 qīng · 们 men = 亻 Mensch + 门 mén",
    "Das Bauprinzip auf der Folie: ein Teil zeigt das Bedeutungsfeld (links, grün), der andere die Aussprache (rechts, blau)",
    "Daraus die Lernstrategie ableiten: nicht auswendig malen, sondern zerlegen",
    "„Wer dieses Bauprinzip versteht, versteht das System“: Das System ist die chinesische Schrift als Ganzes — statt Zehntausende Einzelbilder zu lernen, lernt man einige Hundert Bausteine und das eine Baugesetz, nach dem sie kombiniert werden. Wie beim Lego: wenige Steinsorten, unzählige Bauwerke",
    "Rückblick: das ist derselbe Schritt vom Bild zum Laut wie in Ägypten und Mesopotamien"
  ],

  "Bedeutungstragende Bestandteile I": [
    "Die Tabelle ist zum Nachschlagen, nicht zum Vorlesen",
    "Neu: Mit dem Cursor über ein Beispielzeichen in der dritten Spalte fahren — es erscheint groß mit seiner Zerlegung: Signifikum (Sinnträger, grün) + Phonetikum (Lautgeber, blau) mit Aussprache und Bedeutung",
    "Signifikum = der Bestandteil der Zeile, der das Bedeutungsfeld angibt; Phonetikum = der andere Teil, der die Aussprache andeutet. Beispiel 吃 chī essen = 口 Mund (Signifikum) + 乞 qǐ (Phonetikum)",
    "Achtung beim Durchgehen: nicht jedes Beispiel ist ein Phonogramm — manche sind 会意-Zeichen ohne Lautgeber (z. B. 休 oder 看 = Hand über Auge); das Popup sagt es dann",
    "Drei, vier Zeilen exemplarisch durchgehen — 氵, 亻, 讠 eignen sich",
    "Die Kernaussage betonen: das Radikal grenzt ein Bedeutungsfeld ein, es definiert nicht",
    "Publikum raten lassen: Was könnte 冷 bedeuten, wenn 冫 „Eis“ heißt?",
    "Hinweis: dieselbe Tabelle steht im Reader"
  ],

  "Bedeutungstragende Bestandteile II": [
    "Fortsetzung — und die entlastende Zahl: von 214 Radikalen sind nur etwa 50 wirklich produktiv",
    "Auch hier: Cursor über die Zeichen der dritten Spalte zeigt Signifikum und Phonetikum",
    "Wieder nur einige Zeilen herausgreifen, etwa 扌, 忄, 钅",
    "Auf die Formvarianten hinweisen: 火 links, 灬 unten",
    "贝 als schönes Beispiel — Muschel als Geldzeichen, daher 财 买 贵",
    "Lernempfehlung geben: diese 50 lohnen sich wirklich"
  ],

  "Zeichen-Grundstriche": [
    "Definition zuerst: Alles, was in einem Zug gezeichnet wird, ist ein Strich",
    "Die fünf Grundtypen nennen — 点 diǎn Punkt · 横 héng waagerecht · 竖 shù senkrecht · 撇 piě nach links unten fallend · 捺 nà nach rechts unten auslaufend",
    "Dann die zusammengesetzten: 提 tí nach rechts oben ansteigend, die Haken 钩 gōu und die Knicke 折 zhé",
    "Jeden Strich in der Luft mitzeichnen lassen — Bewegung prägt sich besser ein als Bilder",
    "Zweck erklären: mit diesen Namen lässt sich über Zeichen sprechen und Strichzahl zählen"
  ],

  "Die Regeln der Strichfolge": [
    "Die Regeln nicht vorlesen, sondern an je einem Zeichen vorführen",
    "Grundrichtung: erst waagerecht, dann senkrecht — 十 · erst 撇, dann 捺 — 人",
    "Gliederung: von oben nach unten, von links nach rechts — 三 · 你",
    "Rahmen: erst außen, dann innen, zuletzt schließen — 国",
    "Bild vom Haus: erst die Mauern, dann das Haus hinein, zuletzt das Tor (先里头后封口) — 国 vorführen",
    "Gegenfälle: Rahmen nach unten offen (月 风 同) außen zuerst · nach oben offen (凶 这 道) innen zuerst",
    "Mitte und Punkte: erst die Mitte, dann die Seiten — 小 · Punkt oben rechts zuletzt — 我",
    "Beruhigen: die Regeln folgen der natürlichen Handbewegung, sie sind nicht willkürlich",
    "Die Tafel rechts abfotografieren lassen — sie taucht im Übungsblatt und im Reader wieder auf"
  ],

  "Strichfolge selbst prüfen": [
    "Praktischer Teil: die Strichfolge lässt sich zu jedem Zeichen animiert abrufen",
    "Drei Werkzeuge nennen — leo.org, Pleco, Skritter",
    "Empfehlung: bei jedem neuen Zeichen einmal die Animation ansehen",
    "Der eigentliche Nutzen: die Kontrolle, ob ein Zeichen geschrieben oder nur abgemalt wurde",
    "Wenn Internet vorhanden ist: ein Zeichen live vorführen"
  ],

  "Was ist ein Radikal?": [
    "Begriff klären: 部首 bùshǒu heißt wörtlich „Kopf der Abteilung“",
    "Doppelte Rolle: Bedeutungsträger einerseits — 氵 zeigt „hat mit Wasser zu tun“ — und Ordnungskriterium im Wörterbuch andererseits (alle Zeichen mit demselben Radikal stehen im Wörterbuch in einer gemeinsamen Abteilung, so wie im deutschen Lexikon alle Wörter mit A am Anfang zusammenstehen; das Radikal ersetzt also den Anfangsbuchstaben)",
    "Wichtig: jedes Zeichen hat genau ein Radikal — nicht zwei",
    "„Die Zuordnung ist manchmal rein traditionell“: Bei manchen Zeichen ist der Bestandteil, unter dem das Wörterbuch sie einordnet, nicht der, der die Bedeutung trägt — man hat ihn einmal so festgelegt, und alle späteren Wörterbücher haben es übernommen. Beispiele: 问 wèn „fragen“ steht unter 门 Tür, obwohl 口 Mund die Bedeutung trägt; 和 hé steht unter 禾 oder 口, je nach Wörterbuch. Deshalb wirkt die Zuordnung willkürlich",
    "„Kein Fehler des Lernenden, sondern eine Eigenheit des Systems“ heißt: Wenn Sie ein Zeichen unter dem „logischen“ Radikal nicht finden, haben Sie nicht falsch gedacht — das System selbst ist an dieser Stelle unlogisch. Dann einfach das andere Bauteil probieren"
  ],

  "Die Tafel der 214 Radikale": [
    "Die Tafel zeigen und die Ordnung erklären: Die 214 Radikale sind nach ihrer eigenen Strichzahl geordnet, von 1 bis 17 Strichen — zuerst alle Radikale mit einem Strich (一 丨 丶 丿 乙 亅), dann alle mit zwei (二 亠 人 儿 …) usw. Jedes hat eine feste Nummer: 人 ist Nr. 9, 水 Nr. 85, 木 Nr. 75",
    "Wie man die Tafel liest: (1) Radikal im Zeichen bestimmen, (2) seine Striche zählen, (3) in der Gruppe mit dieser Strichzahl suchen, (4) dort steht die Nummer bzw. die Seite, auf der seine Abteilung im Wörterbuch beginnt",
    "Warum diese Ordnung: Sie ist das chinesische Gegenstück zum ABC — die Zahl der Striche ist das Einzige, was jeder an einem unbekannten Zeichen sicher feststellen kann, auch ohne die Aussprache zu kennen",
    "Nicht abschrecken lassen — niemand lernt diese Tafel auswendig",
    "Man braucht sie nur zum Nachschlagen, und nur die vorderen Gruppen häufig",
    "Auf die Lupe hinweisen: mit dem Cursor über die Ausschnitte fahren"
  ],

  "Position des Radikals": [
    "Fünf Stellungen durchgehen: links, rechts, oben, unten, außen",
    "Häufigste Anordnung: links der Sinn, rechts der Laut — 江 jiāng Strom = 氵 Wasser (Sinn) + 工 gōng (Laut) · 说 shuō sprechen = 讠 Sprache (Sinn) + 兑 duì (Laut, heute nur noch entfernt) · 河 hé Fluss = 氵 Wasser (Sinn) + 可 kě (Laut)",
    "Sofort einschränken: verlässlich ist das nicht",
    "Formwechsel zeigen: 火 links in 烧, unten als 灬 in 热",
    "Praktischer Rat erklärt: Bei manchen Zeichen ist unklar, welcher Teil das Radikal ist — z. B. 想 xiǎng: 木, 目 oder 心? Dann im Radikalverzeichnis (Index) des Wörterbuchs nacheinander unter beiden möglichen Teilen nachsehen. Einer der beiden Wege führt fast immer zum Ziel (想 steht unter 心)"
  ],

  "Die Ordnung des Wörterbuchs": [
    "Die historische Linie in vier Schritten — 说文解字 Shuōwén jiězì 540 Radikale · 字汇 Zìhuì 214 · 康熙字典 Kāngxī zìdiǎn verbindlich · heute 201 bis 227",
    "Warum heute 201 bis 227: Es gibt keine einheitliche Zählung, weil jedes Wörterbuch selbst entscheidet, ob es Varianten wie 氵 und 水 oder 亻 und 人 als ein Radikal oder als zwei zählt und ob es vereinfachte Formen (讠 neben 言) eigens aufführt. Die chinesische Norm von 2009 (汉字部首表) legt 201 Hauptradikale fest; Wörterbücher, die Varianten einzeln aufführen, kommen auf über 220",
    "Die treibende Kraft benennen: etymologische Ordnung = nach der Herkunft und Bedeutung — Xu Shen ordnete jedes Zeichen unter den Bestandteil, der seine ursprüngliche Bedeutung erklärt, auch wenn er schwer zu erkennen war (daher 540 Gruppen). Praktische Auffindbarkeit = so, dass ein Leser das Zeichen schnell findet — wenige, gut sichtbare Radikale, auch wenn die Zuordnung nicht immer die Bedeutung trifft",
    "说文解字 Shuōwén jiězì von 100 n. Chr. ist bis heute die Quelle aller Etymologie",
    "Warnung: verschiedene Wörterbücher zählen verschieden — immer die Radikaltafel (das Radikalverzeichnis 部首目录 vorn im Band) des eigenen Wörterbuchs benutzen, nicht die aus einem anderen Buch oder aus dem Internet"
  ],

  "Wege zum unbekannten Zeichen": [
    "Drei Wege nebeneinanderstellen: Pinyin, Radikal, Gesamtstrichzahl",
    "Pinyin ist der schnellste — aber nur, wenn man die Aussprache schon kennt",
    "Der Radikalweg ist der einzige, der immer funktioniert",
    "Heute dominiert die Handschrifterkennung auf dem Telefon",
    "Trotzdem lohnt der klassische Weg: er zwingt zur Analyse des Zeichens"
  ],

  "Schriftreform 1956": [
    "Datum nennen: angenommen am 28. Januar 1956, veröffentlicht am 31. Januar im 人民日报",
    "Ziel der Reform: Alphabetisierung — weniger Striche, schneller lernbar",
    "Die fünf Methoden an der Tabelle vorführen: 馬→马, 龍→龙, 圖→图, 單→单, 認→认",
    "Geltungsbereich: Kurzzeichen auf dem Festland, in Singapur (seit 1969/1976 offiziell) und in Malaysia; Langzeichen in Taiwan, Hongkong und Macau sowie in vielen älteren Auslandsgemeinden. Singapur benutzt also Kurzzeichen, nicht Langzeichen",
    "Japan: schreibt mit Kanji (chinesischen Zeichen, rund 2100 im Alltag) plus zwei eigenen Silbenschriften (Hiragana, Katakana), die aus chinesischen Zeichen entstanden sind. 1946 hat Japan eigene, nur teilweise gleiche Vereinfachungen eingeführt: 学 und 国 wie in China, aber 気 statt 气, 図 statt 图, 広 statt 广; viele Zeichen blieben in der Langform (z. B. 東 statt 东). Die Aussprache ist ganz anders — 山 heißt yama oder san",
    "Korea: schreibt heute fast nur Hangeul, ein 1443/46 erfundenes Buchstabensystem, dessen Buchstaben zu silbenförmigen Blöcken gebündelt werden — es sieht aus wie Zeichen, ist aber ein Alphabet. Chinesische Zeichen (Hanja) stehen nur noch in Namen, Fachwörtern, Zeitungen; in Nordkorea sind sie abgeschafft",
    "Kontroverse ansprechen: der Verlust an etymologischer Durchsichtigkeit — 愛 ohne 心",
    "Auf die Lupe hinweisen: Cursor auf den Zeitungsausschnitt"
  ],

  "Wie viele Zeichen braucht man?": [
    "Die Zahlen ruhig nennen — sie beruhigen mehr als sie schrecken",
    "3000 Zeichen in sechs Schuljahren genügen für Bücher und Zeitungen; ab 1500 Zeichen gilt man nicht mehr als Analphabet; Gebildete beherrschen rund 6000",
    "Der oft zitierte Wert: mit den 3500 häufigsten Zeichen kennt man 99,7 % der Zeichen eines Textes",
    "Kritisch einordnen — Zeichen kennen heißt nicht Text verstehen: Oft kennt man jedes Zeichen eines Satzes und versteht ihn trotzdem nicht, weil zwei bekannte Zeichen zusammen ein neues Wort mit eigener Bedeutung bilden",
    "Beispiele: 东西 dōngxi = Ost + West = „Ding, Sache“ · 马上 mǎshàng = Pferd + auf = „sofort“ · 小心 xiǎoxīn = klein + Herz = „Vorsicht“ · 打听 dǎting = schlagen + hören = „sich erkundigen“ · dazu Redewendungen (成语) aus vier Zeichen, die auf alte Geschichten anspielen",
    "Deshalb: Die 99,7 % beziehen sich auf Zeichen, nicht auf Wörter. Wer lesen will, braucht neben ~3000 Zeichen einen Wortschatz von etwa 8000–10.000 Wörtern (HSK 6) bis über 11.000 (HSK 7–9) — ob 3000 Zeichen „reichen“, ist also fraglich",
    "Vergleich Deutsch: Der Rechtschreib-Duden (29. Auflage 2024) hat rund 151.000 Stichwörter — Wörter, nicht Zeichen! Ein Taschenwörterbuch hat etwa 30.000–50.000; ein durchschnittlicher Sprecher benutzt aktiv rund 12.000–16.000 Wörter und versteht etwa 50.000. Die gehörte Zahl „10.000“ trifft also eher den aktiven Wortschatz",
    "Richtiger Vergleich also: 26 Buchstaben ↔ ~3000 Zeichen; deutsches Wörterbuch mit Wörtern ↔ chinesisches Wörterbuch 现代汉语词典 mit rund 13.000 Zeichen und rund 70.000 Wörtern",
    "Daraus die Lernstrategie ableiten: Häufigkeit schlägt Vollständigkeit — und immer Wörter lernen, nicht nur Einzelzeichen"
  ],

  "Grundregeln der Strichfolge I": [
    "Die Warum-Frage zuerst beantworten — sonst wirken die Regeln wie Schikane",
    "Vier Gründe nennen: Schreibökonomie, Form, Lesbarkeit der Kursive, Nachschlagen",
    "Form: Jeder Strich wird im Verhältnis zu den schon geschriebenen gesetzt — Länge, Abstand, Lage richten sich nach ihnen. Wer in der richtigen Folge schreibt, baut das Zeichen von einem festen Gerüst aus auf (erst der lange Querstrich, dann was darunter hängt); wer durcheinander schreibt, hat beim späten Strich keinen Bezugspunkt — das Zeichen wird schief, zu breit oder unausgewogen",
    "Nachschlagen (Strichzahl und Strichfolge als Ordnungskriterien im Wörterbuch): In Wörterbüchern ohne Pinyin sucht man Zeichen über die Zahl ihrer Striche, und innerhalb gleicher Strichzahl über die Art des ersten Strichs (横 vor 竖 vor 撇 vor 点 vor 折). Wer falsch zählt oder den ersten Strich nicht kennt, findet das Zeichen nicht — Akt X zeigt das",
    "Merksatz: Die Strichfolge ist kein Ritual, sondern eine Technik"
  ],

  "Die Grundstriche und ihre Namen": [
    "永字八法 yǒngzì bāfǎ — die acht Prinzipien im Zeichen 永 yǒng „ewig“",
    "Der Trick der klassischen Didaktik: ein Zeichen enthält alle wesentlichen Bewegungen",
    "Die fünf Grundtypen wiederholen: 横 héng · 竖 shù · 撇 piě · 点 diǎn · 折 zhé",
    "永 gemeinsam schreiben — langsam, Strich für Strich",
    "Nutzen der Namen: man kann über Zeichen sprechen, ohne sie zu zeichnen"
  ],

  "Strichfolge: 你 und 我": [
    "Zwei Zeichen, die jeder kennt — und beide mit einer Falle",
    "你 nǐ in sieben Strichen durchgehen: 亻 rén (Mensch-Radikal) zuerst — 撇 piě, 竖 shù —, dann 尔 ěr: 撇 piě (Dachschräge), 横钩 hénggōu, 竖钩 shùgōu, 撇 piě links, Punkt 点 diǎn rechts zuletzt",
    "我 wǒ durchgehen: 撇 piě, 横 héng, 竖钩 shùgōu, 提 tí, der große 斜钩 xiégōu von 戈 gē (Hellebarde), 撇 piě, dann der Punkt 点 diǎn",
    "Der Prüfstein in beiden Fällen: Wo sitzt der Punkt? — immer zuletzt",
    "Alle mitschreiben lassen und die Reihenfolge laut mitzählen"
  ],

  "Der Umgang mit dem Wörterbuch": [
    "Die Ausgangsfrage stellen: Wie finde ich ein Zeichen, das ich nicht aussprechen kann?",
    "Den Aufbau des Wörterbuchs erklären — drei Teile",
    "部首目录 Radikalverzeichnis · 检字表 Zeichenindex · Hauptteil",
    "Ankündigen: die nächsten vier Folien machen das an 他 durch",
    "Wenn Bände vorhanden sind: jetzt austeilen und mitsuchen lassen"
  ],

  "Schritt 1 und 2: Radikal finden": [
    "Schritt 1 — das Zeichen zerlegen: links 亻 Mensch, rechts 也 als Lautgeber",
    "Schritt 2 — Striche des Radikals zählen: 亻 hat zwei, also Gruppe 二画",
    "Die häufigste Fehlerquelle sofort benennen: die 10 daneben ist keine Radikalnummer",
    "Sie ist die Seitenzahl im Zeichenindex",
    "Langsam vorgehen — hier scheitern die meisten"
  ],

  "Schritt 3: Die Radikalabteilung": [
    "Schritt 3 — auf Seite 10 steht die Abteilung aller Zeichen mit dem Radikal 亻",
    "Die Gliederung erklären: nach der Zahl der zusätzlichen Striche, 一画, 二画, 三画",
    "Die Rechnung vorführen: 他 hat 5 Striche, das Radikal 2 — bleiben 3",
    "Also die Untergruppe 三画 aufsuchen",
    "Merksatz: Gesamtstriche minus Radikalstriche gleich Reststriche"
  ],

  "Schritt 4: Das Zeichen finden": [
    "Schritt 4 — der Erfolgsmoment: aus Zehntausenden Zeichen sind neun Kandidaten geworden",
    "Die neun kurz zeigen und 他 heraussuchen lassen",
    "Zweite Zahl erklären: 851 ist die Seite im Hauptteil, nicht im Index",
    "Nochmals der Warnhinweis: die beiden Zahlen nicht verwechseln"
  ],

  "Am Ziel: der Eintrag": [
    "Am Ziel — Seite 851, 他 tā „er“",
    "Den Eintrag gemeinsam lesen: Umschrift, Bedeutungen, Beispiele",
    "Vier Verwendungen zeigen: „er“, geschlechtsneutral, bedeutungsleer, „ein anderer“",
    "Zwei Konventionen erklären: die Tilde ～ vertritt das Stichwort, 另见 verweist auf eine weitere Lesung",
    "Fazit: Der Weg dauert eine Minute — und man hat das Zeichen wirklich analysiert"
  ],

  "Merkblatt: nachschlagen": [
    "Das Merkblatt als Zusammenfassung der fünf Schritte",
    "Empfehlung: abfotografieren oder ausdrucken und beim ersten Üben danebenlegen",
    "Die drei häufigsten Fehler ausdrücklich wiederholen",
    "Die beiden Zahlen verwechseln · falsch zählen · das falsche Radikal wählen",
    "Übungsaufgabe anbieten: 河 oder 妈 selbst nachschlagen lassen"
  ],

  "Kategorien im Überblick": [
    "六书 liùshū — jetzt der Gesamtüberblick über die sechs Bildungsarten",
    "Die Stationen einzeln anklicken und jeweils ein Beispiel nennen lassen",
    "Die Gewichtung klarstellen: 形声 rund 90 %, alles andere zusammen der Rest",
    "Die letzten beiden Kategorien einordnen — sie bilden keine neuen Zeichen, sie nutzen vorhandene um",
    "Abschlussfrage: Zu welcher Kategorie gehört 妈? Und 好?"
  ],

  "Zeichenschreibblatt": [
    "Das Übungsblatt vorstellen — Quadrat mit Mittelkreuz und Diagonalen",
    "Das Prinzip erklären: ein Zeichen füllt genau ein Quadrat, gleich viel Raum für 一 wie für 警",
    "Mittelkreuz gibt die Achsen, Diagonalen die Balance",
    "Zum Drucken auffordern — der Knopf öffnet das Blatt direkt",
    "Übungsempfehlung: ein Zeichen zehnmal, nicht zehn Zeichen einmal"
  ],

  "Reader": [
    "Den Reader ankündigen: alles Behandelte ausformuliert zum Nachlesen",
    "Vier Teile nennen — Schriftgeschichte, Entwicklungsstufen, die sechs Bildungsarten, Striche und Wörterbuch",
    "Wichtiger Hinweis: er enthält auch die Texte aus den Lesekästen, Kurztext wie Vertiefung",
    "Damit muss im Vortrag nichts mitgeschrieben werden"
  ],

  "Zusammenfassung": [
    "Der ganze Vortrag auf einer Folie — nicht vorlesen, sondern gliedern",
    "Erster Block: Zeichen vor der Schrift — Jiǎhú und Vinča, das Kriterium der Sprachbindung",
    "Zweiter Block: die ersten Schriftsysteme und der Schritt vom Bild zum Laut",
    "Dritter Block: das Alphabet und die feste Reihenfolge",
    "Vierter Block: die chinesischen Stufen von 甲骨文 bis heute",
    "Letzter Block: der Bauplan der Zeichen — 形声 ist der Schlüssel",
    "Mit dem Merksatz schließen: Zeichen werden nicht gemalt, sie werden gebaut"
  ],

  "Quiz": [
    "Drei Quizze, drei Schwierigkeitsgrade — jeder kann wählen",
    "Quiz 1 fragt nur ab, was auf den Folien stand",
    "Quiz 2 nimmt die Kurztexte aus den Lesekästen dazu",
    "Quiz 3 verlangt zusätzlich die Vertiefungen",
    "Empfehlung: heute Quiz 1 gemeinsam, die anderen beiden zu Hause"
  ],

  "Abschluss": [
    "加油 jiā yóu — wörtlich „Öl geben“, im Sinne von „Dranbleiben!“",
    "Die zentrale Botschaft wiederholen: Zeichen sind gebaut, nicht gemalt",
    "Konkreter nächster Schritt: die 50 produktiven Radikale und das Übungsblatt",
    "Auf Reader, Übungsblatt und Quizze verweisen",
    "Für Fragen zur Verfügung stehen und sich bedanken"
  ],

  "HSK 3.0 – Material": [
    "Ausblick: Wer nach diesem Vortrag weiterlernen will, findet hier alles zur neuen HSK-Prüfung 3.0 (Prüfungsplan 2025, weltweit ab Dezember 2026)",
    "Vier Zugänge vorstellen, jeder mit QR-Code und Link: Wortlisten (Stufe 1 bis 7–9, mit Beispielsätzen), Zeichenlisten (alle 3088 Lesezeichen mit Pinyin, Bauteilen, Bedeutung), Grammatikliste (593 Strukturen) und HSK-Prüfungen (offizielle Musterprüfungen und Übungstests)",
    "Rückbezug zum Vortrag: In den Zeichenlisten ist bei jedem Zeichen das Signifikum eingefärbt — genau das Bauprinzip aus Akt VII",
    "Zeit zum Abfotografieren der QR-Codes geben"
  ],

  "Rohstoffe des Papiers": [
    "Hanf: eine hochwachsende Faserpflanze, aus deren Stängeln man Seile, Säcke und Stoffe macht",
    "Alte Lumpen: abgetragene Kleidung aus Hanf- oder Leinengewebe — das Bild zeigt Arbeiterinnen beim Sortieren von Lumpen für eine Papierfabrik (USA, 1911)",
    "Fischnetze: geknüpft aus Hanf- und Ramiefasern (Ramie = Chinagras, eine Brennnesselart mit sehr festen Fasern), also ebenfalls Pflanzenfasern",
    "Bast des Maulbeerbaums: die weiche, faserige innere Rindenschicht zwischen Borke und Holz; der Papiermaulbeerbaum ist verwandt mit dem Maulbeerbaum, dessen Blätter die Seidenraupen fressen",
    "Gemeinsam ist allen: lange Pflanzenfasern (Zellulose) — im Wasser zerkocht und zerstampft, verfilzen sie beim Schöpfen zu einem Blatt",
    "Der Witz: Abfall (Lumpen, alte Netze) wird zum wertvollen Schreibstoff"
  ],

  "Der Weg des Papiers": [
    "Den Weg auf der Karte von rechts nach links zeigen",
    "China, Luòyáng um 105: Cài Lún legt das Verfahren am Kaiserhof fest",
    "751 Samarkand: Der Legende nach bringen chinesische Kriegsgefangene nach der Schlacht am Talas das Verfahren mit; Samarkand wird Papierzentrum der islamischen Welt",
    "793 Bagdad, um 800 Damaskus, um 900 Kairo: Papier verdrängt Papyrus und Pergament in der arabischen Welt",
    "Um 1150 Xàtiva (Spanien), 1276 Fabriano (Italien), 1390 Nürnberg: die erste deutsche Papiermühle (Ulman Stromer)",
    "Rechnung: von Cài Lún bis Samarkand rund 650 Jahre („rund 600“), bis Deutschland fast 1300 Jahre",
    "Ohne dieses Papier kein Buchdruck mit beweglichen Lettern in Europa (Gutenberg um 1450)"
  ]
};

/* Nachschlagen über eine normalisierte Fassung des Titels: macOS legt „ǎ“
   als a + Häkchen ab, die HTML-Datei schreibt das fertige Zeichen. Byte für
   Byte sind das zwei verschiedene Schlüssel — NFC gleicht sie an. */
const nfc = s => (s || '').normalize('NFC');
const register = new Map(Object.entries(NOTIZEN).map(([k, v]) => [nfc(k), v]));

const stage = document.getElementById('mm-stage');
if (!stage) return;

const AUF = 'Rednernotizen';
const ZU  = 'Notizen schließen';

const kaesten = [];

[...stage.querySelectorAll('.mm-slide')].forEach(folie => {
  if (folie.querySelector(':scope > .mm-rn')) return;

  const stichworte = register.get(nfc(folie.dataset.title));

  const kasten = document.createElement('div');
  kasten.className = 'mm-rn';

  const knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'mm-rn-btn';
  knopf.textContent = AUF;
  knopf.title = 'Erster Klick öffnet, zweiter Klick schließt (Taste N)';
  knopf.setAttribute('aria-expanded', 'false');

  const tafel = document.createElement('div');
  tafel.className = 'mm-rn-pop';
  tafel.id = `rn-${Math.random().toString(36).slice(2, 8)}`;
  knopf.setAttribute('aria-controls', tafel.id);

  const kopf = document.createElement('h3');
  kopf.textContent = folie.dataset.title || 'Rednernotizen';
  tafel.append(kopf);

  if (stichworte && stichworte.length) {
    const liste = document.createElement('ul');
    stichworte.forEach(text => {
      const zeile = document.createElement('li');
      /* innerHTML, damit die Sprachfarben aus Kap. 3.3 auch hier gelten. */
      zeile.innerHTML = text;
      liste.append(zeile);
    });
    tafel.append(liste);
  } else {
    /* Kein stiller Ausfall: Wer eine Folie ergänzt hat, soll es sehen. */
    const hinweis = document.createElement('p');
    hinweis.className = 'rn-leer';
    hinweis.textContent =
      'Für diese Folie sind noch keine Notizen hinterlegt. ' +
      'Sie werden in rednernotizen.js unter dem data-title der Folie eingetragen.';
    tafel.append(hinweis);
  }

  kasten.append(knopf, tafel);
  folie.append(kasten);
  kaesten.push({ kasten, knopf });
});

function setze(eintrag, auf) {
  eintrag.kasten.classList.toggle('is-open', auf);
  eintrag.knopf.setAttribute('aria-expanded', String(auf));
  eintrag.knopf.textContent = auf ? ZU : AUF;
}

function schliesseAlle() {
  kaesten.forEach(eintrag => setze(eintrag, false));
}

kaesten.forEach(eintrag => {
  eintrag.knopf.addEventListener('click', () => {
    const auf = !eintrag.kasten.classList.contains('is-open');
    /* Immer nur ein Kasten offen — beim Blättern bliebe sonst einer zurück. */
    schliesseAlle();
    setze(eintrag, auf);
  });
});

/* Taste N — der Redner soll die Notizen erreichen, ohne die Maus zu suchen.
   deck.js lässt unbekannte Tasten unbehelligt durch. */
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { schliesseAlle(); return; }
  if (event.key !== 'n' && event.key !== 'N') return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  const aktiv = stage.querySelector('.mm-slide.is-active');
  const eintrag = aktiv && kaesten.find(e => e.kasten.parentElement === aktiv);
  if (!eintrag) return;

  const auf = !eintrag.kasten.classList.contains('is-open');
  schliesseAlle();
  setze(eintrag, auf);
  event.preventDefault();
});

/* Beim Folienwechsel zurücksetzen. deck.js räumt die eigenen Kästen selbst
   auf; hier wird nur beobachtet, damit die Steuerung in einer Datei bleibt. */
if ('MutationObserver' in window) {
  const beobachter = new MutationObserver(eintraege => {
    eintraege.forEach(e => {
      const folie = e.target;
      if (!folie.classList.contains('is-active')) {
        const treffer = kaesten.find(k => k.kasten.parentElement === folie);
        if (treffer) setze(treffer, false);
      }
    });
  });
  stage.querySelectorAll('.mm-slide').forEach(folie => {
    beobachter.observe(folie, { attributes: true, attributeFilter: ['class'] });
  });
}
})();

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
    "Begrüßung — heute geht es um Herkunft und Bauplan der chinesischen Schrift",
    "Versprechen: nach diesem Vortrag ist kein Zeichen mehr ein zufälliges Gekritzel",
    "Zwei Teile: erst die Schrift der Menschheit, dann die chinesischen Zeichen im Einzelnen",
    "Einstiegsfrage ins Publikum: Wer hat schon einmal ein Zeichen wirklich geschrieben — nicht abgemalt?",
    "Organisatorisches: Zwischenfragen jederzeit; Reader und Übungsblatt gibt es am Schluss"
  ],

  "Inhaltsverzeichnis": [
    "Den Bogen zeigen: von den ersten Ritzmarken bis zum Nachschlagen im Papierwörterbuch",
    "Erste Hälfte weltgeschichtlich, zweite Hälfte chinesisch — beides hängt zusammen",
    "Herzstück ist Akt VII: die sechs Bildungsarten 六书 — dort entscheidet sich das Verstehen",
    "Hinweis: jede Zeile ist anklickbar, wir springen bei Bedarf zurück",
    "Am Ende Zusammenfassung, drei Quizze und Material zum Mitnehmen"
  ],

  "Jiǎhú-Schrift": [
    "Provokativ einsteigen: Ist das hier die älteste Schrift der Welt?",
    "Die Zahlen nennen — ca. 6600 v. Chr., Provinz Hénán, nur rund 16 eingeritzte Markierungen",
    "Betonen: einzelne Marken sind noch keine Schrift",
    "Die vier Kriterien andeuten — fester Zeichenvorrat, Bindung an eine Sprache, Zeichenreihen, Wiederholung",
    "Über 5000 Jahre Lücke bis zu den Orakelknochen — eine Abstammung lässt sich nicht behaupten",
    "Merksatz setzen: Zeichen sind älter als Schrift"
  ],

  "Vinča-Zeichen": [
    "Zweiter Fall, dieselbe Frage — diesmal in Südosteuropa",
    "85 % der Funde tragen nur ein einziges Zeichen: keine Reihe, kein Satz",
    "Wahrscheinlicher: Ornament, Besitzermarke, Kultzeichen",
    "Tărtăria-Täfelchen erwähnen — spektakulär, aber beweisschwach",
    "Zwischenergebnis für beide Folien: ohne Sprachbindung keine Schrift"
  ],

  "Mesopotamien und Ägypten": [
    "Jetzt kommt echte Schrift — und sie entsteht gleich zweimal",
    "Keilschrift bei den Sumerern ca. 3300 v. Chr., Hieroglyphen in Ägypten ca. 3200 v. Chr.",
    "Der Auslöser ist unromantisch: Verwaltung, Besitz, Abgaben",
    "Nicht die Dichtung steht am Anfang, sondern die Buchhaltung",
    "Drei bis vier unabhängige Erfindungen weltweit — dazu gehört China; alles andere sind Übernahmen",
    "Karten kurz zeigen: Ägypten am Nil, Mesopotamien zwischen Euphrat und Tigris"
  ],

  "Keilschrift: Technik": [
    "Die Technik erklärt die Form: angeschrägtes Schilfrohr, feuchter Ton, keilförmiger Abdruck",
    "Wichtig: das Material zwingt zur Form — geschwungene Linien werfen den Ton auf",
    "Inhalte der Tafeln nennen — Rechensystem, Zahlungsmittel, Zinsen, Darlehen, Eigentumsurkunden",
    "Vorgriff setzen: dasselbe Prinzip begegnet in China beim Wechsel zu Pinsel und Papier",
    "Wenn Zeit ist: Sechzigersystem — Stunde, Minute, 360 Grad leben bis heute davon"
  ],

  "Hieroglyphen": [
    "Wortbedeutung auflösen: griechisch „heilige eingemeißelte Zeichen“",
    "Die ägyptische Eigenbezeichnung ist stärker: „Gottesworte“ — Gabe des Gottes Thot",
    "Erst Monumentalschrift: Tempelwände, Obelisken, Sarkophage — Adressat sind die Götter",
    "Warnung vor dem Missverständnis: keine reine Bilderschrift",
    "Vorbereiten, was auf der nächsten Folie kommt — die Zeichen tragen auch Lautwerte"
  ],

  "Vom Bild zum Laut": [
    "Der entscheidende gedankliche Schritt der ganzen Schriftgeschichte",
    "Der Verwaltungsdruck erzwingt Tempo — also bekommen Zeichen einen Lautwert",
    "Rebusprinzip am deutschen Beispiel vorführen: Auge + Nadel ergibt einen Klang, keine Bedeutung",
    "Damit lassen sich Namen und abstrakte Wörter schreiben",
    "Merken: dieselbe Doppelnatur — Bild und Laut — kehrt später bei den chinesischen Phonogrammen wieder"
  ],

  "Hieratisch und demotisch": [
    "Drei Register, nicht drei Epochen: sie bestehen nebeneinander",
    "Hieroglyphisch = Stein und Sakrales, hieratisch = Papyrus und Verwaltung, demotisch = Alltag und Recht",
    "Regel dahinter: Funktionsvielfalt erzeugt Stilvielfalt",
    "Direkt auf China vorausweisen — Siegelschrift, Kanzleischrift, Kursive tun genau dasselbe",
    "Preis des Tempos: die Bildhaftigkeit geht verloren"
  ],

  "Papyrus: Herstellung": [
    "Kurzer Materialexkurs — der Beschreibstoff formt die Schrift mit",
    "Herstellung in drei Schritten: schälen und zerfasern, kreuzweise legen, pressen und trocknen",
    "Papyrus bleibt drei Jahrtausende der Schreibstoff des Mittelmeerraums",
    "Vergleichspunkt setzen: China wird später Bambus, Seide und schließlich Papier nutzen"
  ],

  "Papyrus: Blatt": [
    "Einen Moment schweigen lassen — das Bild wirkt für sich",
    "Auf die Faserstruktur zeigen: Schreibrichtung folgt der Faserlage",
    "Überleitung: dieser leichte, tragbare Stoff macht Schrift beweglich — und damit exportierbar"
  ],

  "Ugarit und die Phönizier": [
    "Die dritte große Idee nach Bild und Laut: das Alphabet",
    "Ugarit um 1500 v. Chr. — ein Alphabet aus 30 Keilschriftzeichen",
    "Verbreitet wird es von den Phöniziern, einem Seefahrer- und Handelsvolk",
    "22 Zeichen, ausschließlich Konsonanten — ein Abjad, kein volles Alphabet",
    "Pointe: nicht die Erfindung, sondern der Handel entscheidet über die Verbreitung"
  ],

  "Ugaritische Zeichentafel": [
    "Der eigentliche Fund sind Schülertäfelchen — Abecedarien",
    "Nicht die Zeichenform ist das Neue, sondern die feste Reihenfolge ʾa – b – g – d",
    "Diese Reihenfolge lebt über Phönizisch und Griechisch bis in unser ABC weiter",
    "Warum das zählt: eine feste Ordnung macht Schrift lernbar, prüfbar und sortierbar",
    "Brücke: genau diese Sortierbarkeit fehlt der Zeichenschrift — deshalb später die Radikale"
  ],

  "Ausbreitung des Alphabets": [
    "Um 800 v. Chr. übernehmen die Griechen das phönizische System",
    "Ihr Beitrag: Zeichen für Vokale — erst damit ein Alphabet im engeren Sinne",
    "Die Buchstabennamen verraten die Herkunft: ʾaleph „Rind“, bet „Haus“",
    "Weg nach Westen: Griechen → Etrusker → Römer → unser Alphabet",
    "26 Buchstaben genügen für jedes deutsche Wort — das ist der Vergleichsmaßstab für die nächste Folie"
  ],

  "Alphabet und Zeichenschrift": [
    "Die Systemfrage stellen: zwei Wege, ein Ziel — Sprache sichtbar machen",
    "Alphabet: wenige Zeichen, hohe Einstiegsleichtigkeit",
    "Chinesisch ist morphosyllabisch — ein Zeichen = eine Silbe = meist ein Morphem",
    "Am Beispiel zeigen: „Häuschen“ enthält drei Morpheme, im Chinesischen fiele das auseinander",
    "Der große Vorteil der Zeichenschrift: dialektübergreifend lesbar — Mandarin und Kantonesisch teilen die Schrift",
    "221 v. Chr. 书同文 shū tóng wén — gleiche Schrift für alle; Vorgriff auf die Siegelschrift"
  ],

  "Die chinesische Schrift 文字": [
    "Kernaussage in einem Satz: die älteste ununterbrochen gebrauchte Schrift der Welt",
    "Gut 3200 Jahre lückenlos belegt — seit den Orakelknochen des 13. Jh. v. Chr.",
    "Unterschied zu Keilschrift und Hieroglyphen betonen: die sind ausgestorben und mussten entziffert werden",
    "Das Wort 文字 wénzì selbst zerlegen — 文 Muster, Zeichen · 字 zusammengesetztes Zeichen",
    "Damit ist der Übergang zum zweiten Teil des Vortrags gesetzt"
  ],

  "Wörterbücher und Zeichenzahlen": [
    "Die Angstfrage vorwegnehmen: Wie viele Zeichen muss ich lernen?",
    "Der Bestand wächst historisch, der Gebrauch nicht — rund 85 % sind außer Gebrauch",
    "Für den Alltag genügen 3000–5000 Zeichen",
    "Entlastung geben: kein Mensch lernt den Gesamtbestand, auch kein Muttersprachler",
    "Die Wörterbücher zeigen — den kleinen Taschenband anfassen lassen, wenn vorhanden"
  ],

  "Orakelknochenschrift 甲骨文": [
    "Jetzt der älteste gesicherte Beleg — 甲骨文 jiǎgǔwén, ab ca. 1250 v. Chr.",
    "Träger nennen: Schildkrötenpanzer und Rinderschulterblätter, geritzt",
    "Zweck erklären: Wahrsagerei — Frage einritzen, erhitzen, Risse deuten",
    "Etwa 4.500 verschiedene Zeichen belegt, rund ein Drittel sicher gelesen",
    "Pointe: hier stehen die heutigen Zeichen in ihrer ursprünglichen Form",
    "Fundgeschichte erwähnen, wenn Zeit ist: 1899 als „Drachenknochen“ in der Apotheke entdeckt"
  ],

  "Bronzeschrift 金文": [
    "金文 jīnwén — Schrift auf rituellen Bronzegefäßen, Glocken 钟 und Opferkesseln 鼎",
    "Entscheidend ist die Technik: mitgegossen, nicht geritzt",
    "Deshalb runde, volle Striche von ungleicher Breite — wieder formt das Material die Schrift",
    "Den Gussweg kurz durchgehen: Modell, Mantel, Kern, seitenverkehrt geschnittene Zeichen",
    "Die Schrift entsteht mit dem Gefäß, nicht danach — das ist der Merksatz",
    "Funktion: Rechtsdokument und Botschaft an die Ahnen, auf Dauer angelegt"
  ],

  "Siegelschrift 篆书": [
    "Vorher das Problem zeichnen: in den Streitenden Reichen schreibt jede Region anders",
    "221 v. Chr. Reichseinigung — und damit die erste Schriftreform der Geschichte",
    "Aus der großen Siegelschrift 大篆 wird die kleine 小篆 als landesweiter Standard",
    "Merkmale zeigen: gleich starke Linien, streng symmetrisch, senkrecht ausgerichtet",
    "Bis heute in Gebrauch — auf jedem Künstlersiegel",
    "Rückbezug: das ist 书同文 shū tóng wén aus der Alphabetfolie"
  ],

  "Die vier Schriftstile der Han-Zeit": [
    "Die Han-Zeit bringt das Repertoire, mit dem bis heute geschrieben wird",
    "Vier Namen mit ihrer Funktion koppeln — 隶书 Verwaltung, 楷书 Druck, 行书 Handschrift, 草书 Kunst",
    "Wichtig: sie lösen einander nicht ab, sie treten nebeneinander",
    "Auf die Abbildung zeigen und die Stile von links nach rechts durchgehen lassen",
    "Publikumsfrage: Welchen Stil würden Sie am ehesten lesen können?"
  ],

  "Der Entwicklungsstrang": [
    "Die Übersichtsfolie — hier läuft alles Bisherige zusammen",
    "Ein Zeichen durch alle Stufen verfolgen: von 甲骨文 bis 简体字",
    "Zwei Bewegungen benennen: weniger Bildhaftigkeit, mehr Schreibtempo",
    "Und trotzdem bleibt der Bauplan erkennbar — deshalb lohnt die Etymologie",
    "Kurz innehalten lassen; das ist ein guter Moment für Zwischenfragen"
  ],

  "Eine Bronzeinschrift": [
    "Ein Beispiel in Ruhe ansehen — volle, runde Striche von ungleicher Breite",
    "Typische Inhalte nennen: Belehnungen, Feldzüge, Widmungen an die Ahnen",
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
    "Funktion: Verwaltung — Schnelligkeit schlägt Repräsentation"
  ],

  "Halbkursivschrift 行书": [
    "Die Striche gehen ineinander über, ohne die Struktur aufzugeben",
    "Das ist die Alltagshandschrift — vergleichbar unserer Schreibschrift",
    "Noch gut lesbar, aber schon deutlich schneller",
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
    "Deshalb entziffert man sie über die Bewegungsspur, nicht über die Form",
    "Genau hier zahlt sich die richtige Strichfolge aus — Vorgriff auf Akt VIII",
    "Ehrlich sein: das liest auch in China nicht jeder"
  ],

  "Welcher Stil wofür?": [
    "Zusammenfassung der Stile — jeder behält bis heute eine Funktion",
    "Durchgehen: 篆书 Siegel und Titel · 楷书 Druck und Schule · 行书 Alltag · 草书 Kunst",
    "Der europäische Vergleich hilft: Fraktur, Antiqua, Kursive, Schreibschrift bestehen ebenfalls nebeneinander",
    "Missverständnis ausräumen: es gibt keine „veraltete“ chinesische Schrift"
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
    "Kernkriterium wiederholen: Schrift bildet Sprache ab, nicht Dinge",
    "Sichtbar machen, wie spät die chinesische Schrift einsetzt — und wie lange sie durchhält",
    "Gute Stelle für eine Zwischenfrage: Welche Schrift war am längsten in Gebrauch?"
  ],

  "Pinsel und Papier": [
    "Wieder die Leitfrage: Womit wird geschrieben — und was macht das mit der Schrift?",
    "Der Pinsel erlaubt Druckmodulation: dünn und dick im selben Strich",
    "Erst dadurch werden Kalligraphie und die charakteristischen Strichenden möglich",
    "Richtigstellung, die gern überrascht: Cài Lún hat das Papier um 105 n. Chr. standardisiert, nicht erfunden",
    "Rückbezug auf Ton, Stein und Papyrus — dreimal derselbe Mechanismus"
  ],

  "Papierherstellung": [
    "Die Rohstoffe nennen: Hanf, alte Lumpen, Fischnetze, Baumrinde, Bast des Maulbeerbaums",
    "Fünf Schritte anhand der Bilder durchgehen: ernten, kochen, schöpfen, pressen, trocknen",
    "Der Witz des Verfahrens: aus Abfall wird ein hochwertiger Schreibstoff",
    "Papier ist billig und leicht — Schrift wird damit massenhaft möglich",
    "Der Weg nach Westen dauert rund 600 Jahre — über Samarkand nach Europa"
  ],

  "Die vier Schätze": [
    "文房四宝 wénfáng sìbǎo — die vier Schätze des Studierzimmers",
    "Der Reihe nach benennen: 笔 Pinsel · 墨 Tusche · 纸 Papier · 砚 Reibstein",
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
    "Anteil nennen und relativieren: nur 2–4 % — aber die produktivsten Bausteine des Systems",
    "Warnung vor dem verbreiteten Irrtum: Chinesisch ist keine Bilderschrift"
  ],

  "Ideogramme 指事": [
    "Kategorie 2 — 指事 zhǐshì, „auf Tatbestände deuten“",
    "Der Unterschied zum Piktogramm in einem Satz: abbilden gegenüber hinzeigen",
    "Einfache Fälle zuerst: 一 二 三, dann 上 und 下 an der gedachten Grundlinie",
    "Feinere Fälle: 末 Ende · 勿 Fähnchen zum Abwinken · 中 Pfeil und Scheibe",
    "Anteil: unter 1 % — klein, aber didaktisch unentbehrlich"
  ],

  "Striche als Indikatoren": [
    "Das Prinzip an einem einzigen Zeichenpaar vorführen: 木 → 本 und 木 → 未",
    "Auf die Position des Strichs zeigen — unten die Wurzel, oben der Wipfel",
    "Drittes Beispiel 刀 → 刃: der Strich markiert die Schneide",
    "Merksatz: die Lage des Strichs trägt die Bedeutung",
    "Übungsimpuls: Wo müsste der Strich für „Ast“ sitzen?"
  ],

  "Zeichen verknüpfen": [
    "Überleitung zur dritten Methode: bestehende Zeichen verbinden",
    "Entscheidend ist die Einschränkung — kein Laut ist im Spiel, nur Bedeutungen",
    "Das neue Zeichen trägt die Bedeutungen der Bestandteile in sich",
    "Damit ist die nächste Kategorie vorbereitet"
  ],

  "Vereinigte Bedeutungen 会意": [
    "Kategorie 3 — 会意 huìyì, die Bedeutungen addieren sich",
    "Die Karten einzeln anklicken und raten lassen, bevor die Auflösung erscheint",
    "亻+ 木 = 休 ausruhen · 女 + 子 = 好 gut · 禾 + 火 = 秋 Herbst · 夕 + 口 = 名 Name",
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
    "Jetzt kommt die wichtigste Folie des ganzen Vortrags",
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
    "Einschränkung nennen: der Lautwert ist oft nur noch ungefähr — die Sprache hat sich verändert"
  ],

  "Phonogramme 形声": [
    "Die Zahl groß stehen lassen: rund 90 % aller Zeichen",
    "Neun von zehn Zeichen enthalten eine Lautkomponente",
    "Daraus die Lernstrategie ableiten: nicht auswendig malen, sondern zerlegen",
    "Wer dieses Bauprinzip versteht, versteht das System",
    "Rückblick: das ist derselbe Schritt vom Bild zum Laut wie in Ägypten und Mesopotamien"
  ],

  "Bedeutungstragende Bestandteile I": [
    "Die Tabelle ist zum Nachschlagen, nicht zum Vorlesen",
    "Drei, vier Zeilen exemplarisch durchgehen — 氵, 亻, 讠 eignen sich",
    "Die Kernaussage betonen: das Radikal grenzt ein Bedeutungsfeld ein, es definiert nicht",
    "Publikum raten lassen: Was könnte 冷 bedeuten, wenn 冫 „Eis“ heißt?",
    "Hinweis: dieselbe Tabelle steht im Reader"
  ],

  "Bedeutungstragende Bestandteile II": [
    "Fortsetzung — und die entlastende Zahl: von 214 Radikalen sind nur etwa 50 wirklich produktiv",
    "Wieder nur einige Zeilen herausgreifen, etwa 扌, 忄, 钅",
    "Auf die Formvarianten hinweisen: 火 links, 灬 unten",
    "贝 als schönes Beispiel — Muschel als Geldzeichen, daher 财 买 贵",
    "Lernempfehlung geben: diese 50 lohnen sich wirklich"
  ],

  "Zeichen-Grundstriche": [
    "Definition zuerst: Alles, was in einem Zug gezeichnet wird, ist ein Strich",
    "Die fünf Grundtypen nennen — 点 · 横 · 竖 · 撇 · 捺",
    "Dann die zusammengesetzten: 提, die Haken 钩 und die Knicke 折",
    "Jeden Strich in der Luft mitzeichnen lassen — Bewegung prägt sich besser ein als Bilder",
    "Zweck erklären: mit diesen Namen lässt sich über Zeichen sprechen und Strichzahl zählen"
  ],

  "Die Regeln der Strichfolge": [
    "Die Regeln nicht vorlesen, sondern an je einem Zeichen vorführen",
    "Grundrichtung: erst waagerecht, dann senkrecht — 十 · erst 撇, dann 捺 — 人",
    "Gliederung: von oben nach unten, von links nach rechts — 三 · 你",
    "Rahmen: erst außen, dann innen, zuletzt schließen — 国",
    "Mitte und Punkte: erst die Mitte, dann die Seiten — 小 · Punkt oben rechts zuletzt — 我",
    "Beruhigen: die Regeln folgen der natürlichen Handbewegung, sie sind nicht willkürlich"
  ],

  "Die 7 Grundregeln": [
    "Die Merktafel — hier steht alles zusammengefasst",
    "Die sieben Regeln laut durchzählen lassen",
    "Empfehlung: diese Tafel abfotografieren, sie ersetzt langes Nachlesen",
    "Hinweis: sie taucht im Übungsblatt und im Reader wieder auf"
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
    "Doppelte Rolle nennen: Bedeutungsträger und Ordnungskriterium im Wörterbuch",
    "Wichtig: jedes Zeichen hat genau ein Radikal — nicht zwei",
    "Ehrlich sein: die Zuordnung ist manchmal rein traditionell und wirkt willkürlich",
    "Das ist kein Fehler des Lernenden, sondern eine Eigenheit des Systems"
  ],

  "Die Tafel der 214 Radikale": [
    "Die Tafel zeigen und die Ordnung erklären: nach Strichzahl, von einem Strich bis siebzehn",
    "Nicht abschrecken lassen — niemand lernt diese Tafel auswendig",
    "Man braucht sie nur zum Nachschlagen, und nur die vorderen Gruppen häufig",
    "Auf die Lupe hinweisen: mit dem Cursor über die Ausschnitte fahren"
  ],

  "Position des Radikals": [
    "Fünf Stellungen durchgehen: links, rechts, oben, unten, außen",
    "Häufigste Anordnung: links der Sinn, rechts der Laut — 江 说 河",
    "Sofort einschränken: verlässlich ist das nicht",
    "Formwechsel zeigen: 火 links in 烧, unten als 灬 in 热",
    "Praktischer Rat: im Zweifel beide Kandidaten im Index probieren"
  ],

  "Die Ordnung des Wörterbuchs": [
    "Die historische Linie in vier Schritten — 说文解字 540 · 字汇 214 · 康熙字典 verbindlich · heute 201 bis 227",
    "Die treibende Kraft benennen: von etymologischer Ordnung zu praktischer Auffindbarkeit",
    "说文解字 von 100 n. Chr. ist bis heute die Quelle aller Etymologie",
    "Warnung: verschiedene Wörterbücher zählen verschieden — immer die Tafel des eigenen Bandes benutzen"
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
    "Geltungsbereich klären: Festland Kurzzeichen, Taiwan und Hongkong Langzeichen",
    "Kontroverse ansprechen: der Verlust an etymologischer Durchsichtigkeit — 愛 ohne 心",
    "Auf die Lupe hinweisen: Cursor auf den Zeitungsausschnitt"
  ],

  "Wie viele Zeichen braucht man?": [
    "Die Zahlen ruhig nennen — sie beruhigen mehr als sie schrecken",
    "3000 Zeichen in sechs Schuljahren genügen für Bücher und Zeitungen",
    "Ab 1500 Zeichen gilt man nicht mehr als Analphabet",
    "Gebildete Chinesen beherrschen rund 6000",
    "Der wichtigste Wert: mit den 3500 häufigsten Zeichen liest man 99,7 % eines Textes",
    "Daraus die Lernstrategie ableiten: Häufigkeit schlägt Vollständigkeit"
  ],

  "Grundregeln der Strichfolge I": [
    "Die Warum-Frage zuerst beantworten — sonst wirken die Regeln wie Schikane",
    "Vier Gründe nennen: Schreibökonomie, Form, Lesbarkeit der Kursive, Nachschlagen",
    "Form: nur in der richtigen Folge stimmen die Proportionen",
    "Nachschlagen: Strichzahl und Strichfolge sind die Ordnungskriterien im Wörterbuch",
    "Merksatz: Die Strichfolge ist kein Ritual, sondern eine Technik"
  ],

  "Grundregeln der Strichfolge II": [
    "Das Bild vom Haus benutzen: erst die Mauern, dann das Haus hinein, zuletzt das Tor",
    "先里头后封口 xiān lǐtou hòu fēngkǒu — am Zeichen 国 Schritt für Schritt vorführen",
    "Reihenfolge: linke Senkrechte, oberer und rechter Rand in einem Zug, Inhalt 玉, dann der Abschlussstrich",
    "Gegenfälle zeigen: Rahmen nach unten offen (月 风 同) — außen zuerst",
    "Rahmen nach oben offen (凶 这 道) — innen zuerst",
    "Alle mitschreiben lassen, in der Luft oder auf Papier"
  ],

  "Die Grundstriche und ihre Namen": [
    "永字八法 yǒngzì bāfǎ — die acht Prinzipien im Zeichen 永",
    "Der Trick der klassischen Didaktik: ein Zeichen enthält alle wesentlichen Bewegungen",
    "Die fünf Grundtypen wiederholen: 横 · 竖 · 撇 · 点 · 折",
    "永 gemeinsam schreiben — langsam, Strich für Strich",
    "Nutzen der Namen: man kann über Zeichen sprechen, ohne sie zu zeichnen"
  ],

  "Strichfolge: 你 und 我": [
    "Zwei Zeichen, die jeder kennt — und beide mit einer Falle",
    "你 in sieben Strichen durchgehen: 亻 zuerst, dann das Dach von 尔, Punkt zuletzt",
    "我 durchgehen: 撇, 横, 竖钩, 提, der große 斜钩 von 戈, 撇, dann der Punkt",
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

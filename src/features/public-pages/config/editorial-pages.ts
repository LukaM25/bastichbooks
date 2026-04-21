export type EditorialPageConfig = {
  eyebrow: string;
  title: string;
  lede: string;
  quote: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  notes: string[];
};

export const editorialPages: Record<string, EditorialPageConfig> = {
  "ueber-dom": {
    eyebrow: "Biografisches Dossier",
    title: "Über Dom",
    lede:
      "Ein lesbares Porträt aus Herkunft, Haltung, Reisen und jener stillen Arbeitsweise, aus der die Bücher entstehen.",
    quote: "Nicht jede Reise führt fort. Manche ordnen nur die innere Karte neu.",
    sections: [
      {
        title: "Herkunft und Archiv",
        body:
          "Dom wird hier nicht als flache Autorenmarke gezeigt, sondern als Person mit Herkunft, Arbeitszimmern, Notizweisen und einem Verhältnis zu Büchern als Lebensform.",
      },
      {
        title: "Reisen und Räume",
        body:
          "Wege, Übergänge, Zimmer, Küsten und Landschaften bilden keine Kulisse, sondern einen zweiten Textkörper, aus dem das Schreiben immer wieder neue Formen zieht.",
      },
      {
        title: "Haltung und Ton",
        body:
          "Zwischen Fürsorge, Beobachtung und stiller Präzision entsteht eine Stimme, die eher sammelt als behauptet und lieber öffnet als abschließt.",
      },
    ],
    notes: ["Werkspuren", "Reiseränder", "Archivzimmer"],
  },
  orte: {
    eyebrow: "Kartierte Räume",
    title: "Orte",
    lede:
      "Eine Sammlung aus Straßen, Grenzräumen, Landschaften und stillen Zimmern, die sich in Erinnerungsarchitekturen verwandeln.",
    quote: "Manche Orte bleiben nicht im Blick, sondern in der Art, wie wir Sätze setzen.",
    sections: [
      {
        title: "Landschaft als Gedächtnis",
        body:
          "Orte werden hier nicht dokumentiert, sondern gelesen: als Klima, Material, Geräusch und Nachwirkung.",
      },
      {
        title: "Reisenotizen",
        body:
          "Fahrten, Wege und Übergänge bilden ein Register aus Fragmenten, Blickachsen und Rückwegen.",
      },
      {
        title: "Erinnerungsräume",
        body:
          "Zimmer, Fenster, Tische und Bahnhöfe kehren als dichte kleine Räume wieder, in denen Erinnerung und Gegenwart ineinanderfallen.",
      },
    ],
    notes: ["Kartenlinien", "Horizonte", "Durchgänge"],
  },
  heilkunst: {
    eyebrow: "Feldbuch",
    title: "Traditionelle Heilkunst",
    lede:
      "Ein vorsichtiger Arbeitsraum für Pflanzenwissen, historische Überlieferung, ethnografische Aufmerksamkeit und praktische Erfahrung.",
    quote: "Wissen bleibt lebendig, wenn es nicht nur gesammelt, sondern aufmerksam getragen wird.",
    sections: [
      {
        title: "Pflanzen und Geschichte",
        body:
          "Diese Sammlung nähert sich Kräutern und Anwendungen über Geschichte, regionale Erinnerung und überlieferte Praxis.",
      },
      {
        title: "Persönliche Notizen",
        body:
          "Beobachtungen aus dem Alltag, aus Routinen, aus Fürsorge und aus behutsamem Ausprobieren werden hier als Notizform sichtbar.",
      },
      {
        title: "Praktische Annäherung",
        body:
          "Der Ton bleibt bewusst unaufgeregt: eher dokumentierend und vorsichtig ordnend als dogmatisch oder spekulativ.",
      },
    ],
    notes: ["Herbar", "Anwendungen", "Überlieferung"],
  },
  fragmente: {
    eyebrow: "Zwischenform",
    title: "Fragmente",
    lede:
      "Randstücke, kurze Formen, kleine Essays und Beobachtungen, die nicht abschließen wollen, sondern offen nachhallen.",
    quote: "Ein Fragment ist keine Lücke. Es ist eine Form der Präzision.",
    sections: [
      {
        title: "Randstücke",
        body:
          "Kurze Texte, Notate und mikroskopische Szenen halten fest, was in längeren Formen oft verloren geht.",
      },
      {
        title: "Essayistische Falten",
        body:
          "Zwischen Reflexion und Bild, zwischen Beobachtung und Haltung entsteht eine bewegliche Prosa mit offenem Rand.",
      },
      {
        title: "Leise Beobachtung",
        body:
          "Die Fragmente bleiben nah an kleinen Gesten, Lichtwechseln, Räumen und Nebenbewegungen des Alltags.",
      },
    ],
    notes: ["Randlicht", "Leisetexte", "Papierfalten"],
  },
};

export type HomeChapterId =
  | "buecher"
  | "ueber-dom"
  | "orte"
  | "heilkunst"
  | "fragmente"
  | "bibliothek";

export type HomeChapterDefinition = {
  id: HomeChapterId;
  index: string;
  title: string;
  subtitle: string;
  href: string;
  kicker: string;
  description: string;
  palette: {
    wash: string;
    ink: string;
    border: string;
    glow: string;
  };
  motifs: string[];
};

export const homeChapters: HomeChapterDefinition[] = [
  {
    id: "buecher",
    index: "I",
    title: "Bücher",
    subtitle: "Gebundene Welten und erzählte Leben",
    href: "/buecher",
    kicker: "Katalog",
    description:
      "Die veröffentlichten Werke, sichtbar wie aus einem privaten Archiv gehoben und doch offen zum Weiterreisen.",
    palette: {
      wash: "from-[#5f6d4b]/20 via-[#d8cab1] to-[#9e7c2f]/10",
      ink: "text-[#314029]",
      border: "border-[#61714d]/30",
      glow: "bg-[#5d6a47]/18",
    },
    motifs: ["Leinenrücken", "Neuerscheinungen", "offene Regale"],
  },
  {
    id: "ueber-dom",
    index: "II",
    title: "Über Dom",
    subtitle: "Spuren, Herkunft und Haltung",
    href: "/ueber-dom",
    kicker: "Biografie",
    description:
      "Ein persönliches Dossier aus Herkunft, Reisen, Arbeitsweise und jener stillen Haltung, aus der die Texte entstehen.",
    palette: {
      wash: "from-[#7f6345]/16 via-[#ede2cf] to-[#6e7d5f]/10",
      ink: "text-[#5f432b]",
      border: "border-[#8b6948]/25",
      glow: "bg-[#8a6846]/14",
    },
    motifs: ["Porträtspur", "Randnotizen", "Lebenslinien"],
  },
  {
    id: "orte",
    index: "III",
    title: "Orte",
    subtitle: "Wege, Landschaften und Erinnerungsräume",
    href: "/orte",
    kicker: "Reisen",
    description:
      "Topografien aus Straßen, Zimmern, Küsten, Grenzräumen und jenen Landschaften, die sich ins Schreiben eingeschrieben haben.",
    palette: {
      wash: "from-[#72846b]/16 via-[#efe6d5] to-[#b09155]/10",
      ink: "text-[#3e4c39]",
      border: "border-[#72846b]/28",
      glow: "bg-[#76886f]/14",
    },
    motifs: ["Kartenspuren", "Horizonte", "Reisenotizen"],
  },
  {
    id: "heilkunst",
    index: "IV",
    title: "Traditionelle Heilkunst",
    subtitle: "Notizen zu Pflanzen, Wissen und Praxis",
    href: "/heilkunst",
    kicker: "Feldnotizen",
    description:
      "Eine vorsichtige Sammlung aus Kräuterkunde, Geschichte, ethnografischer Aufmerksamkeit und praktischen Beobachtungen.",
    palette: {
      wash: "from-[#66734f]/18 via-[#f1eadc] to-[#9b7f4b]/8",
      ink: "text-[#425036]",
      border: "border-[#5a6844]/26",
      glow: "bg-[#66734f]/14",
    },
    motifs: ["Herbar", "Anwendungswissen", "Überlieferung"],
  },
  {
    id: "fragmente",
    index: "V",
    title: "Fragmente",
    subtitle: "Randstücke, Essays und stille Beobachtungen",
    href: "/fragmente",
    kicker: "Zwischenräume",
    description:
      "Skizzen, Marginalien, Essays und kurze Stücke, die eher nachhallen als abschließen.",
    palette: {
      wash: "from-[#7b6550]/16 via-[#f3eadb] to-[#6d4a2f]/8",
      ink: "text-[#5e4737]",
      border: "border-[#8a6a4f]/24",
      glow: "bg-[#8a6a4f]/12",
    },
    motifs: ["Randstücke", "leise Sätze", "Papierfalten"],
  },
  {
    id: "bibliothek",
    index: "VI",
    title: "Bibliothek",
    subtitle: "Dein privates Regal im Archiv",
    href: "/bibliothek",
    kicker: "Zugang",
    description:
      "Eine offene Vorschau auf das persönliche Regal mit Käufen, Downloads und späteren Wiederkehrpunkten.",
    palette: {
      wash: "from-[#584f42]/18 via-[#efe3d0] to-[#6a7b5d]/8",
      ink: "text-[#463c31]",
      border: "border-[#685d4b]/24",
      glow: "bg-[#645846]/14",
    },
    motifs: ["Lesespuren", "Lesezeichen", "privates Fach"],
  },
];

export function getHomeChapter(chapterId: HomeChapterId) {
  return homeChapters.find((chapter) => chapter.id === chapterId);
}

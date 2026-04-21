import Link from "next/link";
import type { PublishedBookCard } from "@/features/books/queries";
import type { HomeChapterDefinition } from "@/features/home-book/config/chapters";

type ChapterTeaserProps = {
  chapter: HomeChapterDefinition;
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
};

function BooksTeaser({
  chapter,
  featuredBooks,
}: {
  chapter: HomeChapterDefinition;
  featuredBooks: PublishedBookCard[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
      <div className={`rounded-[1.7rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(241,230,212,0.92))] p-5 ${chapter.palette.border}`}>
        <p className="eyebrow">Im Vordergrund</p>
        <div className="mt-4 space-y-3">
          {featuredBooks.slice(0, 2).map((book) => (
            <div
              key={book.id}
              className="rounded-[1.3rem] border border-white/55 bg-white/55 px-4 py-4"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {book.categories.map((category) => category.name).join(" • ") || "Ausgabe"}
              </p>
              <p className="display-title mt-2 text-2xl text-foreground">{book.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{book.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className={`rounded-[1.7rem] border bg-white/48 px-5 py-5 ${chapter.palette.border}`}>
          <p className="eyebrow">Ton</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Romane, Essays und kürzere Formen erscheinen hier nicht als Produkte allein, sondern als
            gebundene Räume.
          </p>
        </div>
        <div className={`rounded-[1.7rem] border bg-white/48 px-5 py-5 ${chapter.palette.border}`}>
          <p className="eyebrow">Spuren</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {chapter.motifs.map((motif) => (
              <span
                key={motif}
                className="rounded-full border border-[#6c5842]/12 bg-[#faf4ea] px-3 py-1.5 text-sm text-foreground"
              >
                {motif}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutTeaser({ chapter }: { chapter: HomeChapterDefinition }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_0.96fr]">
      <div className={`rounded-[1.7rem] border bg-white/56 p-5 ${chapter.palette.border}`}>
        <p className="eyebrow">Biografische Achse</p>
        <p className="display-title mt-4 text-3xl text-foreground">Leben, Haltung, Werkspur</p>
        <p className="mt-4 text-sm leading-7 text-muted">
          Über Dom nähert sich dem Autor nicht als Marke, sondern als lesbare Lebensbewegung aus
          Herkunft, Reisen, Arbeitsrhythmen und einer stillen Form der Aufmerksamkeit.
        </p>
      </div>
      <div className="grid gap-4">
        {["Reisen und Übergänge", "Arbeitszimmer und Archive", "Notizen zur Haltung"].map(
          (item, index) => (
            <div
              key={item}
              className="rounded-[1.35rem] border border-[#6c5842]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(240,228,208,0.8))] px-4 py-4"
              style={{ transform: `translateX(${index * 6}px)` }}
            >
              <p className="text-sm font-medium text-foreground">{item}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function PlacesTeaser({ chapter }: { chapter: HomeChapterDefinition }) {
  return (
    <div className={`rounded-[1.8rem] border bg-white/54 p-5 ${chapter.palette.border}`}>
      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Kartierung</p>
          <p className="display-title mt-4 text-3xl text-foreground">Reisen, Zimmer, Küstenlinien</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Orte zeigt keine touristische Sammlung, sondern Erinnerungsräume: Kartenränder,
            abgegriffene Wege und Landschaften, die sich in Sätze verwandelt haben.
          </p>
        </div>
        <div className="relative min-h-56 rounded-[1.5rem] border border-[#6c5842]/12 bg-[linear-gradient(180deg,rgba(115,133,108,0.16),rgba(255,255,255,0.5))]">
          <div className="absolute inset-5 rounded-[1.2rem] border border-dashed border-[#60725a]/30" />
          <div className="absolute left-[18%] top-[28%] h-20 w-28 rounded-full border border-[#60725a]/22" />
          <div className="absolute bottom-[18%] right-[16%] h-12 w-20 rounded-full border border-[#9b7f4b]/24" />
          <div className="absolute left-[23%] top-[36%] h-px w-[45%] rotate-[18deg] bg-[#60725a]/35" />
          <div className="absolute right-[20%] top-[55%] h-px w-[35%] rotate-[-14deg] bg-[#9b7f4b]/35" />
        </div>
      </div>
    </div>
  );
}

function HealingTeaser({ chapter }: { chapter: HomeChapterDefinition }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className={`rounded-[1.7rem] border bg-white/55 p-5 ${chapter.palette.border}`}>
        <p className="eyebrow">Herbar</p>
        <p className="display-title mt-4 text-3xl text-foreground">Pflanzen, Wissen, Anwendung</p>
        <p className="mt-4 text-sm leading-7 text-muted">
          Zwischen historischer Überlieferung, persönlicher Erfahrung und praktischer Aufmerksamkeit
          entsteht hier ein vorsichtiges Feldbuch.
        </p>
      </div>
      <div className="grid gap-4">
        {["Calendula", "Beifuß", "Fenchel"].map((plant, index) => (
          <div
            key={plant}
            className="rounded-[1.35rem] border border-[#6c5842]/12 bg-[linear-gradient(180deg,rgba(244,250,240,0.9),rgba(244,235,220,0.78))] px-4 py-4"
            style={{ transform: `rotate(${index % 2 === 0 ? "-1.5deg" : "1.2deg"})` }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Notiz</p>
            <p className="mt-2 text-base font-medium text-foreground">{plant}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Beobachtungen zu Geschichte, Gebrauch und behutsamer Praxis.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FragmentsTeaser({ chapter }: { chapter: HomeChapterDefinition }) {
  return (
    <div className={`rounded-[1.8rem] border bg-white/54 p-5 ${chapter.palette.border}`}>
      <p className="eyebrow">Zwischenform</p>
      <div className="mt-5 grid gap-3">
        {[
          "Sätze, die wie Randlicht bleiben.",
          "Kurze Formen zwischen Essay, Skizze und Erinnerung.",
          "Texte, die eher öffnen als erklären.",
        ].map((line, index) => (
          <div
            key={line}
            className="rounded-[1.2rem] border border-[#6c5842]/12 bg-white/60 px-4 py-4"
            style={{ transform: `translateX(${index * 12}px)` }}
          >
            <p className="text-sm leading-7 text-foreground">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryTeaser({
  chapter,
  latestBooks,
}: {
  chapter: HomeChapterDefinition;
  latestBooks: PublishedBookCard[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.02fr_0.98fr]">
      <div className={`rounded-[1.7rem] border bg-white/55 p-5 ${chapter.palette.border}`}>
        <p className="eyebrow">Offenes Vorschaufenster</p>
        <p className="display-title mt-4 text-3xl text-foreground">Dein Regal im Archiv</p>
        <p className="mt-4 text-sm leading-7 text-muted">
          Käufe, Downloads, Wiedereinstiege und gespeicherte Titel liegen in der Bibliothek als
          persönliche Lesespur bereit.
        </p>
      </div>
      <div className="grid gap-4">
        {latestBooks.slice(0, 2).map((book) => (
          <div
            key={book.id}
            className="rounded-[1.35rem] border border-[#6c5842]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(240,230,212,0.74))] px-4 py-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Digitale Ausgabe</p>
            <p className="display-title mt-2 text-2xl text-foreground">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChapterTeaser({
  chapter,
  featuredBooks,
  latestBooks,
}: ChapterTeaserProps) {
  return (
    <Link
      href={chapter.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-r-[1.75rem] bg-[linear-gradient(180deg,rgba(251,245,236,0.96),rgba(241,231,214,0.9))] px-6 py-7 transition duration-300 hover:bg-[linear-gradient(180deg,rgba(255,249,242,0.98),rgba(243,234,220,0.94))] md:px-8 md:py-8"
    >
      <div className="book-page-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className={`pointer-events-none absolute inset-x-[8%] top-[10%] h-48 rounded-full blur-3xl ${chapter.palette.glow}`} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">{chapter.kicker}</p>
            <h2 className={`display-title mt-3 text-4xl md:text-[3.35rem] ${chapter.palette.ink}`}>
              {chapter.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-8 text-muted">
              {chapter.description}
            </p>
          </div>
          <span className="rounded-full border border-[#6c5842]/12 bg-white/60 px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1">
            Kapitel öffnen
          </span>
        </div>

        <div className="flex-1">
          {chapter.id === "buecher" ? <BooksTeaser chapter={chapter} featuredBooks={featuredBooks} /> : null}
          {chapter.id === "ueber-dom" ? <AboutTeaser chapter={chapter} /> : null}
          {chapter.id === "orte" ? <PlacesTeaser chapter={chapter} /> : null}
          {chapter.id === "heilkunst" ? <HealingTeaser chapter={chapter} /> : null}
          {chapter.id === "fragmente" ? <FragmentsTeaser chapter={chapter} /> : null}
          {chapter.id === "bibliothek" ? (
            <LibraryTeaser chapter={chapter} latestBooks={latestBooks} />
          ) : null}
        </div>
      </div>
    </Link>
  );
}

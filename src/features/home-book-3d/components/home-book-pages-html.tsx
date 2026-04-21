"use client";

import Link from "next/link";
import type { PublishedBookCard } from "@/features/books/queries";
import {
  homeChapters,
  type HomeChapterDefinition,
  type HomeChapterId,
} from "@/features/home-book/config/chapters";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function HomeBookLeftPageHtml({
  selectedChapter,
  onSelectChapter,
}: {
  selectedChapter: HomeChapterId | null;
  onSelectChapter: (chapterId: HomeChapterId) => void;
}) {
  return (
    <div className="pointer-events-auto flex h-[560px] w-[390px] select-none flex-col overflow-hidden rounded-[16px] border border-[rgba(101,79,53,0.1)] bg-[linear-gradient(180deg,rgba(253,247,237,0.78),rgba(241,231,213,0.68))] px-6 py-6">
      <p className="eyebrow">Inhaltsverzeichnis</p>
      <h2 className="display-title mt-3 text-[31px] leading-none text-foreground">
        Bastich Books
      </h2>
      <p className="mt-3 text-[13px] leading-5 text-muted">
        Ein persönliches Archiv aus Büchern, Wegen, Pflanzenwissen und stillen Beobachtungen.
      </p>

      <div className="editorial-rule mt-6" />

      <ol className="mt-5 flex-1 space-y-2">
        {homeChapters.map((chapter) => {
          const active = chapter.id === selectedChapter;

          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => onSelectChapter(chapter.id)}
                className={cn(
                  "group flex w-full items-start gap-4 rounded-[16px] px-3 py-2.5 text-left transition",
                  active ? "bg-[#f4ead7]/72 shadow-[inset_0_0_0_1px_rgba(90,68,42,0.08)]" : "hover:bg-white/28",
                )}
              >
                <span className="mt-1 min-w-7 text-[11px] uppercase tracking-[0.2em] text-muted">
                  {chapter.index}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-3">
                    <span className="display-title text-[21px] leading-none text-foreground">
                      {chapter.title}
                    </span>
                    <span
                      className={cn(
                        "archival-marker transition-opacity",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-70",
                      )}
                    />
                  </span>
                  <span className="mt-1.5 block text-[12px] leading-5 text-muted">
                    {chapter.subtitle}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 rounded-[18px] border border-[#6c5842]/10 bg-white/28 px-4 py-4">
        <p className="eyebrow">Randnotiz</p>
        <p className="mt-2 text-[12px] leading-5 text-muted">
          Die Kapitel bleiben offen, bis du eines aufschlägst.
        </p>
      </div>
    </div>
  );
}

function FrontispieceCard({ latestBooks }: { latestBooks: PublishedBookCard[] }) {
  return (
    <div className="pointer-events-auto flex h-[560px] w-[390px] select-none flex-col overflow-hidden rounded-[16px] border border-[rgba(101,79,53,0.1)] bg-[linear-gradient(180deg,rgba(251,245,236,0.8),rgba(241,231,214,0.7))] px-6 py-6">
      <p className="eyebrow">Frontispiz</p>
      <h2 className="display-title mt-4 text-[38px] leading-[0.95] text-foreground">
        Schlage ein Kapitel auf
      </h2>
      <p className="mt-4 text-[14px] leading-6 text-muted">
        Das Archiv antwortet nicht auf einmal. Es öffnet sich in Richtungen.
      </p>

      <div className="mt-8 grid gap-3">
        {homeChapters.slice(0, 4).map((chapter, index) => (
          <div
            key={chapter.id}
            className="rounded-[18px] border border-[#6c5842]/10 bg-white/34 px-4 py-4"
            style={{ transform: `translateX(${index * 6}px)` }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {chapter.kicker}
            </p>
            <p className="display-title mt-2 text-[21px] text-foreground">{chapter.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-[18px] border border-[#6c5842]/10 bg-white/30 px-5 py-5">
        <p className="eyebrow">Neu im Haus</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {latestBooks.slice(0, 3).map((book) => (
            <span
              key={book.id}
            className="rounded-full border border-[#6c5842]/10 bg-[#faf4ea]/80 px-3 py-1.5 text-[13px] text-foreground"
            >
              {book.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterPreviewBody({
  chapter,
  featuredBooks,
  latestBooks,
}: {
  chapter: HomeChapterDefinition;
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
}) {
  if (chapter.id === "buecher") {
    return (
      <div className="grid gap-3">
        {featuredBooks.slice(0, 2).map((book) => (
          <div
            key={book.id}
            className="rounded-[18px] border border-[#6c5842]/10 bg-white/30 px-4 py-4"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {book.categories.map((category) => category.name).join(" • ") || "Ausgabe"}
            </p>
            <p className="display-title mt-2 text-[30px] text-foreground">{book.title}</p>
            <p className="mt-2 text-[14px] leading-6 text-muted">{book.shortDescription}</p>
          </div>
        ))}
      </div>
    );
  }

  if (chapter.id === "bibliothek") {
    return (
      <div className="grid gap-3">
        {latestBooks.slice(0, 2).map((book) => (
          <div
            key={book.id}
            className="rounded-[18px] border border-[#6c5842]/10 bg-white/30 px-4 py-4"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Digitale Ausgabe
            </p>
            <p className="display-title mt-2 text-[27px] text-foreground">{book.title}</p>
            <p className="mt-2 text-[14px] leading-6 text-muted">
              Später verfügbar im privaten Regal mit Download und Lesespur.
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {chapter.motifs.map((motif, index) => (
        <div
          key={motif}
          className="rounded-[18px] border border-[#6c5842]/10 bg-white/28 px-4 py-4"
          style={{ transform: `translateX(${index * 8}px)` }}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {chapter.kicker}
          </p>
          <p className="mt-2 text-[16px] font-medium text-foreground">{motif}</p>
        </div>
      ))}
    </div>
  );
}

export function HomeBookRightPageHtml({
  chapter,
  featuredBooks,
  latestBooks,
}: {
  chapter: HomeChapterDefinition | undefined;
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
}) {
  if (!chapter) {
    return <FrontispieceCard latestBooks={latestBooks} />;
  }

  return (
    <Link
      href={chapter.href}
      className="pointer-events-auto flex h-[560px] w-[390px] select-none flex-col overflow-hidden rounded-[16px] border border-[rgba(101,79,53,0.1)] bg-[linear-gradient(180deg,rgba(251,245,236,0.8),rgba(241,231,214,0.7))] px-6 py-6 transition hover:bg-[linear-gradient(180deg,rgba(255,249,241,0.86),rgba(244,236,221,0.76))]"
    >
      <div className={`rounded-[18px] border bg-gradient-to-br p-5 ${chapter.palette.border} ${chapter.palette.wash}`}>
        <p className="eyebrow">{chapter.kicker}</p>
        <h2 className="display-title mt-3 text-[32px] leading-none text-foreground">
          {chapter.title}
        </h2>
        <p className="mt-3 text-[13px] leading-5 text-muted">{chapter.description}</p>
      </div>

      <div className="mt-5 flex-1">
        <ChapterPreviewBody
          chapter={chapter}
          featuredBooks={featuredBooks}
          latestBooks={latestBooks}
        />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-[18px] border border-[#6c5842]/10 bg-white/28 px-4 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Kapitel öffnen</p>
          <p className="mt-1 text-[14px] text-foreground">
            {chapter.id === "buecher" && latestBooks[0]
              ? `ab ${formatCurrency(latestBooks[0].priceInCents)}`
              : chapter.subtitle}
          </p>
        </div>
        <span className="display-title text-[24px] text-foreground">→</span>
      </div>
    </Link>
  );
}

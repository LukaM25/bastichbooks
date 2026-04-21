"use client";

import { cn } from "@/lib/utils";
import type {
  HomeChapterDefinition,
  HomeChapterId,
} from "@/features/home-book/config/chapters";

type BookLeftPageProps = {
  chapters: HomeChapterDefinition[];
  selectedChapter: HomeChapterId | null;
  onSelect: (chapterId: HomeChapterId) => void;
};

export function BookLeftPage({
  chapters,
  selectedChapter,
  onSelect,
}: BookLeftPageProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-l-[1.75rem] border-r border-[#6c5842]/12 bg-[linear-gradient(180deg,rgba(253,247,237,0.95),rgba(242,233,216,0.88))] px-6 py-7 md:px-8 md:py-8">
      <div className="book-page-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6">
          <p className="eyebrow">Inhaltsverzeichnis</p>
          <h2 className="display-title mt-3 text-3xl text-foreground md:text-[2.6rem]">
            Bastich Books
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            Ein persönliches Archiv aus Büchern, Wegen, Notizen und stillen Wissensformen.
          </p>
        </div>

        <div className="editorial-rule" />

        <ol className="mt-5 flex-1 space-y-2">
          {chapters.map((chapter) => {
            const active = selectedChapter === chapter.id;

            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => onSelect(chapter.id)}
                  className={cn(
                    "group relative flex w-full items-start gap-4 rounded-[1.45rem] px-4 py-3 text-left transition duration-300",
                    active ? "bg-[#f4ead8]/90 shadow-[inset_0_0_0_1px_rgba(103,82,55,0.12)]" : "hover:bg-white/45",
                  )}
                >
                  <span className="mt-1 inline-flex min-w-8 justify-center text-xs uppercase tracking-[0.18em] text-muted">
                    {chapter.index}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-3">
                      <span className="display-title text-[1.55rem] leading-none text-foreground">
                        {chapter.title}
                      </span>
                      <span
                        className={cn(
                          "archival-marker transition-opacity duration-300",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-70",
                        )}
                        aria-hidden
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted">
                      {chapter.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 rounded-[1.5rem] border border-[#6c5842]/12 bg-white/45 px-4 py-4">
          <p className="eyebrow">Randnotiz</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            Die Kapitel bleiben offen, bis du eines aufschlägst.
          </p>
        </div>
      </div>
    </div>
  );
}

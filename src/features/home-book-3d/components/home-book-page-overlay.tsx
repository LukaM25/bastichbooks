"use client";

import {
  getHomeChapter,
  type HomeChapterId,
} from "@/features/home-book/config/chapters";
import type { PublishedBookCard } from "@/features/books/queries";
import {
  HomeBookLeftPageHtml,
  HomeBookRightPageHtml,
} from "@/features/home-book-3d/components/home-book-pages-html";

type HomeBookPageOverlayProps = {
  selectedChapter: HomeChapterId | null;
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
  onSelectChapter: (chapterId: HomeChapterId) => void;
};

export function HomeBookPageOverlay({
  selectedChapter,
  featuredBooks,
  latestBooks,
  onSelectChapter,
}: HomeBookPageOverlayProps) {
  const activeChapter = selectedChapter ? getHomeChapter(selectedChapter) : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="origin-center scale-[0.58] pt-16 sm:scale-[0.7] md:scale-[0.82] lg:scale-[0.94] xl:scale-100">
        <div className="flex items-start gap-5">
          <div className="pointer-events-auto translate-y-5 rotate-[-2.2deg] shadow-[0_28px_60px_rgba(32,18,8,0.18)]">
            <HomeBookLeftPageHtml
              selectedChapter={selectedChapter}
              onSelectChapter={onSelectChapter}
            />
          </div>

          <div className="pointer-events-auto -translate-y-1 rotate-[2deg] shadow-[0_28px_60px_rgba(32,18,8,0.18)]">
            <HomeBookRightPageHtml
              chapter={activeChapter}
              featuredBooks={featuredBooks}
              latestBooks={latestBooks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

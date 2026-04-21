import type {
  HomeChapterDefinition,
  HomeChapterId,
} from "@/features/home-book/config/chapters";
import type { PublishedBookCard } from "@/features/books/queries";
import { ChapterTeaser } from "@/features/home-book/components/chapter-teaser";
import { FrontispiecePreview } from "@/features/home-book/components/frontispiece-preview";

type BookRightPageProps = {
  selectedChapter: HomeChapterId | null;
  activeChapter: HomeChapterDefinition | undefined;
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
  turnStamp: number;
};

export function BookRightPage({
  selectedChapter,
  activeChapter,
  featuredBooks,
  latestBooks,
  turnStamp,
}: BookRightPageProps) {
  return (
    <div
      key={`${selectedChapter ?? "frontispiz"}-${turnStamp}`}
      className="animate-[pageTurn_560ms_ease] h-full"
    >
      {selectedChapter && activeChapter ? (
        <ChapterTeaser
          chapter={activeChapter}
          featuredBooks={featuredBooks}
          latestBooks={latestBooks}
        />
      ) : (
        <FrontispiecePreview latestTitles={latestBooks.map((book) => book.title)} />
      )}
    </div>
  );
}

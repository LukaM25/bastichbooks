import { homeChapters } from "@/features/home-book/config/chapters";

type FrontispiecePreviewProps = {
  latestTitles: string[];
};

export function FrontispiecePreview({ latestTitles }: FrontispiecePreviewProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-r-[1.75rem] bg-[linear-gradient(180deg,rgba(250,244,234,0.96),rgba(241,231,214,0.88))] px-6 py-7 md:px-8 md:py-8">
      <div className="book-page-texture pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute inset-x-[16%] top-[18%] h-40 rounded-full bg-[radial-gradient(circle,rgba(250,230,168,0.22),transparent_70%)] blur-2xl" />
      <div className="relative z-10 flex h-full flex-col">
        <p className="eyebrow">Frontispiz</p>
        <h2 className="display-title mt-4 max-w-xl text-4xl leading-[0.95] text-foreground md:text-[3.5rem]">
          Schlage ein Kapitel auf
        </h2>
        <p className="mt-4 max-w-lg text-base leading-8 text-muted md:text-lg">
          Das Archiv öffnet sich nicht auf einmal. Es antwortet auf die Richtung, die du wählst.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {homeChapters.slice(0, 4).map((chapter, index) => (
            <div
              key={chapter.id}
              className="rounded-[1.35rem] border border-[#6c5842]/12 bg-white/50 px-4 py-3 animate-[floatSlow_10s_ease-in-out_infinite]"
              style={{ animationDelay: `${index * 0.8}s` }}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{chapter.kicker}</p>
              <p className="mt-2 display-title text-2xl text-foreground">{chapter.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{chapter.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-[1.6rem] border border-[#6c5842]/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.44),rgba(233,219,192,0.52))] px-5 py-5">
          <p className="eyebrow">Neu im Haus</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {latestTitles.slice(0, 3).map((title) => (
              <span
                key={title}
                className="rounded-full border border-[#6c5842]/12 bg-white/60 px-3 py-1.5 text-sm text-foreground"
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

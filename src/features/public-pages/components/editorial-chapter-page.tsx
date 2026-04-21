import { Button } from "@/components/ui/button";
import type { EditorialPageConfig } from "@/features/public-pages/config/editorial-pages";

export function EditorialChapterPage({
  config,
  cta,
}: {
  config: EditorialPageConfig;
  cta?: {
    href: string;
    label: string;
  };
}) {
  return (
    <div className="space-y-10">
      <section className="surface-strong rounded-[2.4rem] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">{config.eyebrow}</p>
        <h1 className="display-title mt-4 max-w-5xl text-5xl leading-none text-foreground md:text-7xl">
          {config.title}
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted">{config.lede}</p>
        <blockquote className="mt-8 max-w-3xl border-l-2 border-gold pl-5 text-xl italic text-brown">
          „{config.quote}“
        </blockquote>
        {cta ? (
          <div className="mt-8">
            <a href={cta.href}>
              <Button>{cta.label}</Button>
            </a>
          </div>
        ) : null}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-5">
          {config.sections.map((section) => (
            <article key={section.title} className="surface-card rounded-[2rem] p-6">
              <p className="eyebrow">Kapitel</p>
              <h2 className="display-title mt-3 text-3xl text-foreground">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-muted">{section.body}</p>
            </article>
          ))}
        </div>

        <aside className="surface-card rounded-[2rem] p-6">
          <p className="eyebrow">Schlagworte</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {config.notes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-line bg-white/55 px-4 py-2 text-sm text-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

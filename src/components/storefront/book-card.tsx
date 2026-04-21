import Link from "next/link";
import type { PublishedBookCard } from "@/features/books/queries";
import { formatCurrency } from "@/lib/format";
import { StatusPill } from "@/components/ui/status-pill";

export function BookCard({ book }: { book: PublishedBookCard }) {
  return (
    <article className="surface-card flex h-full flex-col rounded-[2rem] p-5">
      <div className="rounded-[1.5rem] bg-[linear-gradient(145deg,#5a6745,#2f3a25)] px-5 py-10 text-paper">
        <p className="eyebrow text-paper/80">
          {book.categories.map((category) => category.name).join(" • ") || "Archiv-Ausgabe"}
        </p>
        <h3 className="display-title mt-4 text-3xl leading-tight">{book.title}</h3>
        {book.subtitle ? (
          <p className="mt-2 text-sm leading-6 text-paper/80">{book.subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center justify-between gap-4">
          <StatusPill
            label={book.featured ? "Ausgewählt" : "Veröffentlicht"}
            tone={book.featured ? "success" : "neutral"}
          />
          <span className="text-sm font-medium text-brown">{formatCurrency(book.priceInCents)}</span>
        </div>
        <p className="mt-4 flex-1 text-base leading-7 text-muted">{book.shortDescription}</p>
        <Link
          href={`/buecher/${book.slug}`}
          className="mt-6 inline-flex items-center text-sm font-medium text-olive transition hover:text-olive-deep"
        >
          Zum Buch
        </Link>
      </div>
    </article>
  );
}

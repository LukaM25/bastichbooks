import Link from "next/link";
import { BookCard } from "@/components/storefront/book-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublishedBooks } from "@/features/books/queries";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const books = await getPublishedBooks(category);

  return (
    <div className="space-y-10">
      <section className="surface-strong rounded-[2.25rem] px-6 py-10 md:px-10">
        <p className="eyebrow">Katalog</p>
        <h1 className="display-title mt-3 text-5xl text-foreground">Bücher</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Veröffentlichte Titel erscheinen hier direkt aus der Datenbank. Entwürfe bleiben im
          Hintergrund, bis sie im Redaktionsbereich freigegeben werden.
        </p>
        {category ? (
          <div className="mt-5">
            <Link href="/buecher" className="text-sm font-medium text-olive">
              Filter „{category}“ zurücksetzen
            </Link>
          </div>
        ) : null}
      </section>

      {books.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      ) : (
        <EmptyState
          eyebrow="Noch keine Titel"
          title="Die Regale warten."
          description="Sobald ein Entwurf veröffentlicht wird, erscheint er automatisch in diesem Katalog."
        />
      )}
    </div>
  );
}

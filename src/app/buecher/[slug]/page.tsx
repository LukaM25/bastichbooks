import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { BookCard } from "@/components/storefront/book-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toggleWishlistAction } from "@/features/account/actions";
import { getBookBySlug, getRelatedBooks } from "@/features/books/queries";
import { startCheckoutAction } from "@/features/checkout/actions";
import { formatCurrency, formatDate, readingLength } from "@/lib/format";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book || book.status !== "PUBLISHED") {
    return {
      title: "Buch nicht gefunden",
    };
  }

  return {
    title: book.title,
    description: book.shortDescription,
    openGraph: {
      title: book.title,
      description: book.shortDescription,
      url: absoluteUrl(`/buecher/${book.slug}`),
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [session, book] = await Promise.all([auth(), getBookBySlug(slug)]);

  if (!book || book.status !== "PUBLISHED") {
    notFound();
  }

  const relatedBooks = await getRelatedBooks(book.id);
  const wishlistEntry = session?.user
    ? book.wishlistItems.some((item) => item.userId === session.user.id)
    : false;
  const alreadyOwned = session?.user
    ? book.orderItems.some(
        (item) =>
          item.order.userId === session.user.id && item.order.status === "PAID",
      )
    : false;

  return (
    <div className="space-y-12">
      <section className="surface-strong grid gap-10 rounded-[2.5rem] px-6 py-10 md:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">
            {book.categories.map(({ category }) => category.name).join(" • ") ||
              "Veröffentlichter Titel"}
          </p>
          <h1 className="display-title mt-4 text-5xl leading-none text-foreground md:text-6xl">
            {book.title}
          </h1>
          {book.subtitle ? (
            <p className="mt-4 max-w-3xl text-xl leading-8 text-muted">{book.subtitle}</p>
          ) : null}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{book.description}</p>
          {book.featuredQuote ? (
            <blockquote className="mt-8 border-l-2 border-gold pl-5 text-xl italic text-brown">
              „{book.featuredQuote}“
            </blockquote>
          ) : null}
        </div>

        <aside className="surface-card rounded-[2rem] p-6">
          <div className="rounded-[1.75rem] bg-[linear-gradient(150deg,#596847,#2d3823)] px-6 py-10 text-paper">
            <p className="eyebrow text-paper/80">Archiv-Ausgabe</p>
            <p className="display-title mt-4 text-4xl">{formatCurrency(book.priceInCents)}</p>
            <p className="mt-4 text-sm leading-7 text-paper/80">
              {book.pageCount ? `${book.pageCount} Seiten` : "Digitale Ausgabe"} •{" "}
              {readingLength(book.pageCount)}
            </p>
          </div>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>Veröffentlichung: {formatDate(book.releaseDate ?? book.publishedAt)}</p>
            <p>Format: EPUB / PDF</p>
            <p>Status: veröffentlicht und direkt im Schaufenster sichtbar</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {alreadyOwned ? (
              <Link href="/account/library">
                <Button className="w-full">In der Bibliothek öffnen</Button>
              </Link>
            ) : (
              <form action={startCheckoutAction}>
                <input type="hidden" name="bookId" value={book.id} />
                <input type="hidden" name="slug" value={book.slug} />
                <Button type="submit" className="w-full">
                  Jetzt erwerben
                </Button>
              </form>
            )}

            <form action={toggleWishlistAction}>
              <input type="hidden" name="bookId" value={book.id} />
              <input type="hidden" name="redirectPath" value={`/buecher/${book.slug}`} />
              <Button type="submit" variant="secondary" className="w-full">
                {wishlistEntry ? "Von der Merkliste entfernen" : "Zur Merkliste"}
              </Button>
            </form>
          </div>
          {!session?.user ? (
            <p className="mt-4 text-sm text-muted">
              Melde dich an, um Titel zu kaufen oder für später zu speichern.
            </p>
          ) : null}
        </aside>
      </section>

      <section>
        <div className="mb-6">
          <p className="eyebrow">Weiterlesen</p>
          <h2 className="display-title mt-3 text-4xl text-foreground">Mehr aus dem Archiv</h2>
        </div>
        {relatedBooks.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        ) : (
          <EmptyState
            eyebrow="Noch keine Empfehlungen"
            title="Hier endet das Regal vorerst."
            description="Sobald weitere Titel veröffentlicht sind, erscheinen hier passende Empfehlungen."
          />
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getAccountDashboard } from "@/features/account/queries";

export default async function AccountLibraryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { purchasedBooks } = await getAccountDashboard(session.user.id);

  if (purchasedBooks.length === 0) {
    return (
      <EmptyState
        eyebrow="Library empty"
        title="No purchased books yet."
        description="Books you buy through Stripe checkout will appear here with download access."
        action={
          <Link href="/books">
            <Button>Browse books</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {purchasedBooks.map((book) => (
        <article key={book.id} className="surface-card rounded-[2rem] p-6">
          <p className="eyebrow">{book.categories.map(({ category }) => category.name).join(" • ")}</p>
          <h2 className="display-title mt-3 text-3xl text-foreground">{book.title}</h2>
          <p className="mt-3 text-base leading-7 text-muted">{book.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/books/${book.slug}`}>
              <Button variant="secondary">View details</Button>
            </Link>
            <Link href={`/api/downloads/${book.id}`}>
              <Button>Download</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

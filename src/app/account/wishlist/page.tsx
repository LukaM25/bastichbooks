import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toggleWishlistAction } from "@/features/account/actions";
import { getAccountDashboard } from "@/features/account/queries";

export default async function AccountWishlistPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { wishlist } = await getAccountDashboard(session.user.id);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        eyebrow="Wishlist empty"
        title="Nothing saved for later."
        description="Use the wishlist on any book page to keep a stack of titles worth returning to."
      />
    );
  }

  return (
    <div className="space-y-5">
      {wishlist.map((entry) => (
        <article key={entry.id} className="surface-card flex flex-col gap-5 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">{entry.book.categories.map(({ category }) => category.name).join(" • ")}</p>
            <h2 className="display-title mt-3 text-3xl text-foreground">{entry.book.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              {entry.book.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/books/${entry.book.slug}`}>
              <Button variant="secondary">Open book</Button>
            </Link>
            <form action={toggleWishlistAction}>
              <input type="hidden" name="bookId" value={entry.bookId} />
              <input type="hidden" name="redirectPath" value="/account/wishlist" />
              <Button type="submit" variant="ghost">
                Remove
              </Button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}

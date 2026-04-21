import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { deleteBookAction } from "@/features/admin/actions";
import { getAdminDashboardData } from "@/features/admin/queries";
import { formatCurrency } from "@/lib/format";

export default async function AdminBooksPage() {
  const { books } = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/books/new">
          <Button>Create a new book</Button>
        </Link>
      </div>
      {books.length > 0 ? (
        <div className="space-y-4">
          {books.map((book) => (
            <article key={book.id} className="surface-card rounded-[2rem] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="eyebrow">{book.status}</p>
                  <h2 className="display-title mt-3 text-3xl text-foreground">{book.title}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                    {book.shortDescription}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {book.categories.map(({ category }) => category.name).join(" • ") || "No categories"} •{" "}
                    {formatCurrency(book.priceInCents)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/admin/books/${book.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <form action={deleteBookAction}>
                    <input type="hidden" name="id" value={book.id} />
                    <Button type="submit" variant="ghost">
                      {book._count.orderItems > 0 ? "Archive" : "Delete"}
                    </Button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          eyebrow="No books"
          title="The catalog is empty."
          description="Create the first book draft to start the publishing pipeline."
          action={
            <Link href="/admin/books/new">
              <Button>Create a book</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}

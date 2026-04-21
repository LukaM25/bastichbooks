import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAdminDashboardData } from "@/features/admin/queries";

export default async function AdminDashboardPage() {
  const { books, metrics } = await getAdminDashboardData();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="grid gap-4 md:grid-cols-2">
        <div className="surface-card rounded-[2rem] p-6">
          <p className="text-sm text-muted">Books</p>
          <p className="display-title mt-3 text-4xl text-foreground">{metrics.books}</p>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="text-sm text-muted">Categories</p>
          <p className="display-title mt-3 text-4xl text-foreground">{metrics.categories}</p>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="text-sm text-muted">Orders</p>
          <p className="display-title mt-3 text-4xl text-foreground">{metrics.orders}</p>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="text-sm text-muted">Customers</p>
          <p className="display-title mt-3 text-4xl text-foreground">{metrics.customers}</p>
        </div>
      </section>
      <section className="surface-card rounded-[2rem] p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Latest edits</p>
            <h2 className="display-title mt-3 text-3xl text-foreground">Books in motion</h2>
          </div>
          <Link href="/admin/books/new">
            <Button>Create book</Button>
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {books.slice(0, 5).map((book) => (
            <Link
              key={book.id}
              href={`/admin/books/${book.id}`}
              className="block rounded-[1.5rem] border border-line bg-white/45 p-5 transition hover:bg-white/70"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-medium text-foreground">{book.title}</span>
                <span className="text-sm text-muted">{book.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {book.categories.map(({ category }) => category.name).join(" • ") || "No categories"}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/books">
            <Button variant="secondary">Manage books</Button>
          </Link>
          <Link href="/admin/categories">
            <Button variant="ghost">Manage categories</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

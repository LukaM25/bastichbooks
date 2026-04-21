import { BookForm } from "@/components/admin/book-form";
import { getBookFormData } from "@/features/admin/queries";

export default async function NewBookPage() {
  const { categories } = await getBookFormData();

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[2rem] p-6">
        <p className="eyebrow">New title</p>
        <h2 className="display-title mt-3 text-3xl text-foreground">Create a book draft</h2>
      </section>
      <BookForm book={null} categories={categories} />
    </div>
  );
}

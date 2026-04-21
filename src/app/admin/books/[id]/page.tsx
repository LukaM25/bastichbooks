import { notFound } from "next/navigation";
import { BookForm } from "@/components/admin/book-form";
import { getBookFormData } from "@/features/admin/queries";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { book, categories } = await getBookFormData(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[2rem] p-6">
        <p className="eyebrow">Edit title</p>
        <h2 className="display-title mt-3 text-3xl text-foreground">{book.title}</h2>
      </section>
      <BookForm book={book} categories={categories} />
    </div>
  );
}

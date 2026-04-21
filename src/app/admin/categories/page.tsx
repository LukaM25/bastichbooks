import { CategoryForm } from "@/components/admin/category-form";
import { Button } from "@/components/ui/button";
import { deleteCategoryAction } from "@/features/admin/actions";
import { getAdminDashboardData } from "@/features/admin/queries";

export default async function AdminCategoriesPage() {
  const { categories } = await getAdminDashboardData();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="surface-card rounded-[2rem] p-6">
        <p className="eyebrow">New category</p>
        <h2 className="display-title mt-3 text-3xl text-foreground">Create a shelf</h2>
        <div className="mt-6">
          <CategoryForm />
        </div>
      </section>
      <section className="space-y-4">
        {categories.map((category) => (
          <article key={category.id} className="surface-card rounded-[2rem] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="eyebrow">{category._count.books} books</p>
                <h2 className="display-title mt-3 text-3xl text-foreground">{category.name}</h2>
                <p className="mt-3 text-base leading-7 text-muted">{category.description}</p>
              </div>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={category.id} />
                <Button type="submit" variant="ghost">
                  Delete
                </Button>
              </form>
            </div>
            <div className="mt-6">
              <CategoryForm
                defaultValues={{
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                  description: category.description,
                }}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { Book, Category } from "@prisma/client";
import { saveBookAction } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState } from "@/lib/action-state";

type BookFormValues = {
  id?: string;
  title: string;
  slug?: string;
  subtitle?: string;
  shortDescription: string;
  description: string;
  featuredQuote?: string;
  isbn?: string;
  pageCount?: number;
  price: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  releaseDate?: string;
  sampleUrl?: string;
  categoryIds: string[];
};

export function BookForm({
  book,
  categories,
}: {
  book: (Book & { categories: Array<{ categoryId: string }> }) | null;
  categories: Category[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ActionState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const form = useForm<BookFormValues>({
    defaultValues: {
      id: book?.id,
      title: book?.title ?? "",
      slug: book?.slug ?? "",
      subtitle: book?.subtitle ?? "",
      shortDescription: book?.shortDescription ?? "",
      description: book?.description ?? "",
      featuredQuote: book?.featuredQuote ?? "",
      isbn: book?.isbn ?? "",
      pageCount: book?.pageCount ?? undefined,
      price: book ? book.priceInCents / 100 : 16,
      status: book?.status ?? "DRAFT",
      featured: book?.featured ?? false,
      releaseDate: book?.releaseDate ? new Date(book.releaseDate).toISOString().slice(0, 10) : "",
      sampleUrl: book?.sampleUrl ?? "",
      categoryIds: book?.categories.map((category) => category.categoryId) ?? [],
    },
  });

  return (
    <form
      ref={formRef}
      className="space-y-8"
      onSubmit={form.handleSubmit(() => {
        if (!formRef.current) {
          return;
        }

        const data = new FormData(formRef.current);

        startTransition(async () => {
          const result = await saveBookAction({ status: "idle" }, data);
          setState(result);
        });
      })}
    >
      <input type="hidden" {...form.register("id")} />

      <section className="surface-card grid gap-6 rounded-[2rem] p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <p className="eyebrow">Editorial data</p>
          <h2 className="display-title mt-3 text-3xl text-foreground">Book details</h2>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Title</label>
          <Input {...form.register("title")} />
          {form.formState.errors.title ? (
            <p className="mt-2 text-sm text-[#7d2a1d]">{form.formState.errors.title.message}</p>
          ) : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Slug</label>
          <Input {...form.register("slug")} placeholder="Optional; auto-generated when blank" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-foreground">Subtitle</label>
          <Input {...form.register("subtitle")} />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-foreground">Short description</label>
          <Textarea {...form.register("shortDescription")} className="min-h-24" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-foreground">Long description</label>
          <Textarea {...form.register("description")} className="min-h-40" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-foreground">Featured quote</label>
          <Textarea {...form.register("featuredQuote")} className="min-h-24" />
        </div>
      </section>

      <section className="surface-card grid gap-6 rounded-[2rem] p-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Price (USD)</label>
          <Input type="number" step="0.01" min="1" {...form.register("price", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Status</label>
          <Select {...form.register("status")}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">ISBN</label>
          <Input {...form.register("isbn")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Page count</label>
          <Input type="number" min="1" {...form.register("pageCount", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Release date</label>
          <Input type="date" {...form.register("releaseDate")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Sample URL</label>
          <Input {...form.register("sampleUrl")} placeholder="https://example.com/sample" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-foreground">Categories</label>
          <div className="grid gap-3 rounded-[1.5rem] border border-line bg-white/45 p-4 md:grid-cols-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-3 text-sm text-foreground">
                <input type="checkbox" value={category.id} {...form.register("categoryIds")} />
                {category.name}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 rounded-full border border-line bg-white/45 px-4 py-3 text-sm text-foreground">
          <input type="checkbox" {...form.register("featured")} />
          Feature this book on the homepage
        </label>
      </section>

      <section className="surface-card grid gap-6 rounded-[2rem] p-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Cover image</label>
          <Input name="coverFile" type="file" accept="image/*" />
          <p className="mt-2 text-xs text-muted">
            Uploading requires Vercel Blob. Existing cover is retained when left blank.
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">EPUB or PDF file</label>
          <Input name="ebookFile" type="file" accept=".epub,.pdf,application/epub+zip,application/pdf" />
          <p className="mt-2 text-xs text-muted">
            Uploaded ebook files are stored privately when Blob is configured.
          </p>
        </div>
      </section>

      {state.message ? <p className="text-sm text-muted">{state.message}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : book ? "Save changes" : "Create book"}
        </Button>
      </div>
    </form>
  );
}

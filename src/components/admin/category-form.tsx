"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveCategoryAction } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categorySchema } from "@/lib/validation/admin";
import type { ActionState } from "@/lib/action-state";

type CategoryFormValues = {
  id?: string;
  name: string;
  slug?: string;
  description: string;
};

export function CategoryForm({
  defaultValues,
}: {
  defaultValues?: CategoryFormValues;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ActionState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues ?? {
      name: "",
      slug: "",
      description: "",
    },
  });

  return (
    <form
      ref={formRef}
      className="space-y-4 rounded-[1.75rem] border border-line bg-white/45 p-5"
      onSubmit={form.handleSubmit(() => {
        if (!formRef.current) {
          return;
        }

        const data = new FormData(formRef.current);

        startTransition(async () => {
          const result = await saveCategoryAction({ status: "idle" }, data);
          setState(result);
        });
      })}
    >
      <input type="hidden" {...form.register("id")} />
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
        <Input {...form.register("name")} />
        {form.formState.errors.name ? (
          <p className="mt-2 text-sm text-[#7d2a1d]">{form.formState.errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Slug</label>
        <Input {...form.register("slug")} placeholder="Optional; auto-generated when blank" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Description</label>
        <Textarea {...form.register("description")} className="min-h-24" />
        {form.formState.errors.description ? (
          <p className="mt-2 text-sm text-[#7d2a1d]">
            {form.formState.errors.description.message}
          </p>
        ) : null}
      </div>
      {state.message ? <p className="text-sm text-muted">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : defaultValues?.id ? "Update category" : "Create category"}
      </Button>
    </form>
  );
}

"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { errorActionState, successActionState, type ActionState } from "@/lib/action-state";
import { featureFlags } from "@/lib/env";
import { uploadPrivateBlob, uploadPublicBlob } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import { getFileIfPresent, slugify } from "@/lib/utils";
import { bookSchema, categorySchema } from "@/lib/validation/admin";

function ensureAdmin(session: { user?: { role?: string } } | null) {
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Admin access required.");
  }
}

function revalidateCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/books");
  revalidatePath("/admin");
  revalidatePath("/admin/books");
  revalidatePath("/admin/categories");

  if (slug) {
    revalidatePath(`/books/${slug}`);
  }
}

export async function saveCategoryAction(
  _previousState: ActionState,
  formData: FormData,
) {
  ensureAdmin(await auth());

  const parsed = categorySchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return errorActionState("The category details need a quick correction.", parsed.error.flatten().fieldErrors);
  }

  const slug = slugify(parsed.data.slug || parsed.data.name);

  try {
    if (parsed.data.id) {
      await prisma.category.update({
        where: { id: parsed.data.id },
        data: {
          name: parsed.data.name,
          slug,
          description: parsed.data.description,
        },
      });
    } else {
      await prisma.category.create({
        data: {
          name: parsed.data.name,
          slug,
          description: parsed.data.description,
        },
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return errorActionState("A category with that name or slug already exists.");
    }

    throw error;
  }

  revalidateCatalog();

  return successActionState("Category saved.");
}

export async function deleteCategoryAction(formData: FormData) {
  ensureAdmin(await auth());

  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidateCatalog();
}

export async function saveBookAction(_previousState: ActionState, formData: FormData) {
  ensureAdmin(await auth());

  const parsed = bookSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    subtitle: formData.get("subtitle") || undefined,
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    featuredQuote: formData.get("featuredQuote") || undefined,
    isbn: formData.get("isbn") || undefined,
    pageCount: formData.get("pageCount") || undefined,
    price: formData.get("price"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
    releaseDate: formData.get("releaseDate") || undefined,
    sampleUrl: formData.get("sampleUrl") || "",
    categoryIds: formData.getAll("categoryIds").map(String),
  });

  if (!parsed.success) {
    return errorActionState("The manuscript needs a few edits before it can be shelved.", parsed.error.flatten().fieldErrors);
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  const coverFile = getFileIfPresent(formData.get("coverFile"));
  const ebookFile = getFileIfPresent(formData.get("ebookFile"));

  if ((coverFile || ebookFile) && !featureFlags.blob) {
    return errorActionState("Blob storage is not configured yet, so files cannot be uploaded.");
  }

  const existingBook = parsed.data.id
    ? await prisma.book.findUnique({ where: { id: parsed.data.id } })
    : null;

  const coverUpload = coverFile
    ? await uploadPublicBlob(`covers/${slug}-${coverFile.name}`, coverFile)
    : null;
  const ebookUpload = ebookFile
    ? await uploadPrivateBlob(`ebooks/${slug}-${ebookFile.name}`, ebookFile)
    : null;

  try {
    const book = parsed.data.id
      ? await prisma.book.update({
          where: { id: parsed.data.id },
          data: {
            title: parsed.data.title,
            slug,
            subtitle: parsed.data.subtitle || null,
            shortDescription: parsed.data.shortDescription,
            description: parsed.data.description,
            featuredQuote: parsed.data.featuredQuote || null,
            isbn: parsed.data.isbn || null,
            pageCount: parsed.data.pageCount || null,
            priceInCents: Math.round(parsed.data.price * 100),
            status: parsed.data.status,
            featured: parsed.data.featured,
            sampleUrl: parsed.data.sampleUrl || null,
            coverImageUrl: coverUpload?.url ?? existingBook?.coverImageUrl ?? null,
            ebookFileUrl: ebookUpload?.url ?? existingBook?.ebookFileUrl ?? null,
            publishedAt:
              parsed.data.status === "PUBLISHED"
                ? existingBook?.publishedAt ?? new Date()
                : parsed.data.status === "ARCHIVED"
                  ? null
                  : existingBook?.publishedAt ?? null,
            releaseDate: parsed.data.releaseDate ? new Date(parsed.data.releaseDate) : null,
            categories: {
              deleteMany: {},
              create: parsed.data.categoryIds.map((categoryId) => ({
                categoryId,
              })),
            },
          },
        })
      : await prisma.book.create({
          data: {
            title: parsed.data.title,
            slug,
            subtitle: parsed.data.subtitle || null,
            shortDescription: parsed.data.shortDescription,
            description: parsed.data.description,
            featuredQuote: parsed.data.featuredQuote || null,
            isbn: parsed.data.isbn || null,
            pageCount: parsed.data.pageCount || null,
            priceInCents: Math.round(parsed.data.price * 100),
            status: parsed.data.status,
            featured: parsed.data.featured,
            sampleUrl: parsed.data.sampleUrl || null,
            coverImageUrl: coverUpload?.url ?? null,
            ebookFileUrl: ebookUpload?.url ?? null,
            publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
            releaseDate: parsed.data.releaseDate ? new Date(parsed.data.releaseDate) : null,
            categories: {
              create: parsed.data.categoryIds.map((categoryId) => ({
                categoryId,
              })),
            },
          },
        });

    revalidateCatalog(slug);
    redirect(`/admin/books/${book.id}?saved=1`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return errorActionState("That book slug is already in use.");
    }

    throw error;
  }
}

export async function deleteBookAction(formData: FormData) {
  ensureAdmin(await auth());

  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  if (!book) {
    return;
  }

  if (book._count.orderItems > 0) {
    await prisma.book.update({
      where: { id },
      data: {
        status: "ARCHIVED",
        featured: false,
      },
    });
  } else {
    await prisma.book.delete({
      where: { id },
    });
  }

  revalidateCatalog(book.slug);
}

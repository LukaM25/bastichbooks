import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const publishedBookCardSelect = {
  id: true,
  title: true,
  slug: true,
  subtitle: true,
  shortDescription: true,
  priceInCents: true,
  featured: true,
  featuredQuote: true,
  pageCount: true,
  coverImageUrl: true,
  createdAt: true,
  publishedAt: true,
  categories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
} satisfies Prisma.BookSelect;

export type PublishedBookCard = Prisma.BookGetPayload<{
  select: typeof publishedBookCardSelect;
}> extends infer T
  ? Omit<T & object, "categories"> & {
      categories: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
    }
  : never;

function normalizeBookCard(
  book: Prisma.BookGetPayload<{ select: typeof publishedBookCardSelect }>,
): PublishedBookCard {
  return {
    ...book,
    categories: book.categories.map(({ category }) => category),
  } as PublishedBookCard;
}

export async function getFeaturedBooks() {
  const books = await prisma.book.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: publishedBookCardSelect,
    take: 3,
  });

  return books.map(normalizeBookCard);
}

export async function getPublishedBooks(category?: string) {
  const books = await prisma.book.findMany({
    where: {
      status: "PUBLISHED",
      ...(category
        ? {
            categories: {
              some: {
                category: {
                  slug: category,
                },
              },
            },
          }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    select: publishedBookCardSelect,
  });

  return books.map(normalizeBookCard);
}

export async function getHomepageData() {
  const [featuredBooks, latestBooks, categories] = await Promise.all([
    getFeaturedBooks(),
    prisma.book.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 6,
      select: publishedBookCardSelect,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        _count: {
          select: {
            books: true,
          },
        },
      },
    }),
  ]);

  return {
    featuredBooks,
    latestBooks: latestBooks.map(normalizeBookCard),
    categories,
  };
}

export async function getBookBySlug(slug: string) {
  return prisma.book.findUnique({
    where: { slug },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      wishlistItems: true,
      orderItems: {
        include: {
          order: true,
        },
      },
    },
  });
}

export async function getRelatedBooks(bookId: string) {
  const books = await prisma.book.findMany({
    where: {
      id: { not: bookId },
      status: "PUBLISHED",
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    select: publishedBookCardSelect,
    take: 3,
  });

  return books.map(normalizeBookCard);
}

import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
  const [books, categories, orders, customers] = await Promise.all([
    prisma.book.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            wishlistItems: true,
            orderItems: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.category.findMany({
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.order.count(),
    prisma.user.count({
      where: {
        role: "READER",
      },
    }),
  ]);

  return {
    books,
    categories,
    metrics: {
      books: books.length,
      categories: categories.length,
      orders,
      customers,
    },
  };
}

export async function getBookFormData(bookId?: string) {
  const [categories, book] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
    bookId
      ? prisma.book.findUnique({
          where: { id: bookId },
          include: {
            categories: true,
          },
        })
      : Promise.resolve(null),
  ]);

  return {
    categories,
    book,
  };
}

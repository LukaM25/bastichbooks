import { prisma } from "@/lib/prisma";

export async function getAccountDashboard(userId: string) {
  const [wishlistCount, orders, wishlist, purchasedBooks] = await Promise.all([
    prisma.wishlistItem.count({
      where: { userId },
    }),
    prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            book: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        book: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.book.findMany({
      where: {
        orderItems: {
          some: {
            order: {
              userId,
              status: "PAID",
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    }),
  ]);

  return {
    metrics: {
      orders: orders.length,
      library: purchasedBooks.length,
      wishlist: wishlistCount,
    },
    orders,
    wishlist,
    purchasedBooks,
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function toggleWishlistAction(formData: FormData) {
  const session = await auth();
  const bookId = String(formData.get("bookId") || "");
  const redirectPath = String(formData.get("redirectPath") || "/books");

  if (!session?.user) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(redirectPath)}`);
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: {
      userId_bookId: {
        userId: session.user.id,
        bookId,
      },
    },
  });

  if (existing) {
    await prisma.wishlistItem.delete({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },
    });
  } else {
    await prisma.wishlistItem.create({
      data: {
        userId: session.user.id,
        bookId,
      },
    });
  }

  revalidatePath(redirectPath);
  revalidatePath("/account");
  revalidatePath("/account/wishlist");
}

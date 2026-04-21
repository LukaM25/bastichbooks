import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { featureFlags } from "@/lib/env";
import { getPrivateDownload } from "@/lib/blob";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bookId: string }> },
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", process.env.AUTH_URL || "http://localhost:3000"));
  }

  const { bookId } = await params;
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      bookId,
      order: {
        userId: session.user.id,
        status: "PAID",
      },
    },
    include: {
      book: true,
    },
  });

  if (!orderItem?.book.ebookFileUrl) {
    return NextResponse.json(
      {
        message: "This book does not have a downloadable file yet.",
      },
      { status: 404 },
    );
  }

  if (featureFlags.blob) {
    const blob = await getPrivateDownload(orderItem.book.ebookFileUrl);

    if (blob?.blob.downloadUrl) {
      return NextResponse.redirect(blob.blob.downloadUrl);
    }
  }

  return NextResponse.redirect(orderItem.book.ebookFileUrl);
}

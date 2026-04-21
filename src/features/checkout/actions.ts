"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { absoluteUrl } from "@/lib/utils";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function startCheckoutAction(formData: FormData) {
  const session = await auth();
  const bookId = String(formData.get("bookId") || "");
  const slug = String(formData.get("slug") || "");

  if (!session?.user) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/buecher/${slug}`)}`);
  }

  const stripe = getStripe();

  if (!stripe) {
    redirect(`/buecher/${slug}?checkout=unavailable`);
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      status: "PUBLISHED",
    },
  });

  if (!book) {
    redirect("/buecher");
  }

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      status: "PAID",
      items: {
        some: {
          bookId: book.id,
        },
      },
    },
  });

  if (existingOrder) {
    redirect("/account/library");
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: "PENDING",
      subtotalInCents: book.priceInCents,
      items: {
        create: {
          bookId: book.id,
          unitAmountInCents: book.priceInCents,
          titleSnapshot: book.title,
          slugSnapshot: book.slug,
        },
      },
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email ?? undefined,
    success_url: absoluteUrl(`/checkout/success?orderId=${order.id}`),
    cancel_url: absoluteUrl(`/buecher/${book.slug}?checkout=canceled`),
    client_reference_id: order.id,
    metadata: {
      orderId: order.id,
      userId: session.user.id,
      bookId: book.id,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: book.priceInCents,
          product_data: {
            name: book.title,
            description: book.shortDescription,
            images: book.coverImageUrl ? [book.coverImageUrl] : undefined,
          },
        },
      },
    ],
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripeCheckoutSessionId: checkoutSession.id,
    },
  });

  redirect(checkoutSession.url || `/buecher/${book.slug}`);
}

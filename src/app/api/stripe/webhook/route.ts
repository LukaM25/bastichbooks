import Stripe from "stripe";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!stripe || !env.STRIPE_WEBHOOK_SECRET || !signature) {
    return NextResponse.json({ message: "Stripe is not configured." }, { status: 503 });
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Invalid webhook signature.",
      },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === "string" ? session.payment_intent : null,
            paidAt: new Date(),
          },
        });
      }

      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "CANCELED",
          },
        });
      }

      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      if (typeof paymentIntent.metadata?.orderId === "string") {
        await prisma.order.update({
          where: { id: paymentIntent.metadata.orderId },
          data: {
            status: "FAILED",
            stripePaymentIntentId: paymentIntent.id,
          },
        });
      }

      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

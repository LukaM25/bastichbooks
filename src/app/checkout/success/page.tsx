import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findFirst({
        where: {
          id: orderId,
          userId: session.user.id,
        },
        include: {
          items: true,
        },
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="surface-card rounded-[2.25rem] px-6 py-12 text-center md:px-10">
        <p className="eyebrow">Bestellung eingegangen</p>
        <h1 className="display-title mt-4 text-5xl text-foreground">
          Dein Beleg wurde ins Hausbuch eingetragen.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Stripe hat die Bestellung an Bastich Books zurückgegeben. Sobald der Webhook die Zahlung
          bestätigt, erscheint der Titel in deiner Bibliothek.
        </p>
        {order ? (
          <p className="mt-6 text-sm text-muted">
            Bestellung {order.id.slice(-8)} •{" "}
            {order.items.map((item) => item.titleSnapshot).join(", ")}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/account/library">
            <Button>Bibliothek öffnen</Button>
          </Link>
          <Link href="/buecher">
            <Button variant="secondary">Weiterstöbern</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

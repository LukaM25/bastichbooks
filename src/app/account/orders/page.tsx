import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { EmptyState } from "@/components/ui/empty-state";
import { getAccountDashboard } from "@/features/account/queries";
import { formatCurrency, formatDate } from "@/lib/format";

export default async function AccountOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { orders } = await getAccountDashboard(session.user.id);

  if (orders.length === 0) {
    return (
      <EmptyState
        eyebrow="No orders yet"
        title="Your ledger is empty."
        description="Purchased books will appear here as soon as checkout is completed."
      />
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <article key={order.id} className="surface-card rounded-[2rem] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Order {order.id.slice(-8)}</p>
              <h2 className="display-title mt-3 text-3xl text-foreground">
                {order.items.map((item) => item.titleSnapshot).join(", ")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Placed {formatDate(order.createdAt)} • {order.status}
              </p>
            </div>
            <p className="text-lg font-medium text-brown">{formatCurrency(order.subtotalInCents)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

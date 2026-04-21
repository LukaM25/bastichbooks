import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAccountDashboard } from "@/features/account/queries";

export default async function AccountOverviewPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const dashboard = await getAccountDashboard(session.user.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="surface-card rounded-[2rem] p-6">
        <p className="eyebrow">House ledger</p>
        <div className="mt-6 grid gap-4">
          <div className="rounded-[1.5rem] border border-line bg-white/45 p-5">
            <p className="text-sm text-muted">Orders</p>
            <p className="display-title mt-3 text-4xl text-foreground">{dashboard.metrics.orders}</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-white/45 p-5">
            <p className="text-sm text-muted">Library books</p>
            <p className="display-title mt-3 text-4xl text-foreground">{dashboard.metrics.library}</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-white/45 p-5">
            <p className="text-sm text-muted">Wishlist</p>
            <p className="display-title mt-3 text-4xl text-foreground">{dashboard.metrics.wishlist}</p>
          </div>
        </div>
      </section>
      <section className="surface-card rounded-[2rem] p-6">
        <p className="eyebrow">Recent order history</p>
        <div className="mt-6 space-y-4">
          {dashboard.orders.slice(0, 3).map((order) => (
            <div key={order.id} className="rounded-[1.5rem] border border-line bg-white/45 p-5">
              <p className="text-sm text-muted">Order {order.id.slice(-8)}</p>
              <p className="mt-2 text-base font-medium text-foreground">
                {order.items.map((item) => item.titleSnapshot).join(", ")}
              </p>
              <p className="mt-1 text-sm text-muted">{order.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

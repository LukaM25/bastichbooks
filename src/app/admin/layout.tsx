import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/categories", label: "Categories" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <div className="space-y-8">
      <section className="surface-strong rounded-[2.25rem] px-6 py-10 md:px-10">
        <p className="eyebrow">Admin dashboard</p>
        <h1 className="display-title mt-3 text-5xl text-foreground">Back room editorial control</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Manage categories, save drafts, publish books without code changes, and watch them
          propagate across the storefront instantly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-line bg-white/55 px-4 py-2 text-sm text-foreground transition hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
      {children}
    </div>
  );
}

import Link from "next/link";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/library", label: "Library" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-8">
      <section className="surface-strong rounded-[2.25rem] px-6 py-10 md:px-10">
        <p className="eyebrow">Reader account</p>
        <h1 className="display-title mt-3 text-5xl text-foreground">Your private library</h1>
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

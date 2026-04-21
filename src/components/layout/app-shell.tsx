"use client";

import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function AppShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  const showChrome = pathname !== "/";

  return (
    <div className="relative min-h-screen">
      {showChrome ? <div className="page-grain" aria-hidden /> : null}
      {showChrome ? <div className="page-glow page-glow-left" aria-hidden /> : null}
      {showChrome ? <div className="page-glow page-glow-right" aria-hidden /> : null}
      {showChrome ? <SiteHeader session={session} /> : null}
      <main
        className={
          showChrome
            ? "mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl flex-col px-6 pb-16 pt-8 md:px-10"
            : "flex min-h-screen w-full flex-col"
        }
      >
        {children}
      </main>
      {showChrome ? <SiteFooter /> : null}
    </div>
  );
}

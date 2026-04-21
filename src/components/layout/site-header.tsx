import Link from "next/link";
import type { Session } from "next-auth";
import { logoutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export function SiteHeader({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#f7f0e3]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col">
            <span className="display-title text-2xl leading-none text-foreground">
              Bastich Books
            </span>
            <span className="eyebrow mt-1">Archiv von Dom Bastich</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
            <Link href="/buecher" className="transition hover:text-foreground">
              Bücher
            </Link>
            <Link href="/ueber-dom" className="transition hover:text-foreground">
              Über Dom
            </Link>
            <Link href="/bibliothek" className="transition hover:text-foreground">
              Bibliothek
            </Link>
            {session?.user.role === "ADMIN" ? (
              <Link href="/admin" className="transition hover:text-foreground">
                Verwaltung
              </Link>
            ) : null}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href="/account"
                className="hidden text-sm text-muted transition hover:text-foreground md:inline"
              >
                {session.user.name ?? session.user.email}
              </Link>
              <form action={logoutAction}>
                <Button variant="secondary" type="submit" className="px-4 py-2.5">
                  Abmelden
                </Button>
              </form>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="px-4 py-2.5">Anmelden</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

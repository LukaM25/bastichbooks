import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-[#f8f1e6]/70">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="eyebrow">Bastich Books</p>
          <p className="display-title mt-3 text-3xl text-foreground">
            Ein warmes digitales Archiv für Bücher, Essays, Fragmente und Wege von Dom Bastich.
          </p>
        </div>
        <div>
          <p className="eyebrow">Wege</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link href="/">Start</Link>
            <Link href="/buecher">Bücher</Link>
            <Link href="/ueber-dom">Über Dom</Link>
            <Link href="/bibliothek">Bibliothek</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Hausnotiz</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Veröffentlichte Titel erscheinen automatisch im öffentlichen Schaufenster, sobald sie
            im Redaktionsbereich freigegeben wurden.
          </p>
        </div>
      </div>
    </footer>
  );
}

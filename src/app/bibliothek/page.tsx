import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function LibraryPreviewPage() {
  const session = await auth();

  return (
    <div className="space-y-10">
      <section className="surface-strong rounded-[2.4rem] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">Offene Vorschau</p>
        <h1 className="display-title mt-4 max-w-5xl text-5xl leading-none text-foreground md:text-7xl">
          Bibliothek
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted">
          Die Bibliothek zeigt, wie gekaufte Titel, Downloads, Rückkehrpunkte und Merkliste später
          in einem privaten Regal zusammenfinden.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={session?.user ? "/account/library" : "/sign-in?callbackUrl=/account/library"}>
            <Button>{session?.user ? "Privates Regal öffnen" : "Anmelden und Regal öffnen"}</Button>
          </Link>
          <Link href="/buecher">
            <Button variant="secondary">Zu den Büchern</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-card rounded-[2rem] p-6">
          <p className="eyebrow">Im Regal</p>
          <h2 className="display-title mt-3 text-3xl text-foreground">Käufe, Downloads, Lesespuren</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Nach dem Kauf erscheinen Titel im privaten Bereich sofort wieder auffindbar: mit
            Download-Zugriff, Bestellverlauf und gespeicherten Rückwegen.
          </p>
        </article>
        <aside className="surface-card rounded-[2rem] p-6">
          <p className="eyebrow">Vorschau</p>
          <div className="mt-5 grid gap-3">
            {["Digitale Ausgaben", "Bestellverlauf", "Merkliste"].map((item) => (
              <div
                key={item}
                className="rounded-[1.35rem] border border-line bg-white/55 px-4 py-4 text-sm text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

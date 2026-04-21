import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Anmelden",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="surface-strong rounded-[2.25rem] px-6 py-10 md:px-10">
        <p className="eyebrow">Zugang</p>
        <h1 className="display-title mt-4 text-5xl text-foreground">
          Kehre in deine Bibliothek zurück.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Melde dich an, um Bestellungen einzusehen, gekaufte Titel erneut zu öffnen, deine
          Merkliste zu verwalten oder den Redaktionsbereich zu betreten.
        </p>
        <div className="editorial-rule mt-8" />
        <div className="mt-8 grid gap-4 text-sm text-muted md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-line bg-white/45 p-5">
            <p className="font-medium text-foreground">Admin-Testkonto</p>
            <p className="mt-2">`admin@bastichbooks.com` / `dombastich`</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-white/45 p-5">
            <p className="font-medium text-foreground">Leser-Testkonto</p>
            <p className="mt-2">`reader@bastichbooks.com` / `dombastich`</p>
          </div>
        </div>
      </section>

      <div className="self-center">
        <SignInForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}

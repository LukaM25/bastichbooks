import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center">
      <div className="surface-card w-full rounded-[2.25rem] px-6 py-12 text-center md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-5xl text-foreground">
          Dieser Band steht nicht in diesem Regal.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Die angefragte Seite wurde entweder nie veröffentlicht oder tiefer ins Bastich-Archiv
          verschoben.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/buecher">
            <Button>Zurück zum Katalog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

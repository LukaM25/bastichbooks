"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center">
      <div className="surface-card w-full rounded-[2.25rem] px-6 py-12 text-center md:px-10">
        <p className="eyebrow">Ein Riss im Satzspiegel</p>
        <h1 className="display-title mt-4 text-5xl text-foreground">
          Diese Seite konnte nicht gesetzt werden.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Beim Aufbau dieses Bereichs ist etwas unterbrochen worden. Versuche die Seite erneut.
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={() => reset()}>Erneut versuchen</Button>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card rounded-[2rem] px-6 py-10 text-center md:px-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title mt-4 text-3xl text-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

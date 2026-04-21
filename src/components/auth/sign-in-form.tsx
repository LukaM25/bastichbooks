"use client";

import { useActionState } from "react";
import { authenticateAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { idleActionState } from "@/lib/action-state";

export function SignInForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action, pending] = useActionState(authenticateAction, idleActionState);

  return (
    <form action={action} className="surface-card rounded-[2rem] p-6 md:p-8">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="admin@bastichbooks.com" />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-sm text-[#7d2a1d]">{state.fieldErrors.email[0]}</p>
          ) : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="password">
            Passwort
          </label>
          <Input id="password" name="password" type="password" placeholder="••••••••" />
          {state.fieldErrors?.password ? (
            <p className="mt-2 text-sm text-[#7d2a1d]">{state.fieldErrors.password[0]}</p>
          ) : null}
        </div>
        <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/account"} />
      </div>

      {state.message ? (
        <p className="mt-4 text-sm text-[#7d2a1d]">{state.message}</p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={pending}>
        {pending ? "Bibliothek wird geöffnet..." : "Anmelden"}
      </Button>
    </form>
  );
}

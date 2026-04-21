"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { errorActionState, type ActionState } from "@/lib/action-state";
import { signInSchema } from "@/lib/validation/auth";

export async function authenticateAction(
  _previousState: ActionState,
  formData: FormData,
) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl") || undefined,
  });

  if (!parsed.success) {
    return errorActionState(
      "Gib deine Zugangsdaten ein, um fortzufahren.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: parsed.data.callbackUrl || "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return errorActionState("Diese Zugangsdaten konnten nicht bestätigt werden.");
    }

    throw error;
  }

  return {
    status: "success" as const,
  };
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function requireAdminRedirect(isAdmin: boolean) {
  if (!isAdmin) {
    redirect("/account");
  }
}

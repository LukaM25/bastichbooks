import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "ADMIN" | "READER";
    };
  }

  interface User {
    role?: "ADMIN" | "READER";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "READER";
  }
}
